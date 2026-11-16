# Modern Musician 

## Scope
- Node.js and Express application/server setup.
- Middleware for JSON and form submissions.
- Static hosting of the original Modern Musician homepage.
- MongoDB connection configuration using Mongoose and `.env` (optional in this isolated demo).
- `/api/test` health endpoint.
- Local JSON announcements API with GET, POST, PUT and DELETE.
- Homepage fetches and displays announcements from `/api/updates`.


## Run
1. Install Node.js.
2. Open this folder in VS Code/terminal.
3. Run `npm install`.
4. Optional: create `.env` from `.env.example` and add your own Atlas URI if you want to demonstrate the Mongoose connection. Never commit `.env`.
5. Run `npm start`.
6. Open `http://localhost:3000`.

The local JSON announcements API works without MongoDB credentials. If `MONGO_URI` is provided, the server also attempts a MongoDB connection.

## Routes
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/test` | Check Express server |
| GET | `/api/updates` | Read announcements |
| POST | `/api/updates` | Add announcement |
| PUT | `/api/updates/:id` | Edit announcement |
| DELETE | `/api/updates/:id` | Delete announcement |

### Example POST body
```json
{
  "title": "New single announced",
  "category": "Music update",
  "description": "A new release is coming soon.",
  "date": "2026-11-17"
}
```

## Data flow
Homepage (`public/index.html`) → browser JavaScript (`public/js/main.js`) → Express route (`src/routes/updateRoutes.js`) → controller (`src/controllers/updateController.js`) → `src/data/updates.json`.

## Testing CRUD
Use Postman or curl. For POST/PUT, select JSON body. For PUT/DELETE, use the numeric `id` returned by GET/POST. The JSON file is updated on disk.

## Responsibility boundary
This mini-project covers Sneha’s assigned files and homepage scope only. It intentionally excludes the other members’ Releases, Tour, Gallery, Contact, external iTunes and Admin modules. Those belong in the integrated group project, not this individual mini-project.
