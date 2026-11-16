# Rishita's Releases: Phase 1

Phase 1 imports the original Release module and static Discography page. It stops
before frontend integration. Phase 2 requires explicit confirmation that the team
leader has approved the Discography changes.

## What each file does

| File | Purpose |
| --- | --- |
| `src/models/Release.js` | Defines a release record and checks its values. |
| `src/controllers/releaseController.js` | Passes the Release model to the shared CRUD helper. CRUD means create, read, update and delete. |
| `src/routes/releaseRoutes.js` | Maps five HTTP requests to controller actions. |
| `public/music.html` | Keeps the original six hard-coded cards and page controls. |

These four files were copied without editing. The page does not fetch releases
from MongoDB. Shared JavaScript, CSS and application setup were left untouched.

A release requires `title`, `artist`, `genre` and `releaseYear`. The three text
fields are trimmed. The year must be a number from 1900 to 2100. `artwork` and
`description` default to empty strings. Mongoose manages creation/update timestamps
when records are saved.

## API contract after shared integration

These URLs are **not mounted in the current application**.

| Request | Expected success response |
| --- | --- |
| `GET /api/releases` | 200: array of releases, newest first |
| `GET /api/releases/:id` | 200: one release |
| `POST /api/releases` | 201: `{ message, record }` |
| `PUT /api/releases/:id` | 200: `{ message, record }` |
| `DELETE /api/releases/:id` | 200: `{ message }` |

For POST, send JSON such as:

```json
{
  "title": "Classroom test release",
  "artist": "Test musician",
  "genre": "Alternative",
  "releaseYear": 2026
}
```

Use the returned record's `_id` in the GET-one, PUT and DELETE URLs. The original
shared helper returns 400 for validation/malformed-ID errors and 404 for an
otherwise valid ID with no matching record. Those responses need live verification
after integration; the helper has not been copied into this branch.

## Run the tests

From the repository root, use Node.js 18 or newer. If dependencies are missing,
run `npm.cmd ci --ignore-scripts --no-audit --no-fund` on Windows.

```powershell
node --test tests/releases/model.test.cjs tests/releases/api.test.cjs
```

The model tests run without a database. The API suite skips by default. A skip
does not mean that MongoDB CRUD passed.

After the shared backend is integrated, start a separate application instance
connected to a disposable test database. Then run:

```powershell
$env:RELEASE_API_BASE_URL = 'http://localhost:3000'
$env:RUN_RELEASE_API_TESTS = '1'
node --test tests/releases/api.test.cjs
Remove-Item Env:RUN_RELEASE_API_TESTS
Remove-Item Env:RELEASE_API_BASE_URL
```

The API suite checks all five endpoints, invalid input, invalid IDs and missing
records. It creates one uniquely named record, updates it and deletes it. Cleanup
also runs after failed assertions. If the server becomes unreachable, remove the
temporary record from the test database manually. It never deletes existing
records or clears a collection.

## Dependencies to hand over

- Shared backend owner/team leader: supply `src/controllers/crudController.js`
  and mount the Release router at `/api/releases` before the 404 handler in
  `app.js`. Neither change was made here.
- Database setup owner: configure a local, uncommitted `MONGO_URI` and verify a
  successful MongoDB connection. The repository's server can start without one;
  that alone does not prove Release CRUD works. Never copy the reference `.env`.
- Discography integration: the current repository's `main.js` lacks the original
  local search, genre-filter and track-selection handlers. It also lacks the
  iTunes form handler. The original page's markup remains intact; these existing
  shared-code gaps were left unresolved under the Phase 1 restrictions.
- Playback also needs the original licensed MP3 files under `public/assets/audio/`:
  `midnight-dreams.mp3`, `electric-nights.mp3` and `lost-in-sound.mp3`. They are absent
  from both the extracted project and this repository.
- Simran owns the external iTunes module; Jatin owns the admin dashboard. Their
  files were not imported. Admin verification needs their shared integration
  (including the EJS dependency) and database setup.

See [Phase 1 evidence](PHASE1-EVIDENCE.md) for actual results and preservation checks.
