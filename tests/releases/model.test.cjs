const assert = require('node:assert/strict');
const test = require('node:test');
const Release = require('../../src/models/Release');

function validRelease(overrides = {}) {
  return {
    title: 'Phase 1 test release',
    artist: 'Test musician',
    genre: 'Alternative',
    releaseYear: 2026,
    ...overrides
  };
}

// Validation runs in memory. These tests never connect to MongoDB or save data.
test('accepts a valid release, trims text and supplies optional defaults', async () => {
  const release = new Release(validRelease({
    title: '  Test title  ', artist: '  Test artist  ', genre: '  Acoustic  '
  }));
  await release.validate();
  assert.equal(release.title, 'Test title');
  assert.equal(release.artist, 'Test artist');
  assert.equal(release.genre, 'Acoustic');
  assert.equal(release.artwork, '');
  assert.equal(release.description, '');
});

for (const field of ['title', 'artist', 'genre', 'releaseYear']) {
  test(`rejects a missing ${field}`, async () => {
    const data = validRelease();
    delete data[field];
    await assert.rejects(new Release(data).validate(), error => {
      assert.equal(error.errors[field].kind, 'required');
      return true;
    });
  });
}

for (const field of ['title', 'artist', 'genre']) {
  test(`rejects whitespace-only ${field}`, async () => {
    await assert.rejects(new Release(validRelease({ [field]: '   ' })).validate(), error => {
      assert.equal(error.errors[field].kind, 'required');
      return true;
    });
  });
}

for (const releaseYear of [1900, 2100]) {
  test(`accepts boundary year ${releaseYear}`, async () => {
    await new Release(validRelease({ releaseYear })).validate();
  });
}

for (const [releaseYear, kind] of [[1899, 'min'], [2101, 'max']]) {
  test(`rejects out-of-range year ${releaseYear}`, async () => {
    await assert.rejects(new Release(validRelease({ releaseYear })).validate(), error => {
      assert.equal(error.errors.releaseYear.kind, kind);
      return true;
    });
  });
}

test('rejects a year that cannot be converted to a number', async () => {
  await assert.rejects(new Release(validRelease({ releaseYear: 'unknown' })).validate(), error => {
    assert.equal(error.errors.releaseYear.name, 'CastError');
    return true;
  });
});
