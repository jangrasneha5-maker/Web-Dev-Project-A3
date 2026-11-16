# Phase 1 evidence

Verified on 17 November 2026 (Asia/Calcutta). No Phase 2 work was performed.

## Repository audit

- Working repository: `Web-Dev-Project-A3`.
- Branch at entry: `feature/rishita-releases-discography`; no branch switch or recreation.
- Starting commit: `d4637b6`; the working tree and staging area were clean.
- Configured fetch/push remote: `https://github.com/jangrasneha5-maker/Web-Dev-Project-A3.git`.
  No fetch, push or pull request was performed; remote freshness was not checked.
- Read all five guides in `../A3-References`: `RISHITA.md`, `SNEHA.md`,
  `ANUSHA.md`, `SIMRAN.md` and `JATIN.md`.
- Inspected `../A3-References/modern_musician_assessment3`, including the Release
  files, shared CRUD helper, application setup, database configuration, frontend
  handlers and admin/external integration points. No reference files were edited.

All four assigned destination files were absent initially. The 14 existing
tracked files differed bytewise from the extracted project. Ignoring CRLF/LF line
endings, `.env.example`, `README.md`, `app.js`, `server.js`, `package.json`,
`package-lock.json` and `public/js/main.js` had content differences. The other
seven differed only in line endings. None of those existing files was replaced.

Git initially rejected the repository because the sandbox user differs from its
owner. Commands used a per-invocation `safe.directory` value for this repository;
global Git configuration was not changed. Commits used per-invocation
`core.autocrlf=false` to retain the copied LF bytes.

## Copy verification

SHA-256 of both reference and working copy matched for each file:

| File | SHA-256 |
| --- | --- |
| `src/models/Release.js` | `C2E35F7F0DE89C0823E2632AD8F0D4F7CACFEC9D67E2A1E6D55D2408F5DA58CF` |
| `src/controllers/releaseController.js` | `5DDAC03526BECF12CB46B504EC88F51B99E2E70140AFE017370795D29B892BEA` |
| `src/routes/releaseRoutes.js` | `1C3FA69F412B0F091794DBE7EE14006199276AF58BD1F67807221C403008CB04` |
| `public/music.html` | `94FD964541C5577D525E845A1C03B4ABD7BFA9EB8A7E167BB4D1B87DEFAFD32C` |

The entire HTML is preserved, including the six cards, search/genre controls,
iTunes form and player markup. No frontend integration file was created.
The final audit also matched all four committed Git blobs to the reference bytes
and confirmed that all 14 pre-existing tracked files remain unchanged from
`d4637b6`.

## Tests actually run

Environment: Node.js `v24.22.1`, npm `11.19.1`.

| Check | Result |
| --- | --- |
| Locked dependency installation | PASS: 117 packages installed in the repository with lifecycle scripts disabled; package manifests unchanged. |
| `node --check` on three imported backend files and two test files | PASS: all five parse. |
| `node --test tests/releases/model.test.cjs tests/releases/api.test.cjs` | 13 passed, 0 failed, 1 API suite skipped. |
| Model checks | Required fields, trimmed/blank strings, optional defaults, year limits and invalid year type passed without MongoDB. |
| Existing app: read-only `/api/test` and `/api/updates` | PASS: both returned 200 with expected JSON. No announcements were written. |
| Existing app: `/music.html`, `/css/style.css`, `/js/main.js` | PASS: 200; served bytes matched the corresponding working files. |
| Unchanged `server.js` startup | PASS: local-JSON mode started on a temporary port and served `/music.html` with 200; process stopped afterward. |
| Release route availability | BLOCKED: `GET /api/releases` returned 404 `Route not found.` |
| Release controller loading | BLOCKED: `MODULE_NOT_FOUND` for `./crudController`. |
| MongoDB persistence | NOT RUN: no repository `.env`, no process `MONGO_URI`, and no `mongod`/`mongosh` command available. No database connection was attempted. |
| Browser search/filter/audio, iTunes and admin | NOT VERIFIED: shared handlers/modules or media are absent; no browser or database-backed evidence claimed. |

PowerShell blocks `npm.ps1`, so installation used `npm.cmd`. The first sandboxed
install failed with registry access `EACCES`; an approved network-enabled retry
using the same lockfile succeeded. The extracted project's `.env` and
`node_modules` were neither copied nor modified. The repository's installed
`node_modules` remains ignored by Git.

## Handover and stop

The shared CRUD helper, router mount and MongoDB connection are prerequisites
for running the prepared HTTP suite. Existing missing Discography handlers/media,
external API integration and admin integration require coordination with their
owners. See [the beginner guide](README.md) for details and commands.

No shared application/controller/frontend files, package files, environment files
or other members' modules were changed. Phase 1 uses substantive commits for the
backend import, static page, model tests, API tests and this handover. The overall
eight-commit target has not been padded with empty or artificial commits.

**Stop here. Phase 2 requires the user's explicit confirmation that the team
leader approved the Discography changes.**
