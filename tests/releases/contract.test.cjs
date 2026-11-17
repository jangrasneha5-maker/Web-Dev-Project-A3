const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const Release = require('../../src/models/Release');

const root = path.resolve(__dirname, '../..');
const collection = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'Release.postman_collection.json'), 'utf8'
));
const actionNames = ['getAll', 'getOne', 'create', 'update', 'remove'];

// Evaluate the unchanged module with explicit dependency doubles.
// This checks delegation and route wiring, without supplying a shared CRUD implementation.
function loadModule(relativePath, dependencies) {
  const filename = path.join(root, relativePath);
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), {
    module,
    exports: module.exports,
    require(name) {
      assert.ok(Object.hasOwn(dependencies, name), 'Unexpected dependency ' + name);
      return dependencies[name];
    }
  }, { filename });
  return module.exports;
}

function captureRoutes() {
  const definitions = [];
  const actions = Object.fromEntries(actionNames.map(name => [name, function () {}]));
  const router = {};
  for (const method of ['get', 'post', 'put', 'delete']) {
    router[method] = (routePath, handler) => {
      const action = actionNames.find(name => actions[name] === handler);
      assert.ok(action, 'Route must use an exported controller action');
      definitions.push({ method: method.toUpperCase(), path: routePath, action });
      return router;
    };
  }
  const exported = loadModule('src/routes/releaseRoutes.js', {
    express: { Router: () => router },
    '../controllers/releaseController': actions
  });
  assert.equal(exported, router);
  return definitions;
}

test('Release controller delegates its actual model and label to the shared factory', () => {
  const actions = Object.fromEntries(actionNames.map(name => [name, function () {}]));
  let factoryCalls = 0;
  const exported = loadModule('src/controllers/releaseController.js', {
    '../models/Release': Release,
    './crudController': (model, label) => {
      factoryCalls++;
      assert.equal(model, Release);
      assert.equal(label, 'Release');
      return actions;
    }
  });
  assert.equal(factoryCalls, 1);
  assert.equal(exported, actions);
});

test('original Release router maps the exact five methods, paths and actions', () => {
  assert.deepEqual(captureRoutes(), [
    { method: 'GET', path: '/', action: 'getAll' },
    { method: 'GET', path: '/:id', action: 'getOne' },
    { method: 'POST', path: '/', action: 'create' },
    { method: 'PUT', path: '/:id', action: 'update' },
    { method: 'DELETE', path: '/:id', action: 'remove' }
  ]);
});

test('Postman requests match every original route and declare URL placeholders', () => {
  assert.equal(collection.item.length, 5);
  const variables = new Map(collection.variable.map(variable => [variable.key, variable.value]));
  assert.ok(variables.has('baseUrl'));
  assert.ok(variables.has('releaseId'));
  const requestRoutes = collection.item.map(item => {
    assert.ok(item.request.url.raw.startsWith('{{baseUrl}}/api/releases'));
    const suffix = item.request.url.raw.slice('{{baseUrl}}/api/releases'.length);
    return item.request.method + ' ' + (suffix.replace('{{releaseId}}', ':id') || '/');
  }).sort();
  assert.deepEqual(requestRoutes, captureRoutes().map(route => route.method + ' ' + route.path).sort());
});

test('Postman POST and PUT use original schema fields and valid JSON bodies', async () => {
  const create = collection.item.find(item => item.request.method === 'POST').request;
  const update = collection.item.find(item => item.request.method === 'PUT').request;
  const allowedFields = new Set(['title', 'artist', 'genre', 'releaseYear', 'artwork', 'description']);
  for (const request of [create, update]) {
    assert.ok(request.header.some(header =>
      header.key.toLowerCase() === 'content-type' && header.value === 'application/json'
    ));
    assert.equal(request.body.mode, 'raw');
    const data = JSON.parse(request.body.raw);
    for (const field of Object.keys(data)) {
      assert.ok(allowedFields.has(field), 'Unexpected Release field ' + field);
      assert.ok(Release.schema.path(field));
    }
  }
  const createData = JSON.parse(create.body.raw);
  for (const field of ['title', 'artist', 'genre', 'releaseYear']) {
    assert.ok(Object.hasOwn(createData, field), 'POST requires ' + field);
  }
  await new Release(createData).validate();
  await new Release({ ...createData, ...JSON.parse(update.body.raw) }).validate();
  for (const item of collection.item.filter(item => ['GET', 'DELETE'].includes(item.request.method))) {
    assert.equal(item.request.body, undefined);
  }
});

test('Postman scripts parse and retain status and response assertions for every request', () => {
  for (const item of collection.item) {
    let testCount = 0;
    for (const event of item.event) {
      const source = event.script.exec.join('\n');
      new vm.Script(source);
      if (event.listen === 'test') {
        testCount += (source.match(/pm\.test\(/g) || []).length;
      }
    }
    assert.equal(testCount, 2, item.name + ' needs status and response assertions');
  }
});
