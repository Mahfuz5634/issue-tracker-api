# Issue Tracker Backend API

A Express.js + TypeScript backend for managing issue reports with authentication, role-based access control, filtering, sorting, and Postman-ready API examples.

## ✨ Features

- User signup and login
- JWT-based authentication
- Role-based access for issue creation, update, and delete
- Issue CRUD operations
- Filtering by `type` and `status`
- Sorting by `oldest` / `newest`
- Postman collection included in `Docs/`
- Vercel deployment configuration included in `vercel.json`

## 🧰 Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL via Neon serverless pool
- JWT authentication
- bcrypt password hashing
- Zod schemas for auth payload validation

## 📁 Project Structure

- `src/server.ts` - starts the server
- `src/app.ts` - Express app and route registration
- `src/app/modules/auth/*` - authentication routes, controller, service, and validation
- `src/app/modules/issues/*` - issue routes, controller, and service
- `src/app/config/db.ts` - database connection config
- `Docs/postman_collection.json` - Postman collection
- `vercel.json` - Vercel deployment config

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create a `.env` file in the project root with the following variables:

```env
DB_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
JWT_EXPIRES_IN=7d
```

> `DB_URL`, `JWT_SECRET`, and `BCRYPT_SALT_ROUNDS` are required for the app to run.

### 3. Run locally

```bash
npm run dev
```

The server runs on `http://localhost:5000`.

## 🧪 Scripts

```bash
npm run dev
```

Starts the development server with `tsx watch`.

```bash
npm test
```

The current `package.json` test script is not configured and returns an error.

## 📡 API Endpoints

### Authentication

#### `POST /api/auth/signup`

Creates a new user.

**Body**

```json
{
  "name": "Mahfuz",
  "email": "mahfuz@gmail.com",
  "password": "123456",
  "role": "contributor"
}
```

#### `POST /api/auth/login`

Authenticates a user and returns a JWT token and user details.

**Body**

```json
{
  "email": "mahfuz@gmail.com",
  "password": "123456"
}
```

### Issues

#### `POST /api/issues`

Creates an issue. Requires a valid JWT in the `Authorization` header.

**Headers**

```http
Authorization: <raw-jwt-token>
Content-Type: application/json
```

**Body**

```json
{
  "title": "Database timeout under heavy load",
  "description": "Database pool gets exhausted after concurrent requests causing timeout issues.",
  "type": "bug"
}
```

#### `GET /api/issues`

Returns all issues, with optional filters and sorting.

**Query parameters**

- `type=bug`
- `status=open`
- `sort=oldest`
- `sort=newest`

Examples:

- `GET /api/issues`
- `GET /api/issues?type=bug`
- `GET /api/issues?status=open`
- `GET /api/issues?type=bug&status=open&sort=newest`

#### `GET /api/issues/:id`

Returns a single issue record and its reporter.

#### `PATCH /api/issues/:id`

Updates an issue. Requires a valid JWT.

- `maintainer` can update any issue
- `contributor` can update only their own issue when it is still `open`

#### `DELETE /api/issues/:id`

Deletes an issue. Requires a valid JWT and `maintainer` role.

## 🔐 Authentication Notes

- Protected routes expect the **raw JWT token** in the `Authorization` header.
- Do **not** prefix the token with `Bearer`.
- The `Login` response returns:
  - `token`
  - `user` details

## 🧾 Postman

The Postman collection is available at:

- `Docs/postman_collection.json`

It includes variables for:

- `base_url`
- `jwt_token`

Set `jwt_token` after a successful login and run the authenticated requests.

## ☁️ Deployment

The repo includes `vercel.json`, which deploys the compiled server from `dist/server.js`.

If you want to prepare a build locally, run:

```bash
npx tsc
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a pull request

## 📝 Notes

- The current API uses the database schema defined under `src/app/db/schema/`
- The app expects a working Neon/PostgreSQL database connection
- There is no dedicated test suite configured at this time
