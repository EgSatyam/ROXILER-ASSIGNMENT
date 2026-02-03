# Quickstart — Store Ratings App

This file shows the exact steps to run the project locally (database, backend, frontend) on Windows (PowerShell). Adjust for macOS/Linux if needed.

---

## 1) Prerequisites

- Node.js 16+ installed
- MySQL server running and accessible
- Git (optional)

## 2) Clone / Open workspace

Open the workspace at `d:/roxilerAssignment` (this repository).

## 3) Create the database schema

You can either let the backend `sequelize.sync()` create tables, or run the provided SQL directly.

From PowerShell (example):

```powershell
# Import SQL (adjust user/password as needed)
mysql -u root -p < .\sql\schema.sql
```

Alternatively, run the SQL file content from your MySQL client.

## 4) Backend setup

1. Open a PowerShell terminal and go to the backend folder:

```powershell
cd d:\roxilerAssignment\backend
```

2. Copy sample environment and update credentials:

```powershell
copy .env.sample .env
# Edit .env using your editor and set DB_HOST, DB_USER, DB_PASS, JWT_SECRET, PORT
```

Example `.env` values (do NOT use these in production):

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=store_ratings
DB_USER=root
DB_PASS=your_db_password
JWT_SECRET=change_this_to_a_secure_random_value
PORT=4000
```

3. Install dependencies and start the server (dev mode):

```powershell
npm install
npm run dev
```

If `npm install` shows vulnerabilities (audit warnings), run the audit fix commands below to attempt automatic remediation:

```powershell
# Try safe fixes first
npm audit fix

# If still unresolved (may upgrade packages with breaking changes), run:
npm audit fix --force
```

Also ensure your npm is up-to-date; older npm versions often surface deprecated/transitive warnings. Update npm globally:

```powershell
npm install -g npm@latest
```

- The server will attempt to `sequelize.sync()` and start on the configured `PORT` (default 4000).
- API base: `http://localhost:4000/api`

### Create an initial ADMIN user

Because admin-only endpoints require an ADMIN user, create one by inserting a user row directly into the database.

1. Generate a bcrypt hash (run inside the `backend` folder where `bcrypt` is installed):

```powershell
# Replace "StrongAdmin1!" with your chosen admin password
node -e "console.log(require('bcrypt').hashSync('StrongAdmin1!', 10))"
```

This prints a bcrypt hash string. Copy it.

2. Insert admin user into MySQL (adjust email, name, address):

```sql
INSERT INTO users (name, email, address, password_hash, role)
VALUES ('System Administrator Sample Account', 'admin@example.com', 'Admin Address', '<PASTE_HASH_HERE>', 'ADMIN');
```

- Ensure `name` meets the validation (20–60 characters).

## 5) Frontend setup

1. Open a new terminal and go to the frontend folder:

```powershell
cd d:\roxilerAssignment\frontend
```

2. Copy sample env and install dependencies:

```powershell
copy .env.sample .env
npm install
```

3. Start the frontend dev server:

```powershell
npm run dev
```

- Vite will serve the app (usually on `http://localhost:5173`). The frontend expects the API at the URL in `REACT_APP_API_URL` (default `http://localhost:4000/api`).

## 6) Quick usage flow

- Open the frontend in your browser.
- Login as the admin you created (`admin@example.com` / `StrongAdmin1!`).
- As ADMIN you can create users and stores via the Admin dashboard (the frontend exposes simple views; API endpoints exist for full functionality).
- Signup as a normal user via the Signup page to test rating flows.
- Use a STORE_OWNER account (created by an admin) to login and view the owner dashboard.

## 7) API endpoints (summary)

- `POST /api/auth/signup` — signup (USER)
- `POST /api/auth/login` — login (returns JWT and role)
- `POST /api/auth/update-password` — password change (auth required)
- `GET /api/admin/dashboard` — requires ADMIN
- `POST /api/admin/users` — create users (ADMIN)
- `POST /api/admin/stores` — create store (ADMIN)
- `GET /api/stores` — list/search stores (public)
- `POST /api/stores/:id/rating` — submit rating (USER)
- `PUT /api/stores/:id/rating` — update rating (USER)
- `GET /api/owner/dashboard` — requires STORE_OWNER

## 8) Notes & debugging

- Backend logs to console. If DB connection fails, check `.env` credentials and the MySQL service.
- If tables do not exist, either import `sql/schema.sql` or allow the app to `sequelize.sync()` on startup.
- To create additional seeded data, use SQL INSERTs or implement seed scripts.

---

If you want, I can now add a small `scripts/seed-admin.js` helper to automate the admin creation (generates hash and inserts into DB). Would you like that?  

*** End of Quickstart ***