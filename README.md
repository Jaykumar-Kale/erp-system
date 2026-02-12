# 🏢 ERP Management System - MERN Stack

A comprehensive **Enterprise Resource Planning (ERP) system** built with **MongoDB, Express.js, React, and Node.js**. 

This is a production-ready system providing complete inventory management, purchase order workflow, goods receipt management, sales order processing, customer relations, supplier management, and invoicing capabilities.

**⭐ Perfect for learning MERN stack and understanding business workflows!**

---

## 📸 Project Overview

```
WHAT DOES THIS SYSTEM DO?

✅ Manage Products          - Add, edit, delete products with stock levels
✅ Track Inventory          - Auto-update on purchase receipt & sales
✅ Purchase Orders          - Create POs, approve them, track delivery
✅ Goods Receipt (GRN)      - Receive goods from suppliers, auto-update stock
✅ Sales Orders             - Sell products to customers
✅ Invoices                 - Auto-generate invoices for sales
✅ Manage Customers         - Customer database with credit tracking
✅ Manage Suppliers         - Supplier database with ratings
✅ Dashboard Analytics      - Real-time stats, low stock alerts
✅ User Management          - Create admin/employee accounts
```

---

## 🎯 Core Features (What Makes This Special)

### 1. **Complete Purchase Workflow**
```
Supplier → Create PO → Approve PO → Receive Goods (GRN) → Auto Inventory Update
```

### 2. **Complete Sales Workflow**
```
Customer → Create Sales Order → Reduce Inventory → Auto Invoice Generation
```

### 3. **Smart Inventory Tracking**
- Auto-increase stock when goods received (GRN)
- Auto-decrease stock when goods sold (Sales Order)
- Low stock alerts when below reorder level
- Real-time stock visibility

### 4. **Automatic Calculations**
- Invoice totals with GST
- Outstanding customer balances
- Purchase order costs
- Stock movement tracking

### 5. **Security & Authentication**
- JWT-based login (secure token)
- Password encryption (bcrypt)
- Role-based access control (Admin, Manager, Employee)
- Protected API endpoints

---

## 🏗️ Project Architecture

```
┌─────────────────────┐
│   FRONTEND (React)  │ ← User Interface (localhost:3000)
│                     │
│ • Dashboard         │
│ • Products          │
│ • Orders            │
│ • GRN               │
│ • Customers         │
│ • Invoices          │
│ • Users             │
└──────────┬──────────┘
           │
    (HTTP API Calls)
           │
┌──────────▼──────────┐
│  BACKEND (Express)  │ ← Business Logic (localhost:5000)
│                     │
│ • Authentication    │
│ • Validation        │
│ • Auto-calculations │
│ • Database queries  │
└──────────┬──────────┘
           │
    (Mongoose queries)
           │
┌──────────▼──────────┐
│  DATABASE (MongoDB) │ ← Data Storage
│                     │
│ • Collections:      │
│   - users           │
│   - products        │
│   - orders          │
│   - invoices        │
│   - customers       │
│   - ... (7 total)   │
└─────────────────────┘
```

---

## 📊 Database Schema

### Collections Overview:

1. **users** - Admin/employee accounts
2. **products** - Inventory items with stock levels & reorder levels
3. **customers** - Sales customers with credit tracking
4. **suppliers** - Goods suppliers
5. **sales_orders** - Customer orders (auto-reduce inventory)
6. **purchase_orders** - Supplier orders (needs approval)
7. **grn** - Goods receipt notes (auto-increase inventory)
8. **invoices** - Bills for sales orders (auto-generated)

---

## 🛠️ Tech Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database & ODM
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcryptjs** - Password encryption
- **Express-validator** - Request validation
- **Morgan** - Request logging
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **React Router v6** - Page navigation
- **Axios** - HTTP requests
- **Recharts** - Data visualization
- **CSS3** - Styling

---

## 📋 Prerequisites

Before running this project:

- **Node.js** v14+ installed - [Download](https://nodejs.org/)
- **MongoDB** installed & running - [Setup Guide](SETUP.md)
- **Git** installed - [Download](https://git-scm.com/)
- **Basic JavaScript knowledge** - To understand the code
- **Basic React knowledge** - To modify frontend

---

## ⚡ Quick Start (5 Minutes)

### 1. Install MongoDB
See [SETUP.md](SETUP.md) for detailed instructions.

### 2. Clone Project
```bash
git clone https://github.com/YOUR_USERNAME/skyBricks-ERP.git
cd skyBricks
```

### 3. Setup Backend
```bash
cd backend
npm install
# Update .env file with your values
npm run dev
```

✅ You should see: `✅ MongoDB Connected Successfully`

### 4. Setup Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
```

✅ Browser opens at http://localhost:3000

### 5. Register & Login
- Click "Register" 
- Create account with **role: admin**
- Login and see dashboard!

---

## 🚀 After Installation (Next Steps)

For a beginner's guide to:
1. Test all features
2. Understand the workflows
3. Learn how the code works
4. Prepare for interviews

**See**: [NEXT_STEPS.md](NEXT_STEPS.md) 📖

---

## 📚 Learning Resources

### For Beginners (MERN Stack Learners):
- **[MERN_LEARNING_GUIDE.md](MERN_LEARNING_GUIDE.md)** ⭐
  - Explains MERN stack from scratch
  - How client-server works
  - How data flows through the app
  - Database relationships explained
  - Real code examples

### For Intermediate (Already Know MERN):
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)**
  - All API endpoints
  - Request/response formats
  - Authentication method
  - Example curl commands

### For Setup Troubleshooting:
- **[SETUP.md](SETUP.md)** - Installation & configuration
- **[MONGODB_INSTALL.md](MONGODB_INSTALL.md)** - MongoDB installation
- **[GITHUB_SETUP.md](GITHUB_SETUP.md)** - Push to GitHub

---

## 💡 Understanding the Workflows

### Workflow 1: Receiving Goods from Supplier

```
Create Purchase Order (Pending)
         ↓
Admin Approves PO (Approved)
         ↓
Goods Arrive from Supplier
         ↓
Create GRN (Goods Receipt Note)
         ↓
✅ Inventory AUTOMATICALLY INCREASED!
```

**Example:**
- Before: 100 laptops, Order 50 more
- Create & Approve PO
- Receive 48 laptops via GRN (2 damaged)
- **After: 100 + 48 = 148 laptops** ✅

### Workflow 2: Selling Goods to Customer

```
Customer Orders Products
         ↓
Create Sales Order
         ↓
✅ Inventory AUTOMATICALLY DECREASED!
✅ Invoice AUTOMATICALLY CREATED!
✅ Customer Balance AUTOMATICALLY UPDATED!
```

**Example:**
- Before: 148 laptops, Customer buys 5
- Create Sales Order for 5 laptops
- **After: 148 - 5 = 143 laptops** ✅
- **Invoice created for 5 × 50000 = 250000 INR** ✅
- **Customer owes: 250000 INR** ✅

### Workflow 3: Low Stock Alerts

```
Inventory < Reorder Level
         ↓
⚠️ Alert on Dashboard
         ↓
Create new PO
         ↓
✅ Stock Replenished
```

**Example:**
- Product: Laptop, Current: 3, Reorder Level: 20
- ⚠️ Alert: "Stock critically low!"
- Create PO for 100 more
- Receive via GRN
- **Now: 3 + 100 = 103** ✅

---

## 📁 Folder Structure

```
skyBricks-ERP/
│
├── backend/                        ← Server code (Node.js + Express)
│   ├── models/                    ← Database schemas (8 collections)
│   │   ├── User.js                (Login/register)
│   │   ├── Product.js             (Inventory)
│   │   ├── SalesOrder.js          (SO with auto-inventory)
│   │   ├── PurchaseOrder.js       (PO with approval)
│   │   ├── GRN.js                 (Goods receipt with auto-inventory)
│   │   ├── Invoice.js             (Bills, auto-generated)
│   │   ├── Customer.js            (Sales customers)
│   │   └── Supplier.js            (Goods suppliers)
│   │
│   ├── controllers/               ← Business logic
│   │   ├── authController.js      (Login/register)
│   │   ├── productController.js   (Product CRUD)
│   │   ├── salesOrderController.js (SO creation, auto-calculations)
│   │   ├── purchaseOrderController.js (PO creation & approval)
│   │   ├── grnController.js       (GRN creation, auto-inventory)
│   │   ├── invoiceController.js   (Invoice generation)
│   │   └── ...
│   │
│   ├── routes/                    ← API endpoints
│   │   ├── auth.js                (/api/auth - login/register)
│   │   ├── products.js            (/api/products)
│   │   ├── sales-orders.js        (/api/sales-orders)
│   │   ├── purchase-orders.js     (/api/purchase-orders)
│   │   ├── grn.js                 (/api/grn)
│   │   └── ...
│   │
│   ├── middleware/                ← Authentication
│   │   └── auth.js                (JWT verification)
│   │
│   ├── server.js                  ← Entry point
│   ├── .env                       ← Configuration (SECRET KEYS)
│   ├── .env.example               ← Template for .env
│   └── package.json               ← Dependencies
│
├── frontend/                       ← Client code (React)
│   ├── src/
│   │   ├── pages/                ← Full pages
│   │   │   ├── Dashboard.js      (Home, statistics)
│   │   │   ├── Login.js          (Login page)
│   │   │   ├── Products.js       (Product list & CRUD)
│   │   │   ├── SalesOrders.js    (Create, view orders)
│   │   │   ├── PurchaseOrders.js (PO management)
│   │   │   ├── GRN.js            (Goods receipt)
│   │   │   ├── Invoices.js       (View invoices)
│   │   │   └── Users.js          (User management)
│   │   │
│   │   ├── components/            ← Reusable UI components
│   │   ├── context/              ← Auth context (login state)
│   │   ├── utils/                ← API configuration
│   │   ├── App.js                ← Main app
│   │   └── index.js              ← Render App
│   │
│   └── package.json              ← Dependencies
│
├── .gitignore                     ← Files NOT pushed to GitHub
├── README.md                      ← This file
├── API_DOCUMENTATION.md           ← API reference
├── MERN_LEARNING_GUIDE.md         ← MERN tutorial
└── NEXT_STEPS.md                  ← What to do after setup
```

---

## 🔐 Security Features

✅ **Password Encryption** - Bcrypt hashes passwords (plaintext never stored)  
✅ **JWT Authentication** - Secure token-based login  
✅ **Route Protection** - API endpoints require JWT token  
✅ **Input Validation** - All inputs validated before processing  
✅ **Environment Variables** - Secrets in .env (never in code)  
✅ **.gitignore** - Secrets not pushed to GitHub  

---

## 📖 API Overview

### Authentication
```
POST /api/auth/register - Create new user
POST /api/auth/login    - Login user (returns JWT token)
```

### Products
```
GET    /api/products         - List all products
POST   /api/products         - Create product
GET    /api/products/:id     - Get product details
PUT    /api/products/:id     - Update product
DELETE /api/products/:id     - Delete product
```

### Sales Orders
```
GET    /api/sales-orders     - List all orders
POST   /api/sales-orders     - Create order (auto-reduces inventory)
GET    /api/sales-orders/:id - Get order details
```

### Purchase Orders
```
GET    /api/purchase-orders  - List all POs
POST   /api/purchase-orders  - Create PO
PUT    /api/purchase-orders/:id/approve - Approve PO
```

### GRN (Goods Receipt)
```
GET    /api/grn              - List all GRNs
POST   /api/grn              - Create GRN (auto-increases inventory)
GET    /api/grn/:id          - Get GRN details
```

### Invoices
```
GET    /api/invoices         - List all invoices
GET    /api/invoices/:id     - Get invoice details
```

**See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete details with examples!**

---

## 🧪 Testing the System

### Quick Test (10 minutes):

1. **Create Sample Data**
   - Add 3-4 products
   - Add 2 suppliers
   - Add 2 customers

2. **Test Purchase Workflow**
   - Create PO
   - Approve PO
   - Create GRN
   - Verify inventory increased

3. **Test Sales Workflow**
   - Create sales order
   - Verify inventory decreased
   - Check invoice auto-created

4. **Check Dashboard**
   - See statistics
   - Check low stock alerts

**Detailed testing guide**: See [NEXT_STEPS.md](NEXT_STEPS.md)

---

## 🚀 Deployment (When Ready)

This project is ready to deploy to:
- **Heroku** - Free tier available
- **Railway** - Simple deployment
- **MongoDB Atlas** - Cloud database (free tier 512MB)
- **AWS/Azure/Google Cloud** - For production

---

## 📝 Project Files That Are NOT on GitHub

These files are for LOCAL learning only (in .gitignore):
- `MERN_LEARNING_GUIDE.md` - Detailed MERN tutorial
- `SETUP.md` - Installation instructions
- `MONGODB_INSTALL.md` - MongoDB setup
- `QUICK_START_CHECKLIST.md` - Setup checklist
- `NEXT_STEPS.md` - What to do after setup
- `.env` - Configuration with secrets

**Why?** These are large, contain setup instructions specific to local machines, and learning guides. GitHub is for public code only.

---

## 🎓 Learning Path

### Week 1: Understand the System
- Follow [SETUP.md](SETUP.md) for installation
- Follow [NEXT_STEPS.md](NEXT_STEPS.md) to test workflows
- Read [MERN_LEARNING_GUIDE.md](MERN_LEARNING_GUIDE.md)

### Week 2: Understand the Code
- Read backend models
- Read backend controllers
- Read frontend components
- Follow [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### Week 3: Modify & Create
- Add new fields to Product model
- Add new validation in controller
- Create new API endpoint
- Deploy to cloud

---

## ❓ FAQ

**Q: Is this production-ready?**  
A: Yes! It has authentication, validation, error handling, and security features.

**Q: Can I use this as a portfolio project?**  
A: Absolutely! It demonstrates MERN stack expertise. Push to GitHub and show interviewers.

**Q: How do I add new features?**  
A: Add model → Add controller logic → Add routes → Add frontend components.

**Q: How much data can it handle?**  
A: Millions of records with MongoDB. Design depends on your queries.

**Q: Is it scalable?**  
A: Yes! With proper indexing, API structure is production-standard.

**Q: What's the learning curve?**  
A: If you know JavaScript, ~2 weeks to understand everything. See MERN_LEARNING_GUIDE.md

---

## 🤝 Contributing

This is an educational project. Feel free to:
- Fork the repository
- Make improvements
- Submit pull requests
- Report issues

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎉 Conclusion

This ERP system covers 80% of real-world MERN stack concepts:
- ✅ Complete CRUD operations
- ✅ Complex relationships between entities
- ✅ Auto-calculations and updates
- ✅ Authentication & authorization
- ✅ Real business workflows
- ✅ Error handling & validation

**Master this project, and you can build ANY web application!**

---

## 📧 Questions?

- **Installation issues?** See [SETUP.md](SETUP.md)
- **Don't understand MERN?** See [MERN_LEARNING_GUIDE.md](MERN_LEARNING_GUIDE.md)
- **API questions?** See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Testing workflow?** See [NEXT_STEPS.md](NEXT_STEPS.md)

---

**Happy Coding! 🚀**

*Built with ❤️ for learners to master MERN Stack*

cd backend

# Install dependencies
npm install

# Create .env file (already exists, update values as needed)
# Update the following variables:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/erp_system
# JWT_SECRET=your_jwt_secret_key_here
# JWT_EXPIRE=7d

# Start MongoDB (if not running)
# On Windows:
net start MongoDB
# On macOS/Linux:
sudo systemctl start mongod

# Start backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

The frontend will start on `http://localhost:3000`

## Default Login Credentials

After first run, register a new user or use these test credentials if you seed the database:

```
Email: admin@example.com
Password: admin123
Role: admin
```

## Project Structure

```
skyBricks/
├── backend/
│   ├── models/           # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Customer.js
│   │   ├── Supplier.js
│   │   ├── Order.js
│   │   └── Invoice.js
│   ├── controllers/      # Business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── customerController.js
│   │   ├── supplierController.js
│   │   ├── orderController.js
│   │   ├── invoiceController.js
│   │   └── dashboardController.js
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & validation
│   ├── .env            # Environment variables
│   ├── server.js       # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   │   └── Layout/
│   │   ├── pages/       # Page components
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Products/
│   │   │   ├── Customers/
│   │   │   ├── Suppliers/
│   │   │   ├── Orders/
│   │   │   ├── Invoices/
│   │   │   └── Users/
│   │   ├── context/     # React context
│   │   ├── utils/       # Utilities
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order (auto-updates inventory)
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create invoice
- `GET /api/invoices/:id` - Get single invoice
- `PUT /api/invoices/:id` - Update invoice
- `POST /api/invoices/:id/payment` - Record payment

### Users (Admin/Manager only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Dashboard
- `GET /api/dashboard/stats` - Get statistics

## User Roles & Permissions

### Admin
- Full access to all features
- User management
- System configuration

### Manager
- Access to all modules except user management
- Can create, edit, delete products, customers, suppliers, orders, invoices

### Employee
- View-only access to most modules
- Can create orders and invoices
- Cannot delete records

## Features Breakdown

### Product Management
- Add/Edit/Delete products
- Track inventory levels
- Set minimum stock levels
- Low stock alerts
- Category management
- SKU tracking
- Cost and sale price management

### Customer Management
- Customer database
- Contact information
- GST number tracking
- Credit limit management
- Outstanding balance tracking

### Order Management
- Create orders with multiple items
- Automatic inventory reduction
- Order status tracking (pending, processing, shipped, delivered, cancelled)
- Payment status tracking
- Order history

### Invoice Management
- Generate invoices from orders
- Track payments
- Due amount calculations
- Payment history
- Invoice status (draft, sent, paid, overdue, cancelled)

### Dashboard Analytics
- Total products count
- Total customers count
- Total orders count
- Total revenue
- Low stock products alert
- Recent orders list
- Recent invoices list

## Deployment

### Backend Deployment (e.g., Heroku, DigitalOcean, AWS)

1. Set environment variables on your hosting platform
2. Update MONGODB_URI to your production database
3. Ensure JWT_SECRET is secure
4. Deploy using:
```bash
npm start
```

### Frontend Deployment (e.g., Netlify, Vercel)

1. Update API base URL in `frontend/src/utils/api.js` to your deployed backend
2. Build the production version:
```bash
npm run build
```
3. Deploy the `build` folder

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/erp_system
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MongoDB URI in .env file
- Verify network connections

### Port Already in Use
- Change PORT in backend .env file
- Kill process using the port:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### CORS Issues
- Ensure frontend proxy is set correctly in package.json
- Check CORS configuration in server.js

## Future Enhancements

- [ ] Email notifications
- [ ] PDF invoice generation
- [ ] Advanced reporting and analytics
- [ ] Barcode scanning
- [ ] Multi-warehouse support
- [ ] Purchase orders management
- [ ] Expense tracking
- [ ] Employee attendance
- [ ] Payroll management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@example.com or create an issue in the repository.

## Author

Created with ❤️ for ERP Management

---

**Note**: Remember to update the JWT_SECRET in the .env file before deploying to production!
