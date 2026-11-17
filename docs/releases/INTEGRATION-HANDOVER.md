# Release integration handover

Rishita's approved work consists of the preserved Release module, original static Discography page, tests, Postman requests and contribution evidence. Phase 2 is cancelled following the team leader's rejection.

## Dependencies for Sneha and the shared backend owner

1. Supply the original `src/controllers/crudController.js` from the team reference. `releaseController.js` requires that factory and passes it the Release model and `Release` label.
2. Register the existing Release router at `/api/releases` in `app.js`, after JSON parsing and before the fallback 404 handler. The original reference uses the following registration.

```js
app.use('/api/releases', require('./src/routes/releaseRoutes'));
```

3. Configure the shared MongoDB connection using the repository's `MONGO_URI` variable in a local environment file. Confirm a successful connection before testing persistence. Local-JSON server startup alone establishes Express availability.
4. Provide a separate disposable test database and a running test server for Release integration tests.

The preserved model, controller wrapper and router are ready for this integration. Shared application, controller, connection, environment and package files retain their starting versions.

## Dependencies for Jatin's Admin dashboard

- Integrate the original Admin template, `/admin` route, EJS dependency and view-engine configuration with Sneha.
- Supply `releases` as an array when rendering `admin`. The reference route queries `Release.find().sort({ createdAt: -1 })` alongside the TourEvent and ContactMessage data.
- Use the existing schema names `title`, `artist`, `genre`, `releaseYear`, `artwork` and `description`. Convert form year input to a number as the reference template does.
- Keep the reference create, edit and delete calls aligned with POST `/api/releases`, PUT `/api/releases/:id` and DELETE `/api/releases/:id`.
- Coordinate the TourEvent and ContactMessage dependencies with their module owners before verifying the complete Admin page.

The current branch has no Admin template, EJS installation or `/admin` registration. The observed response is the generic route 404. Field compatibility is verified by source inspection. Rendering and Admin CRUD remain unverified.

## Original interface contract

| Action | Success response |
| --- | --- |
| List | Array, newest records first |
| Get one | Selected record |
| Create | 201, `{ message, record }` |
| Update | 200, `{ message, record }` |
| Delete | 200, `{ message }` |

The original helper returns 400 for failed create/update validation and malformed IDs. A valid ID without a matching record returns 404. The exact expected messages are recorded in [API-REQUESTS.md](API-REQUESTS.md). Actual integrated responses require testing after the dependencies above are available.

## Integration acceptance sequence

1. Confirm MongoDB connects and GET `/api/releases` returns an array.
2. Run the automated API suite against the disposable test server.
3. Import the five-request Postman collection and run its generated test-record lifecycle against that same isolated environment.
4. Verify the Admin list, create, edit and delete actions using disposable Release records.
5. Retain the original static Discography catalogue and record its current shared-script/media dependencies during evaluation.

The ZIP includes original local title/genre filtering and track-selection code in its shared script. The current repository's shared script lacks those handlers. The HTML controls are preserved. The supplied project also lacks the referenced licensed audio files. These findings describe existing integration status and provide viva context.

The RISHITA guide's earlier database-fed Discography and corresponding screenshot items have cancellation status under the final approved scope. Evidence for this contribution consists of source preservation, automated output and read-only HTTP observations.
