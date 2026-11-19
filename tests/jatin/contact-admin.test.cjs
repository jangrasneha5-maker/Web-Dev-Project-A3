const assert = require('node:assert/strict');
const { once } = require('node:events');
const path = require('node:path');
const { test } = require('node:test');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { chromium } = require('playwright-core');

const appRoot = path.resolve(process.env.JATIN_APP_ROOT || path.join(__dirname, '../..'));
const mongoose = require(path.join(appRoot, 'node_modules/mongoose'));
const app = require(path.join(appRoot, 'app'));
const evidence = process.env.JATIN_EVIDENCE;
const hasTour = Boolean(mongoose.models.TourEvent);

test('contact and dashboard through Express, MongoDB, and Edge', async t => {
  const database = await MongoMemoryServer.create();
  t.after(() => database.stop());
  await mongoose.connect(database.getUri('modern_musician_test'));
  const server = app.listen(0, '127.0.0.1');
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await mongoose.disconnect();
  });
  await once(server, 'listening');
  const base = 'http://127.0.0.1:' + server.address().port;
  function api(endpoint, method = 'GET', data) {
    return fetch(base + endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: data && JSON.stringify(data)
    });
  }

  const valid = {
    name: ' Alice Example ',
    email: ' ALICE@EXAMPLE.COM ',
    topic: 'general',
    message: 'Please share <em>booking</em> details.'
  };

  await t.test('message validation, persistence, listing and deletion', async () => {
    for (const override of [
      { name: ' ' }, { email: 'invalid' }, { topic: 'unknown' }, { message: 'short' },
      { message: 'x'.repeat(501) }, { name: {} }, { email: null }
    ]) {
      const response = await api('/api/messages', 'POST', { ...valid, ...override });
      assert.equal(response.status, 400);
      assert.ok((await response.json()).message);
    }
    assert.deepEqual(await (await api('/api/messages')).json(), []);
    const create = await api('/api/messages', 'POST', { ...valid, submittedAt: '2000-01-01' });
    assert.equal(create.status, 201);
    const { record } = await create.json();
    assert.equal(record.name, 'Alice Example');
    assert.equal(record.email, 'alice@example.com');
    assert.ok(Date.parse(record.submittedAt) > Date.parse('2000-01-01'));
    const stored = await mongoose.models.ContactMessage.findById(record._id).lean();
    assert.equal(stored.message, valid.message);
    assert.equal((await (await api('/api/messages')).json())[0]._id, record._id);
    assert.equal((await api('/api/messages/bad-id', 'DELETE')).status, 400);
    assert.equal((await api('/api/messages/' + record._id, 'DELETE')).status, 200);
    assert.equal((await api('/api/messages/' + record._id, 'DELETE')).status, 404);
  });

  const browser = await chromium.launch({ channel: 'msedge' });
  t.after(() => browser.close());
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));

  await t.test('form feedback, duplicate prevention and thank-you navigation', async () => {
    await page.goto(base + '/contact.html');
    if (evidence) await page.screenshot({ path: path.join(evidence, 'contact-desktop.png'), fullPage: true });
    await page.locator('#name').fill(valid.name);
    await page.locator('#email').fill('alice@invalid');
    await page.locator('#topic').selectOption(valid.topic);
    await page.locator('#message').fill(valid.message);
    await page.locator('#contact-form button').click();
    await page.getByText('Enter a valid email address.').waitFor();
    assert.match(page.url(), /contact\.html$/);

    await page.locator('#email').fill(valid.email.trim());
    await page.route('**/api/messages', route => route.fulfill({
      status: 503,
      json: { message: 'The message database is temporarily unavailable.' }
    }));
    await page.locator('#contact-form button').click();
    await page.getByText('The message database is temporarily unavailable.').waitFor();
    assert.equal(await page.locator('#contact-form button').isEnabled(), true);
    await page.unrouteAll();

    const posts = [];
    page.on('request', request => {
      if (request.method() === 'POST' && request.url().endsWith('/api/messages')) posts.push(request);
    });
    await Promise.all([
      page.waitForURL('**/thank-you.html'),
      page.locator('#contact-form').evaluate(form => {
        form.requestSubmit();
        form.requestSubmit();
      })
    ]);
    assert.equal(posts.length, 1);
    assert.equal((await mongoose.models.ContactMessage.countDocuments()), 1);
    if (evidence) await page.screenshot({ path: path.join(evidence, 'thank-you-desktop.png'), fullPage: true });
    await page.getByRole('link', { name: 'Back to home' }).click();
    await page.waitForURL('**/index.html');
  });

  await t.test('dashboard CRUD through existing APIs', async () => {
    await page.goto(base + '/admin');
    const releases = page.locator('[data-endpoint="releases"]');
    const tour = page.locator('[data-endpoint="tour"]');
    const messages = page.locator('[data-endpoint="messages"]');
    await messages.getByText(valid.message, { exact: true }).waitFor();
    assert.equal(await messages.locator('td em').count(), 0);

    async function addAndEdit(panel, label, fields, change) {
      for (const [field, value] of Object.entries(fields)) await panel.getByLabel(field, { exact: true }).fill(value);
      await Promise.all([
        page.waitForEvent('load'),
        panel.getByRole('button', { name: 'Add ' + label, exact: true }).click()
      ]);
      await panel.getByRole('button', { name: 'Edit', exact: true }).click();
      await panel.getByRole('button', { name: 'Save changes' }).waitFor();
      for (const [field, value] of Object.entries(fields)) {
        assert.equal(await panel.getByLabel(field, { exact: true }).inputValue(), value);
      }
      await panel.getByRole('button', { name: 'Cancel edit' }).click();
      await panel.getByRole('button', { name: 'Add ' + label, exact: true }).waitFor();
      await panel.getByRole('button', { name: 'Edit', exact: true }).click();
      await panel.getByRole('button', { name: 'Save changes' }).waitFor();
      await panel.getByLabel(change[0], { exact: true }).fill(change[1]);
      await Promise.all([
        page.waitForEvent('load'),
        panel.getByRole('button', { name: 'Save changes' }).click()
      ]);
      await panel.getByRole('cell', { name: change[1], exact: true }).waitFor();
    }

    await addAndEdit(releases, 'release', {
      Title: 'Test Release', Artist: 'Test Artist', Genre: 'Indie', 'Release year': '2026',
      'Artwork URL': 'https://example.com/artwork.jpg', Description: 'QA description'
    }, ['Title', 'Edited Release']);

    if (hasTour) {
      await addAndEdit(tour, 'tour event', {
        'Event name': 'Test Tour', Venue: 'Music Hall', City: 'Delhi', Date: '2026-12-10',
        Time: '7:30 PM', 'Ticket URL': 'https://example.com/tickets'
      }, ['Event name', 'Edited Tour']);
    } else {
      await tour.getByText(/tour module is integrated/).waitFor();
      assert.equal((await api('/api/tour')).status, 404);
    }

    if (evidence) await page.screenshot({ path: path.join(evidence, 'admin-desktop.png'), fullPage: true });
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    for (const [endpoint, name] of [
      ['/contact.html', 'contact'], ['/thank-you.html', 'thank-you'], ['/admin', 'admin']
    ]) {
      await mobile.goto(base + endpoint);
      assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true, endpoint);
      if (evidence) await mobile.screenshot({ path: path.join(evidence, name + '-mobile.png'), fullPage: true });
    }
    await mobile.close();

    page.on('dialog', dialog => dialog.accept());
    for (const panel of hasTour ? [releases, tour, messages] : [releases, messages]) {
      await Promise.all([
        page.waitForEvent('load'),
        panel.getByRole('button', { name: 'Delete', exact: true }).click()
      ]);
      assert.equal(await panel.getByRole('button', { name: 'Delete', exact: true }).count(), 0);
    }
    assert.equal(await mongoose.models.ContactMessage.countDocuments(), 0);
    assert.equal(await mongoose.models.Release.countDocuments(), 0);
    if (hasTour) assert.equal(await mongoose.models.TourEvent.countDocuments(), 0);
    assert.deepEqual(errors, []);
  });

  await t.test('existing static pages and update route remain reachable', async () => {
    const pages = ['/', '/index.html', '/music.html', '/contact.html', '/thank-you.html'];
    if (hasTour) pages.push('/about.html', '/gallery.html', '/tour.html');
    for (const endpoint of [...pages, '/api/test', '/api/updates']) {
      assert.equal((await api(endpoint)).status, 200, endpoint);
    }
  });
});
