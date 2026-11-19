# Contact and dashboard verification

Run these PowerShell commands from the feature checkout. The integration test uses Microsoft Edge and a temporary MongoDB instance. It may download a MongoDB binary on the first run.

```powershell
npm ci
$qa = Join-Path $env:TEMP 'mm-jatin-qa'
npm install --prefix $qa mongodb-memory-server playwright-core
$env:NODE_PATH = Join-Path $qa 'node_modules'
node --test tests/jatin/contact-admin.test.cjs
```

On the feature branch, the test verifies that the dashboard reports the missing tour integration. To exercise tour CRUD, set `JATIN_APP_ROOT` to a full project checkout with the feature applied and the existing tour module installed. That checkout should also have its own application dependencies installed.

Set `JATIN_EVIDENCE` to an existing directory to save screenshots. The test uses sample records in its disposable database.

## Postman

Import `ContactMessages.postman_collection.json` and run the collection against a local server connected to a test database. Set the collection's `baseUrl` if the server uses a port other than 3000. The collection creates one sample message, verifies that the API lists it, and deletes that sample before verifying the 404 response.
