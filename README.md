Finance Backend API

A production-ready backend service for managing financial records, built with NestJS, Prisma, and PostgreSQL. The system includes authentication, role-based access control, filtering, and summary APIs, and is deployed using Docker on AWS EC2 with a managed PostgreSQL database.

Features

- User authentication with JWT (RSA-based)
- Role-based access control (RBAC)
- Financial records CRUD
- Filtering by date, category, and type
- Dashboard summary APIs (totals and trends)
- Input validation and structured error handling
- Swagger API documentation
- Dockerized deployment
- Managed PostgreSQL database (NeonDB)

Tech Stack

- Backend Framework: NestJS
- Language: TypeScript
- Database: PostgreSQL (NeonDB)
- ORM: Prisma
- Authentication: JWT (RSA)
- Containerization: Docker, Docker Compose
- Deployment: AWS EC2
- API Docs: Swagger

Project Structure

src/
auth/
records/
common/
prisma/
dist/
prisma/
docker-compose.yaml
Dockerfile
prisma.config.ts

Getting Started

Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- PostgreSQL database (or NeonDB)

Clone the repository

git clone https://github.com/SaiPrabhasKola/finance-backend.git

cd finance-backend

Configure environment variables

Create a .env file:

DATABASE_URL=your_database_url
JWT_PRIVATE_KEY=your_private_key
JWT_PUBLIC_KEY=your_public_key
PORT=3000

Install dependencies

npm install

Run migrations

npx prisma migrate deploy

Start the application

npm run start:dev

Running with Docker

Build and start:

docker-compose up -d --build

Stop services:

docker-compose down

API Documentation

Swagger UI is available at:

http://54.252.149.171/:3000/api

Deployment

The application is deployed on AWS EC2 using Docker.

- Multi-stage Docker build for optimized image size
- Environment variables managed via .env
- External PostgreSQL (NeonDB) used instead of local container
- Public access via EC2 instance IP

Key Technical Decisions

- NestJS chosen for modular architecture and scalability
- Prisma used for type-safe database access and migrations
- RSA-based JWT used for improved security over symmetric keys
- Multi-stage Docker build separates build and runtime environments
- Prisma config-based setup required explicit handling in Docker
- NeonDB used to reduce infrastructure overhead

Known Limitations

- No refresh token mechanism
- No rate limiting or request throttling
- No centralized logging or monitoring
- HTTPS and reverse proxy not configured

Future Improvements

- Add CI/CD pipeline for automated deployment
- Integrate NGINX with HTTPS
- Implement refresh tokens and session management
- Add rate limiting and request logging
- Introduce monitoring and alerting
