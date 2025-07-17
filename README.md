# 🥯 DoughNation - Backend API

DoughNation is a Node.js backend API built with Express.js, PostgreSQL, Prisma ORM, and JWT for authentication. It is containerized using Docker and designed for deployment to platforms like Render.

---

## 🧱 Project Structure

.
├── src/ # Source code
│ ├── config/ # Configuration (e.g., DB, JWT)
│ ├── controllers/ # Route controllers
│ ├── middlewares/ # Express middlewares (auth, error handling)
│ ├── routes/ # API route definitions
│ ├── services/ # Business logic layer
│ ├── utils/ # Utility functions
│ ├── app.ts # Main Express app file
│ └── server.ts # Entry point
├── prisma/
│ ├── schema.prisma # Prisma DB schema
├── .env # Environment variables (NOT committed)
├── docker-compose.yaml # Docker multi-service config (App + PostgreSQL)
├── Dockerfile # Dockerfile to build the backend image
├── package.json
└── README.md # Project documentation

---

## ⚙️ Technologies Used

- **Node.js + Express** – Backend framework
- **TypeScript** – Static typing
- **PostgreSQL** – Relational database
- **Prisma ORM** – Type-safe DB access
- **JWT (JSON Web Token)** – Auth system
- **Docker + Docker Compose** – Containerized services
- **dotenv** – Environment variable loading

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/spanzyteo/doughnation-backend.git
cd doughnation

### 2. Create .env file

DATABASE_URL=
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development

⚠️ DO NOT commit your .env file. It's already ignored in .gitignore.

### 3. Run with Docker (recommended)
Ensure you have Docker installed, then run:

docker compose up --build
This will:

Start the Express app

Start PostgreSQL using postgres:13-alpine

Run prisma generate and npm run dev

Prisma ORM
To manage the database with Prisma:

# Generate Prisma client
npx prisma generate

# Push Prisma schema to DB
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio

🧪 API Endpoints
Coming soon: Swagger documentation or Postman collection.

Typical routes (not exhaustive):

POST /auth/register – Register user

POST /auth/login – Login and receive token

POST /api/v1/project – Protected route with JWT
GET  /api/v1/project - Get all project route
GET  /api/v1/review - Get all reviews route
GET  /api/v1/categories - Get all categories route


🐳 Docker Overview
app – Node.js/Express container

db – PostgreSQL 13 with persistent volume

volumes:
  postgres-data:   # Persists PostgreSQL data

🛠️ Scripts
npm run dev         # Start development server with ts-node
npm run build       # Compile TypeScript
npm start           # Run compiled JavaScript (production)

🚀 Deployment Notes
✅ GitHub
Safe to commit all code except:

.env

node_modules

dist (optional)

✅ Render (Recommended for Hosting)
Use Dockerfile to deploy app service

Use Render PostgreSQL Add-on for database

Set environment variables in the dashboard

docker-compose.yaml is for local dev only, Render does not use it directly.

🙌 Contribution
Feel free to fork, clone, and submit pull requests. If you'd like to contribute, open an issue to discuss it.

📄 License
MIT License.

✨ Author
Confidence Theophilus
Frontend & Backend Developer
Nigeria 🇳🇬
