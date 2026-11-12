# SwiftShip Shipping Platform

A shipment creation, administration, and package tracking application built with React, Express, and MongoDB.

## Features

- Public shipment lookup with current status and a chronological tracking history.
- Admin dashboard backed by database counts and recent shipments.
- Shipment creation, search, filters, sorting, pagination, details, editing, and lifecycle updates.
- Cancellation with tracking-history events; permanent deletion is limited to cancelled or returned shipments.
- Optional Geoapify address autocomplete with international address fields and a manual-entry fallback.
- Admin-only API operations protected by JWT authentication and role checks.

## Project layout

```text
shipping-client/   React 19, Vite, Tailwind CSS, React Router
shipping-server/   Express API, Mongoose models, Zod validation
```

## Run locally

Prerequisites: Node.js, npm, and a MongoDB instance.

1. Configure the API:

```bash
cd shipping-server
npm install
cp .env.example .env
```

Set `MONGO_URI` and a private `JWT_SECRET` in `shipping-server/.env`. `GEOAPIFY_API_KEY` is optional. Keep it in the server environment only; do not add a `VITE_` prefix. Without it, admins can still enter addresses manually.

2. Start the API in one terminal:

```bash
npm run dev
```

3. Configure and start the client in a second terminal:

```bash
cd shipping-client
npm install
cp .env.example .env
npm run dev
```

Public registration creates ordinary `user` accounts. To create an administrator locally, seed a user with the `admin` role in your development database. The API independently verifies this role for every admin operation.

## Address autocomplete

The server proxies address autocomplete through Geoapify so the key stays out of the browser bundle. Suggestions include the formatted address, street, city, state, country, postal code, and coordinates when the provider has them. Selected address details are persisted with the shipment. The form is debounced and keeps manual entry available when the key or provider is unavailable.

## Shipment lifecycle

Shipment status values are `pending`, `pending_payment`, `confirmed`, `picked_up`, `processing`, `in_transit`, `out_for_delivery`, `delivered`, `failed_delivery`, `returned`, and `cancelled`. The server validates allowed transitions and appends each update to tracking history with its previous status, new status, timestamp, message, and location.

Customer tracking responses omit sender and recipient names, contact information, and street-level addresses. Route coordinates are rounded before they are returned publicly.

## Environment variables

| Variable | App | Purpose |
|---|---|---|
| `PORT` | Server | Express listen port |
| `MONGO_URI` | Server | MongoDB connection string |
| `JWT_SECRET` | Server | Private JWT signing secret |
| `JWT_EXPIRES_IN` | Server | Access token expiry, such as `1d` |
| `GEOAPIFY_API_KEY` | Server | Optional private address autocomplete key |
| `API_URL` | Client | API base URL, such as `http://localhost:8000/api` |

## Tests

Run the server validation, status lifecycle, schema, and authorization tests with:

```bash
cd shipping-server
npm test
```
