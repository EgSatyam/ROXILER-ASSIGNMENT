**Store Ratings - Full Stack App**

Overview
- Backend: Node.js + Express + Sequelize + MySQL
- Frontend: React + Vite
- Auth: JWT
- Passwords: bcrypt

Prereqs
- Node.js (16+)
- MySQL server

1) Database
- Create a database and run SQL in `sql/schema.sql` to create tables.

2) Backend setup
- cd backend
- copy `.env.sample` to `.env` and set DB credentials and `JWT_SECRET`
- npm install
- npm run dev (or `npm start`)

API overview (base `/api`)
- POST `/auth/signup` (name,email,address,password) — create normal user (validations enforced)
- POST `/auth/login` (email,password) — returns `token` and `role`
- POST `/auth/update-password` (oldPassword,newPassword) — auth required

Admin (requires `Authorization: Bearer <token>` of ADMIN)
- GET `/admin/dashboard` — totals
- POST `/admin/stores` — create store
- GET `/admin/stores` — list with query params (name,email,address,sortBy,order)
- POST `/admin/users` — create user/admin/store_owner
- GET `/admin/users` — list users with filters
- GET `/admin/users/:id` — user details

User
- GET `/stores` — list stores (search by name/address)
- POST `/stores/:id/rating` — submit rating (1-5) (USER role)
- PUT `/stores/:id/rating` — update rating (USER role)

Store Owner
- GET `/owner/dashboard` — list of users who rated store(s) and average

Frontend setup
- cd frontend
- copy `.env.sample` to `.env` and set `REACT_APP_API_URL` if needed
- npm install
- npm run dev

Role-based access
- Role stored in DB (`ADMIN`,`USER`,`STORE_OWNER`)
- JWT issued on login contains user id and role
- Backend enforces role checks using middleware

Strict validation rules implemented
- `name`: 20-60 chars
- `address`: max 400 chars
- `password`: 8-16 chars, at least one uppercase and one special character
- `email`: standard format

Notes
- The backend uses `sequelize.sync()` to create tables if missing; for production use migrations.
- Ensure to create an initial admin user either by DB insert or by using `/admin/users` after seeding an admin.
