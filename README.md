# ERP Management System (MERN Stack)

A full-stack ERP web application built with MongoDB, Express.js, React, and Node.js, designed to manage core business operations in one platform.

## Live Project

- Frontend: https://erp-system-omega-brown.vercel.app/
- Backend API: https://erp-backend-rkn4.onrender.com/
- Source Code: https://github.com/Jaykumar-Kale/erp-system

## Overview

This project implements a practical ERP workflow with authentication, inventory tracking, order management, invoicing, and dashboard analytics.

Core modules:
- User authentication and role-based access
- Product and inventory management
- Customer and supplier management
- Sales order management
- Invoice management
- Dashboard KPIs and low-stock visibility

## Tech Stack

- Frontend: React 18, React Router, Axios
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB Atlas
- Security: JWT, bcrypt
- Utilities: dotenv, morgan, express-validator

## Architecture

```text
erp-system/
   backend/    # REST API, business logic, database models
   frontend/   # React application and UI modules
```

## Key Features

- JWT-based login and protected API routes
- Role-based access: admin, manager, employee
- Inventory adjustments through sales workflow
- Sales order to invoice lifecycle
- Dashboard metrics for operations and finance
- Seed script for demo and testing data

## API Summary

Base path:

```text
/api
```

Main routes:
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/customers`
- `GET /api/suppliers`
- `GET /api/sales-orders`
- `GET /api/invoices`
- `GET /api/dashboard/stats`

## Local Setup

### 1. Clone repository

```bash
git clone https://github.com/Jaykumar-Kale/erp-system.git
cd erp-system
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Configure environment variables

Backend:

```bash
cd backend
copy .env.example .env
```

Frontend:

```bash
cd frontend
copy .env.example .env
```

Required backend variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRE`
- `FRONTEND_URL`

Required frontend variables:
- `REACT_APP_API_URL`

### 4. Seed demo data

```bash
cd backend
npm run seed
```

Demo accounts:
- `admin@erp.com` / `Admin@123`
- `manager@erp.com` / `Manager@123`
- `employee@erp.com` / `Employee@123`

### 5. Start application

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

Local URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Deployment

Current deployment stack:
- Backend: Render
- Frontend: Vercel
- Database: MongoDB Atlas

### Backend (Render)

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRE`
   - `NODE_ENV=production`
   - `FRONTEND_URL=<vercel-domain>`

### Frontend (Vercel)

- Root Directory: `frontend`
- Build Command: `npm run build`
- Environment Variables:
   - `REACT_APP_API_URL=<render-backend-url>/api`

## Available Scripts

Backend:
- `npm start` - start API in production mode
- `npm run dev` - start API in development mode
- `npm run seed` - seed sample data

Frontend:
- `npm start` - run React app in development mode
- `npm run build` - build production bundle

## Project Status

- Deployed and accessible on cloud
- Auth and CRUD flows verified
- Atlas seeded with sample data
- Submission document prepared in [SUBMISSION_TEMPLATE.md](SUBMISSION_TEMPLATE.md)

## Roadmap

Planned future improvements:
- Purchase order and GRN UI expansion
- Better reporting and charting modules
- Export features (PDF/CSV)
- Automated tests for critical API flows
- Improved audit trail and activity logs

## Author

Jaykumar Kailas Kale

## License

This project is created for educational and internship submission purposes.
