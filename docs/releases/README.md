# Rishita's contribution — Releases and original Discography

The approved contribution preserves the original Release module and static Discography page from `modern_musician_assessment3.zip`. The team leader rejected the proposed Discography changes. Phase 2 is permanently cancelled for this task.

## Original files

| File | What to explain in the viva |
| --- | --- |
| `src/models/Release.js` | The Mongoose schema, validation and timestamps |
| `src/controllers/releaseController.js` | Delegation to the shared CRUD factory using the Release model and label |
| `src/routes/releaseRoutes.js` | Five method/path mappings to controller actions |
| `public/music.html` | Six hard-coded release cards and original page controls |

All four files match their ZIP entries byte-for-byte. The current implementation keeps the catalogue in HTML. The proposed MongoDB Fetch API catalogue and dynamic renderer have cancellation status.

## Release schema

| Field | Rule |
| --- | --- |
| `title` | Required trimmed string |
| `artist` | Required trimmed string |
| `genre` | Required trimmed string |
| `releaseYear` | Required number from 1900 to 2100 |
| `artwork` | Optional string, default empty |
| `description` | Optional string, default empty |
| `createdAt`, `updatedAt` | Managed by Mongoose timestamps |

MongoDB assigns `_id` to saved documents. The model is named `Release`. Model validation can run in memory using `validate()` before any database connection.

## Controller and five CRUD operations

The controller passes `Release` and the label `Release` to `./crudController`. The original shared factory supplies `getAll`, `getOne`, `create`, `update` and `remove`. That helper is a current integration dependency.

| Method and intended URL | Action | Original helper operation | Expected success after integration |
| --- | --- | --- | --- |
| GET `/api/releases` | `getAll` | `find().sort({ createdAt: -1 })` | 200, array |
| GET `/api/releases/:id` | `getOne` | `findById()` | 200, record |
| POST `/api/releases` | `create` | `create(req.body)` | 201, message and record |
| PUT `/api/releases/:id` | `update` | `findByIdAndUpdate()` with `new` and `runValidators` | 200, message and updated record |
| DELETE `/api/releases/:id` | `remove` | `findByIdAndDelete()` | 200, message |

These routes are declared in the preserved router. Current application requests reach the fallback 404 handler because shared router registration is pending. A malformed record ID should produce 400 and an absent record should produce 404 after the shared helper and database are integrated. Actual MongoDB responses remain unverified.

## Original Discography and filtering

The page contains Midnight Dreams, Electric Nights, Lost in Sound, After the Echo, Neon Weather and Soft Landing. Each card carries `data-title` and `data-genre` values. Search, genre, empty-state, player and iTunes controls are present in the preserved HTML.

The ZIP's shared `filterMusic()` reads search text in lowercase, compares it with each card's lowercase title using `indexOf()`, and combines that result with the selected genre. Matching cards remain visible. The handler updates the visible count and empty-state message. Input and change events call the filter.

The repository's current shared `main.js` supplies navigation, reveal behavior and homepage announcements. The original Discography filter, track-selection and iTunes handlers are absent from that shared script. Browser execution of those interactions remains unverified. Their implementation is a shared-code dependency outside the approved finalization.

Audio playback also depends on licensed `midnight-dreams.mp3`, `electric-nights.mp3` and `lost-in-sound.mp3` files under `public/assets/audio/`. Those media files are absent from the supplied project. The page layout, catalogue, CSS and JavaScript remain preserved at their starting versions.

## Intended Admin use

The original Admin template expects a `releases` array and displays title, artist, genre and year. Its create form uses all six Release schema fields. Its edit and delete actions call the same Release API paths. Jatin's Admin setup and Sneha's shared backend setup are current integration dependencies.

The approved Discography catalogue remains static while the Release database module supports the intended Admin workflow after integration.

## Tests and evidence

Run the existing and new independent tests from the repository root.

```powershell
node --test tests/releases/model.test.cjs tests/releases/contract.test.cjs tests/releases/api.test.cjs
```

The final run reported 18 passed, zero failed and one skipped API suite. Thirteen tests cover offline model validation. Five tests cover controller delegation, route wiring and the Postman contract using explicit dependency doubles. Those doubles check interfaces while the original shared CRUD implementation remains an integration dependency.

The API suite is prepared for a separately running server connected to a disposable test database. Its opt-in variables are `RUN_RELEASE_API_TESTS=1` and `RELEASE_API_BASE_URL`. Activate it after the backend handover is complete. It creates a uniquely named test release and limits cleanup to its captured ID.

Read-only HTTP checks verified the health endpoint, announcements list and original static files. Release paths and `/admin` returned the application's fallback 404. Live Release persistence, Postman execution and Admin behavior remain unverified.

## Short viva explanation

- A request reaches the mounted Express router, which selects a controller action by method and path.
- The shared controller action uses the Release model to validate or query MongoDB and sends the original response format.
- A schema defines record rules. A model provides methods such as `find`, `create` and `findByIdAndUpdate`.
- The Discography page demonstrates the original HTML catalogue. Its search controls describe the original DOM filtering design.
- The Admin dashboard is the intended consumer of Release records after shared integration.

Use [API request examples](API-REQUESTS.md), [integration handover](INTEGRATION-HANDOVER.md), and [final verification evidence](FINAL-EVIDENCE.md) for the exact boundaries and actual results. The earlier [Phase 1 record](PHASE1-EVIDENCE.md) remains historical evidence.
