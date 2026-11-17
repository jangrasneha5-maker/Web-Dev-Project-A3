# Release API request examples

Import `tests/releases/Release.postman_collection.json` into Postman. Its five requests use the original Release router. The `/api/releases` prefix is the integration contract in the original application.

The current branch requires the shared CRUD helper and router registration before these requests can run successfully. Configure `baseUrl` for a separate server connected to a disposable test database, such as `http://localhost:3000`. Run requests 01–05 in order. POST creates a unique test title and stores the returned `_id` in `releaseId`. GET-one, PUT and DELETE then target that record. Use the generated test record for mutation requests.

| Method | URL | Expected success |
| --- | --- | --- |
| GET | `{{baseUrl}}/api/releases` | 200, array sorted by newest creation time |
| POST | `{{baseUrl}}/api/releases` | 201, message and `record` |
| GET | `{{baseUrl}}/api/releases/{{releaseId}}` | 200, selected record |
| PUT | `{{baseUrl}}/api/releases/{{releaseId}}` | 200, message and updated `record` |
| DELETE | `{{baseUrl}}/api/releases/{{releaseId}}` | 200, deletion message |

POST and PUT use `Content-Type: application/json`. The collection uses the original field names.

```json
{
  "title": "Disposable assessment release",
  "artist": "Assessment test musician",
  "genre": "Alternative",
  "releaseYear": 2026,
  "artwork": "",
  "description": "Disposable Release API test record"
}
```

A partial PUT follows the original shared helper's update behavior.

```json
{
  "title": "Disposable assessment release edited",
  "releaseYear": 2026
}
```

The four required fields are `title`, `artist`, `genre` and `releaseYear`. Text is trimmed for the first three. The year range is 1900–2100. Optional `artwork` and `description` default to empty strings. Timestamps are maintained by Mongoose.

After shared integration, check these error cases against the isolated test server.

| Request | Input | Expected response from the original helper |
| --- | --- | --- |
| GET-one or DELETE | `not-an-object-id` | 400, `Invalid record ID.` |
| POST | `{}` | 400, `Could not create Release.` |
| POST | Valid fields with year 1899 or 2101 | 400, `Could not create Release.` |
| PUT | Created test ID with year 1800 | 400, `Could not update Release.` |
| PUT | Malformed ID | 400, `Could not update Release.` |
| GET-one, PUT or DELETE | ID of the deleted test record | 404, `Release not found.` |

The prepared automated API suite covers the five operations, required fields, malformed GET IDs, invalid update years, and missing records after deletion. Run `node --test tests/releases/api.test.cjs` with the opt-in environment variables described in the contribution guide after integration.

Postman execution and MongoDB persistence remain pending. Collection inspection and contract tests provide offline evidence. Registration of the router and provision of the original shared CRUD helper belong to the shared backend handover.