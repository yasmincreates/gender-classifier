# Gender Classifier API

A REST API that classifies the likely gender of a name using the Genderize.io API.

## Live URL
https://your-railway-url.up.railway.app

## Endpoint

### Classify Name
GET /api/classify?name={name}

**Success Response (200):**
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-13T16:11:13.828Z"
  }
}

**Error Responses:**
- 400: Missing or empty name parameter
- 422: name must be a string / No prediction available
- 502: Upstream API failure

## Tech Stack
- NestJS
- TypeScript
- Node.js
- Axios

## Run Locally
npm install
npm run start:dev