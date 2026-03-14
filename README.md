# ERP Management System (MERN Stack)

A full-stack ERP application built with MongoDB, Express.js, React, and Node.js.

It supports core business workflows including:
- Product and inventory management
- Supplier and customer management
- Sales order processing
- Invoice generation and tracking
- Dashboard analytics
- Role-based authentication

## Project Structure

```text
erp-system/
  backend/      # Node.js + Express API + MongoDB models
  frontend/     # React web application
```

## Tech Stack

- Frontend: React 18, React Router, Axios
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB
- Auth/Security: JWT, bcrypt
- Utilities: dotenv, morgan, express-validator

## Key Features

- JWT-based login and protected routes
- Role-based user access (admin, manager, employee)
- Inventory auto-adjust on sales orders
- Sales order to invoice flow
- Dashboard KPIs (orders, invoices, revenue, low stock)
- Seed script for quick demo data setup

## Local Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd erp-system

cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure environment variables

Backend:

```bash
cd backend
copy .env.example .env
```

Update `backend/.env` values:
- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL`

Frontend:

```bash
cd frontend
copy .env.example .env
```

### 3. Seed demo data (optional but recommended)

```bash
cd backend
npm run seed
```

Demo credentials:
- `admin@erp.com` / `Admin@123`
- `manager@erp.com` / `Manager@123`
- `employee@erp.com` / `Employee@123`

### 4. Run app

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm start
```

Frontend URL: `http://localhost:3000`
Backend URL: `http://localhost:5000`

## API Base Path

All backend APIs are served under:

```text
/api
```

Examples:
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/sales-orders`
- `GET /api/invoices`

## Deployment Guide

Recommended stack:
- Backend: Render (Web Service)
- Frontend: Vercel (React)
- Database: MongoDB Atlas

### Deploy Backend (Render)

1. Push code to GitHub.
2. Create a Render Web Service from this repo.
3. Set root directory to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add env vars from `backend/.env.example`:
   - `MONGODB_URI` (Atlas URI)
   - `JWT_SECRET`
   - `JWT_EXPIRE` (e.g., `7d`)
   - `NODE_ENV=production`
   - `FRONTEND_URL=<your-vercel-domain>`

### Deploy Frontend (Vercel)

1. Create a Vercel project from this repo.
2. Set root directory to `frontend`.
3. Add env var:
   - `REACT_APP_API_URL=<your-render-backend-url>/api`
4. Deploy.

## Scripts

Backend scripts:
- `npm start` - Run backend in production mode
- `npm run dev` - Run backend in development mode
- `npm run seed` - Seed sample ERP data

Frontend scripts:
- `npm start` - Run React app
- `npm run build` - Production build

## Submission Checklist

Before internship submission, ensure:
- Project pushed to GitHub
- `README.md` updated (this file)
- Backend + frontend both run successfully
- Seed data visible in UI
- Repository is clean and organized

I have also added a ready template at `SUBMISSION_TEMPLATE.md` you can copy into your internship submission.

## License

This project is for educational and internship submission purposes.
