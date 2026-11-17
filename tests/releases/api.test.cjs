const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const test = require('node:test');

const enabled = process.env.RUN_RELEASE_API_TESTS === '1';
const baseUrl = (process.env.RELEASE_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

// Opt in only against a running server connected to a disposable test database.
// No app mounting, database setup, shared controllers or frontend code lives here.
test('Release API CRUD and validation', {
  skip: enabled ? false : 'Set RUN_RELEASE_API_TESTS=1 after shared integration and test database setup.'
}, async t => {
  const payload = {
    title: `Phase 1 API test ${randomUUID()}`,
    artist: 'Assessment test musician',
    genre: 'Alternative',
    releaseYear: 2026,
    artwork: '',
    description: 'Temporary record created by the Release API test.'
  };
  let recordId;

  async function request(method, suffix = '', body) {
    const response = await fetch(`${baseUrl}/api/releases${suffix}`, {
      method,
      headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(10000)
    });
    return { status: response.status, body: await response.json() };
  }

  // If an assertion fails after creation, still try to remove only our record.
  t.after(async () => {
    if (!recordId) return;
    const result = await request('DELETE', `/${recordId}`);
    assert.ok([200, 404].includes(result.status),
      `Cleanup failed for test record ${recordId}; remove it from the test database.`);
  });

  const initialList = await request('GET');
  assert.equal(initialList.status, 200, 'Release API must be mounted and MongoDB connected first.');
  assert.ok(Array.isArray(initialList.body), 'GET /api/releases must return an array.');

  await t.test('GET all returns a release list', () => {
    assert.ok(Array.isArray(initialList.body));
  });

  await t.test('GET one rejects a malformed ID', async () => {
    const result = await request('GET', '/not-an-object-id');
    assert.equal(result.status, 400);
    assert.equal(result.body.message, 'Invalid record ID.');
  });

  await t.test('POST rejects missing required fields', async () => {
    const result = await request('POST', '', {});
    assert.equal(result.status, 400);
    assert.equal(result.body.message, 'Could not create Release.');
  });

  await t.test('POST creates a release', async () => {
    const result = await request('POST', '', payload);
    recordId = result.body.record?._id;
    assert.equal(result.status, 201);
    assert.match(recordId || '', /^[a-f0-9]{24}$/i);
    assert.equal(result.body.message, 'Release created successfully.');
    assert.equal(result.body.record.title, payload.title);
    assert.equal(result.body.record.releaseYear, payload.releaseYear);
    assert.ok(result.body.record.createdAt);
    assert.ok(result.body.record.updatedAt);
  });
  // Avoid dependent requests if creation failed or returned no usable ID.
  assert.match(recordId || '', /^[a-f0-9]{24}$/i, 'Cannot continue CRUD without a created record ID.');

  await t.test('GET one returns the created release', async () => {
    const result = await request('GET', `/${recordId}`);
    assert.equal(result.status, 200);
    assert.equal(result.body._id, recordId);
    assert.equal(result.body.title, payload.title);
  });

  await t.test('GET all includes the created release', async () => {
    const result = await request('GET');
    assert.equal(result.status, 200);
    assert.ok(result.body.some(release => release._id === recordId));
  });

  await t.test('PUT updates only the selected release', async () => {
    const result = await request('PUT', `/${recordId}`, { title: `${payload.title} edited` });
    assert.equal(result.status, 200);
    assert.equal(result.body.message, 'Release updated successfully.');
    assert.equal(result.body.record._id, recordId);
    assert.equal(result.body.record.title, `${payload.title} edited`);
    assert.equal(result.body.record.artist, payload.artist);
  });

  await t.test('PUT rejects an invalid year and preserves the saved value', async () => {
    const invalid = await request('PUT', `/${recordId}`, { releaseYear: 1800 });
    assert.equal(invalid.status, 400);
    assert.equal(invalid.body.message, 'Could not update Release.');
    const saved = await request('GET', `/${recordId}`);
    assert.equal(saved.status, 200);
    assert.equal(saved.body.releaseYear, payload.releaseYear);
    assert.equal(saved.body.title, `${payload.title} edited`);
  });

  await t.test('DELETE removes the created release', async () => {
    const result = await request('DELETE', `/${recordId}`);
    assert.equal(result.status, 200);
    assert.equal(result.body.message, 'Release deleted successfully.');
  });

  for (const method of ['GET', 'PUT', 'DELETE']) {
    await t.test(`${method} returns 404 for the deleted release`, async () => {
      const body = method === 'PUT' ? { title: payload.title } : undefined;
      const result = await request(method, `/${recordId}`, body);
      assert.equal(result.status, 404);
      assert.equal(result.body.message, 'Release not found.');
    });
  }
});
