# Final approved contribution evidence

Verified on 17 November 2026 using Asia/Calcutta dates.

## Approved scope

The team leader rejected the proposed Discography modifications. Phase 2 is permanently cancelled for this task. Finalization covers Release testing, a portable Postman collection, college-viva documentation and integration handover.

The existing five Phase 1 commits are retained. Three substantive finalization commits cover the collection/request examples, independent contract tests, and final documentation. The resulting contribution contains eight commits above the main baseline `d4637b6`.

## Original source preservation

All four assigned original files were compared directly with their entries in `../A3-References/modern_musician_assessment3.zip`. Each working file matched byte-for-byte. The SHA-256 reference values are below.

| File | ZIP SHA-256 |
| --- | --- |
| `src/models/Release.js` | `c2e35f7f0de89c0823e2632ad8f0d4f7cacfec9d67e2a1e6d55d2408f5da58cf` |
| `src/controllers/releaseController.js` | `5ddac03526becf12cb46b504ec88f51b99e2e70140afe017370795d29b892bea` |
| `src/routes/releaseRoutes.js` | `1c3fa69f412b0f091794dbe7ee14006199276af58bd1f67807221c403008cb04` |
| `public/music.html` | `94fd964541c5577d525e845a1c03b4abd7bfa9eb8a7e167bb4d1b87defafd32c` |

The starting repository contained 22 tracked files. Existing changes during finalization are confined to Rishita's two contribution documents. All other starting tracked files retain their original bytes. The final preservation audit also checks committed blobs for the four imported files.

The repository had no `.env` at entry. Environment-file existence and the `.env.example` hash are included in the preservation checks. The reference archive and its environment remain separate from the working repository.

## Automated results

```powershell
node --test tests/releases/model.test.cjs tests/releases/contract.test.cjs tests/releases/api.test.cjs
```

| Check | Actual result |
| --- | --- |
| Model tests | 13 passed, required fields, trim/default behavior, year boundaries and invalid year type |
| Independent contract tests | 5 passed, controller factory delegation, five route mappings, collection URLs, schema-compatible bodies and script syntax |
| Live API suite | 1 skipped suite, shared integration and isolated database prerequisites pending |
| Combined runner | 18 passed, 0 failed, 1 skipped |
| Syntax checks | Passed for the three original Release backend files and three test files |
| Postman collection | Five requests and ten response/status assertions inspected offline |
| Actual Postman execution | Unverified |

The contract tests evaluate the unchanged controller/router modules with dependency doubles. They verify the original wiring contract. They leave shared CRUD execution and database persistence to the opt-in API suite.

## Read-only application observations

The current Express app was started on an ephemeral loopback port for inspection, then closed. All nine requests used GET.

| URL | Observed result |
| --- | --- |
| `/api/test` | 200 |
| `/api/updates` | 200 |
| `/music.html` | 200, served bytes match the working original |
| `/css/style.css` | 200, served bytes match the existing working file |
| `/js/main.js` | 200, served bytes match the existing working file |
| `/api/releases` | 404, generic `Route not found.` |
| `/api/releases/000000000000000000000001` | 404, generic `Route not found.` |
| `/api/releases/not-an-object-id` | 404, generic `Route not found.` |
| `/admin` | 404, generic `Route not found.` |

Actual loading of the Release controller produced `MODULE_NOT_FOUND` for `./crudController`. The app lacks the Release router mount. The repository has no local `.env`, the test process has no `MONGO_URI`, and EJS/Admin resources are absent. Live Release create/read/update/delete, helper-level invalid-ID handling and database missing-record handling remain blocked.

The generic route 404 establishes the integration gap. Helper-level 400/404 behavior is described from the original reference and prepared tests. Its live execution remains pending.

## Discography and Admin evidence

The preserved Discography contains six static cards and original search, genre, iTunes and player markup. Original ZIP filtering logic was inspected. The current shared script lacks its filter and player handlers, and referenced audio assets are absent. Browser interaction, audio playback and Admin integration remain unverified.

The original Admin fields and API URLs are compatible with the Release schema/router by source inspection. Release records appearing in Admin and the complete Admin lifecycle require Jatin's shared integration.

The evidence delivered here is the original-source comparison, automated test output, request definitions and read-only HTTP results. The catalogue remains static under the approved scope.

## Publication checks

The verified remote destination is the public `jangrasneha5-maker/Web-Dev-Project-A3` repository. The feature branch is `feature/rishita-releases-discography`, and the pull request targets `main`.

Before each finalization commit, staged paths, staged content, original-file snapshots and contribution credential patterns were reviewed. Publication follows the final clean-tree and ZIP verification. Branch and pull-request URLs are provided in the delivery report.

See [the viva guide](README.md), [request examples](API-REQUESTS.md) and [owner handover](INTEGRATION-HANDOVER.md) for explanations and next integration steps.
