# Snip — URL Shortener
 
A full-stack URL shortener with cookie-based JWT authentication. Users register, log in, shorten URLs tied to their account, and manage their links from a dashboard.
 
---
 
## Features
 
- Email/password authentication with bcrypt password hashing
- Stateless auth via JWT stored in an HTTP cookie (not localStorage — avoids XSS token theft)
- Create short links tied to the logged-in user
- View all your own links, sorted by most recent
- Delete links you no longer need
- 301 redirect from short link to original URL
- Protected dashboard route — redirects to login if not authenticated
---
 
## Tech Stack
 
**Backend**
- Node.js / Express
- MongoDB with Mongoose
- JWT for session tokens
- bcrypt for password hashing
- cookie-parser, cors
**Frontend**
- React 18 (Vite)
- React Router v6
- Context API for auth state
- Plain CSS with a token-based design system (no UI framework)
---
 
## Project Structure
 
```
url-shortener/
├── backend/
│   ├── Controllers/
│   │   ├── AuthController.js      # register, login, logout
│   │   └── UrlsController.js      # shorten, redirect, delete, list
│   ├── Models/
│   │   ├── UrlModel.js
│   │   └── UserModel.js
│   ├── routes/
│   │   ├── AuthRoutes.js
│   │   └── UrlRoutes.js
│   ├── Services/
│   │   ├── AuthService.js         # JWT verification middleware
│   │   └── generateShortUrl.js
│   ├── utils/
│   │   └── ConnectDb.js
│   └── index.js
└── frontend/
    ├── src/
    │   ├── components/            # Navbar, Footer
    │   ├── context/
    │   │   └── AuthContext.jsx    # login/register/logout, auth state
    │   ├── pages/                 # Landing, Login, Register, Dashboard, About
    │   ├── App.jsx                # routes + route guards
    │   └── main.jsx
    └── vite.config.js
```
 
---
 
## API Reference
 
All `/urls` routes except the redirect require a valid `token` cookie.
 
### Auth
 
| Method | Endpoint        | Body                              | Description              |
|--------|-----------------|------------------------------------|---------------------------|
| POST   | `/auth/register`| `{ name, email, password }`        | Create a new account      |
| POST   | `/auth/login`   | `{ email, password }`              | Sets JWT cookie on success|
| GET    | `/auth/logout`  | —                                  | Clears the auth cookie    |
 
### URLs
 
| Method | Endpoint            | Auth required | Description                          |
|--------|---------------------|----------------|----------------------------------------|
| POST   | `/urls/shorten`     | Yes            | Body: `{ longUrl }` → returns short URL|
| GET    | `/urls`             | Yes            | Returns all links for the logged-in user|
| POST   | `/urls/delete/:id`  | Yes            | `:id` is the short code, not Mongo `_id`|
| GET    | `/urls/:id`         | No             | Redirects (301) to the original URL    |
 
---
 
## Authentication Flow
 
1. User registers → password hashed with bcrypt → stored in MongoDB.
2. User logs in → password verified → server signs a JWT (`{ _id, email }`) and sets it as an HTTP cookie.
3. Every subsequent request to a protected route sends the cookie automatically (`credentials: "include"` on the frontend).
4. Backend middleware (`AuthService.js`) verifies the JWT on each request and attaches the decoded payload to `req.user`.
5. Logout clears the cookie server-side; the frontend clears its local auth state.
---
 
## Local Setup
 
### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas connection string)
### Backend
 
```bash
cd backend
npm install
```
 
Create a `.env` file in `backend/`:
 
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
 
```bash
npm start
```
 
Server runs on `http://localhost:3000`.
 
### Frontend
 
```bash
cd frontend
npm install
npm run dev
```
 
App runs on `http://localhost:5173`.
 
> The backend must allow CORS from `http://localhost:5173` with `credentials: true` for the auth cookie to work across origins in development.
 
---
 
## Known Limitations
 
- No password reset / email verification flow.
- No rate limiting on the `/urls/shorten` endpoint — open to abuse if deployed publicly without one.
- Short codes are not checked for collisions before insert.
- No click analytics on shortened links.
