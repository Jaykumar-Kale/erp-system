# 📚 Complete MERN Stack Learning Guide - For Beginners

**This guide explains your ERP project from scratch to advanced level.**

---

## 📖 Table of Contents

1. [What is MERN?](#what-is-mern)
2. [How The Internet Works](#how-the-internet-works)
3. [Client-Server Architecture](#client-server-architecture)
4. [Your Project Structure](#your-project-structure)
5. [Data Flow in Your App](#data-flow-in-your-app)
6. [Backend Explained](#backend-explained)
7. [Frontend Explained](#frontend-explained)
8. [Database Explained](#database-explained)
9. [How Authentication Works](#how-authentication-works)
10. [How Inventory Updates Work](#how-inventory-updates-work)

---

## 1. What is MERN?

**MERN** = MongoDB + Express + React + Node.js

Let me break it down:

### **MongoDB** (Database)
- **What**: A database (like a filing cabinet for your data)
- **What it stores**: Products, Users, Orders, Invoices, etc.
- **Why NoSQL**: Flexible data structure (not rigid tables like SQL)
- **Your use**: All business data for the ERP system
- **Location**: Runs on your computer or cloud (MongoDB Atlas)

### **Express** (Backend Framework)
- **What**: A framework that runs on Node.js to handle requests
- **What it does**: Receives requests from frontend, processes them, responds
- **Why**: Lightweight, easy to use, perfect for REST APIs
- **Your use**: Handles login, product CRUD, order processing, inventory updates
- **Runs on**: `localhost:5000`

### **React** (Frontend Library)
- **What**: A JavaScript library for building user interfaces
- **What it does**: Creates interactive web pages, handles user interactions
- **Why**: Reusable components, fast updates, easy state management
- **Your use**: Dashboard, forms, product listings, order pages
- **Runs on**: `localhost:3000`

### **Node.js** (JavaScript Runtime)
- **What**: JavaScript running on the server (not in browser)
- **What it does**: Executes JavaScript code on backend
- **Why**: Same language for both frontend and backend (JavaScript)
- **Your use**: Express server runs on Node.js

---

## 2. How The Internet Works

### Simple Request-Response Model:

```
User's Browser (Frontend)          Internet           Your Computer (Backend)
     |                                |                        |
     | 1. User clicks "Add Product"   |                        |
     |-----> Sends HTTP POST Request -|------> Express Server  |
     |                                | 2. Receives request    |
     |                                | 3. Validates data      |
     |                                | 4. Saves to MongoDB    |
     |                                | 5. Sends JSON response |
     |<----- Returns HTTP Response <--|---------------------------|
     | 6. Browser receives response
     | 7. Frontend updates UI (shows new product)
```

### Real Example from Your App:

1. **User action**: You click "Add Product" button
2. **Frontend sends**: `POST http://localhost:5000/api/products` with product data
3. **Backend receives**: Express controller processes it
4. **Database**: MongoDB stores the product
5. **Response sent**: `{ success: true, product: {...} }`
6. **Frontend updates**: Dashboard shows new product

---

## 3. Client-Server Architecture

Your ERP system uses **Client-Server** architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Frontend)                     │
│                                                           │
│  • Browser (React)                                       │
│  • UI Components (Dashboard, Forms, Tables)             │
│  • Handles user interactions                             │
│  • Stores JWT token locally                              │
│  • Makes HTTP requests to backend                        │
│                                                           │
│  Runs on: localhost:3000                                │
└────────────────────────────────────────────────────────┘
                           ↑
                      HTTP Requests
                      (REST API)
                           ↓
┌────────────────────────────────────────────────────────┐
│                 SERVER (Backend)                        │
│                                                          │
│  • Express.js (Node.js)                                │
│  • API Endpoints (/api/products, /api/orders, etc)    │
│  • Business Logic (validations, calculations)          │
│  • Authentication & Authorization                      │
│  • Database interactions                                │
│                                                          │
│  Runs on: localhost:5000                               │
└────────────────────────────────────────────────────────┘
                           ↑
                      Database Queries
                           ↓
┌────────────────────────────────────────────────────────┐
│                  DATABASE (MongoDB)                    │
│                                                          │
│  • Collections: users, products, orders, invoices, etc |
│  • Stores all business data                             │
│  • Accessed via Mongoose (ORM)                         │
│                                                          │
│  Runs on: localhost:27017 (or MongoDB Atlas cloud)     │
└────────────────────────────────────────────────────────┘
```

### How Data Flows:

1. **Frontend** (React in browser) → Makes API call
2. **Backend** (Express server) → Processes request, validates, performs business logic
3. **Database** (MongoDB) → Stores/retrieves data
4. **Response** → Backend sends JSON back to frontend
5. **UI Update** → Frontend updates what user sees

---

## 4. Your Project Structure

```
skyBricks/
│
├── backend/                          ← ⚙️ SERVER CODE (Express.js)
│   ├── models/                       ← 📋 Database schemas
│   │   ├── User.js                   (Username, password, role)
│   │   ├── Product.js                (SKU, name, price, quantity, reorderLevel)
│   │   ├── Customer.js               (Name, email, GST, outstanding balance)
│   │   ├── Supplier.js               (Name, contact, payment terms)
│   │   ├── SalesOrder.js             (Customer order, reduces inventory)
│   │   ├── PurchaseOrder.js          (Supplier order, approval workflow)
│   │   ├── GRN.js                    (Goods receipt, updates inventory)
│   │   └── Invoice.js                (Bill for sales orders)
│   │
│   ├── controllers/                  ← 🎯 Business Logic
│   │   ├── authController.js         (Register, login, JWT)
│   │   ├── productController.js      (Add, edit, delete, list products)
│   │   ├── salesOrderController.js   (Create sales orders)
│   │   ├── purchaseOrderController.js (Create POs, approve them)
│   │   ├── grnController.js          (Receive goods, update stock)
│   │   ├── invoiceController.js      (Generate invoices)
│   │   └── dashboardController.js    (Statistics & analytics)
│   │
│   ├── routes/                       ← 🛣️ API Endpoints
│   │   ├── auth.js                   (/api/auth - register, login)
│   │   ├── products.js               (/api/products - CRUD operations)
│   │   ├── sales-orders.js           (/api/sales-orders)
│   │   ├── purchase-orders.js        (/api/purchase-orders)
│   │   ├── grn.js                    (/api/grn)
│   │   ├── invoices.js               (/api/invoices)
│   │   ├── customers.js              (/api/customers)
│   │   └── suppliers.js              (/api/suppliers)
│   │
│   ├── middleware/                   ← 🔐 Authentication & Validation
│   │   └── auth.js                   (Checks JWT token for protected routes)
│   │
│   ├── .env                          ← ⚙️ Configuration (DATABASE, JWT_SECRET)
│   ├── server.js                     ← 🚀 Entry point (starts Express)
│   └── package.json                  ← 📦 Dependencies
│
├── frontend/                         ← 🎨 USER INTERFACE (React)
│   ├── src/
│   │   ├── pages/                    ← 📄 Full page components
│   │   │   ├── Dashboard.js          (Home, statistics)
│   │   │   ├── Login.js              (Login form)
│   │   │   ├── Register.js           (Registration form)
│   │   │   ├── Products.js           (Product listing)
│   │   │   ├── SalesOrders.js        (Sales order management)
│   │   │   ├── PurchaseOrders.js     (Purchase order management)
│   │   │   ├── GRN.js                (Goods receipt)
│   │   │   ├── Invoices.js           (Invoice listing)
│   │   │   └── Users.js              (User management)
│   │   │
│   │   ├── components/               ← 🧩 Reusable components
│   │   │   ├── Navbar.js             (Top navigation)
│   │   │   ├── Sidebar.js            (Left menu)
│   │   │   ├── ProductForm.js        (Reusable form)
│   │   │   └── ... other components
│   │   │
│   │   ├── context/                  ← 📦 Global state
│   │   │   └── AuthContext.js        (Stores logged-in user, JWT token)
│   │   │
│   │   ├── utils/                    ← 🔧 Helper functions
│   │   │   └── api.js                (Axios config for API calls)
│   │   │
│   │   ├── App.js                    ← Entry point
│   │   └── index.js                  ← Renders App
│   │
│   └── package.json                  ← 📦 Dependencies

├── .gitignore                        ← 🚫 What NOT to push to GitHub
├── README.md                         ← 📖 Project overview
└── documentation files (in local)    ← For learning only, not pushed
```

### Key Concept: **Separation of Concerns**

- **Backend**: Handles all business logic, security, database
- **Frontend**: Handles UI, user interaction, displays data
- **Database**: Stores all data

Example: When you create a product:
- **Frontend**: Shows form to user
- **Backend**: Validates data, checks permissions, saves to database
- **Database**: Stores product

---

## 5. Data Flow in Your App

### Example: Creating a Product

#### **Step 1: User Interaction (Frontend)**
```
User opens Products page → Clicks "Add Product" button → Form appears
```

#### **Step 2: User Submits Form (Frontend)**
```javascript
// In ProductForm.js
const handleSubmit = (formData) => {
  // formData = { name: "Laptop", sku: "LAP-001", price: 50000, quantity: 100 }
  
  // Send to backend
  api.post('/api/products', formData)
    .then(response => {
      // Update dashboard
      setProducts([...products, response.data.product])
    })
}
```

#### **Step 3: Backend Receives Request (Express)**
```javascript
// backend/routes/products.js
app.post('/api/products', authenticate, (req, res) => {
  // req.body = { name: "Laptop", sku: "LAP-001", ... }
  
  // Controller processes it
  productController.createProduct(req, res)
})
```

#### **Step 4: Business Logic (Controller)**
```javascript
// backend/controllers/productController.js
const createProduct = async (req, res) => {
  try {
    // Validation
    if (!req.body.name) return res.status(400).json({ error: "Name required" })
    
    // Create document
    const product = new Product(req.body)
    
    // Save to database
    await product.save()
    
    // Send response
    res.json({ success: true, product })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
```

#### **Step 5: Database Operation (MongoDB)**
```
MongoDB saves:
{
  _id: ObjectId("..."),
  name: "Laptop",
  sku: "LAP-001",
  price: 50000,
  quantity: 100,
  reorderLevel: 20,
  createdAt: ISODate("2026-02-12T...")
}
```

#### **Step 6: Response Returns (Backend → Frontend)**
```json
{
  "success": true,
  "product": {
    "_id": "...",
    "name": "Laptop",
    "sku": "LAP-001",
    "price": 50000,
    "quantity": 100
  }
}
```

#### **Step 7: Frontend Updates UI**
```javascript
// Frontend receives response
setProducts([...products, newProduct])  // Add to list
showNotification("Product created!")    // Show success message
navigate('/products')                   // Redirect to products page
```

#### **Step 8: User Sees Update**
```
✅ Product added successfully!
Product list now shows new "Laptop" product
```

---

## 6. Backend Explained

### What Backend Does:

1. **Receives requests** from frontend
2. **Validates data** (Is email valid? Is stock > 0?)
3. **Performs business logic** (Calculate invoice total, update inventory, etc)
4. **Interacts with database** (Save, read, update, delete)
5. **Sends response** back to frontend

### Real Example: Create Sales Order

```javascript
// What frontend sends:
POST /api/sales-orders
{
  customerId: "123",
  items: [
    { productId: "456", quantity: 5 }
  ]
}

// What backend does:
1. Check if user is authenticated (JWT token valid?)
2. Validate: Does product exist? Is quantity available?
3. Calculate: Total price = quantity × product.price
4. Update inventory: Product.quantity -= 5
5. Create invoice automatically
6. Save sales order to database
7. Send confirmation back to frontend

// What frontend receives:
{
  success: true,
  order: {
    _id: "999",
    orderNumber: "SO-00001",
    customerId: "123",
    items: [...],
    totalAmount: 250000,
    status: "pending",
    createdAt: "2026-02-12..."
  }
}
```

### Key Files:

- **models/SalesOrder.js**: Defines schema (what data is stored)
- **controllers/salesOrderController.js**: Business logic (what happens when order created)
- **routes/sales-orders.js**: API endpoints (how to access from frontend)
- **middleware/auth.js**: Checks if user is logged in before allowing action

---

## 7. Frontend Explained

### What Frontend Does:

1. **Shows UI** to user (forms, tables, buttons)
2. **Captures user input** (clicks, form submissions)
3. **Sends requests** to backend
4. **Receives responses** from backend
5. **Updates UI** based on responses

### Real Example: Dashboard

```javascript
// Dashboard.js
import React, { useEffect, useState } from 'react'
import { api } from '../utils/api'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // When component loads, fetch data from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Send request to backend
        const response = await api.get('/api/dashboard/stats')
        
        // Backend returns: { totalProducts: 50, totalRevenue: 5000000, ... }
        setStats(response.data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Show loading message while fetching
  if (loading) return <h2>Loading dashboard...</h2>

  // Display data once received
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-box">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-box">
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
```

### React Concepts You've Used in This Project:

1. **Components**: Reusable UI pieces
   - Example: Dashboard.js, ProductForm.js
   - Can have state, can receive props

2. **State (useState)**: Data that can change
   - Example: `const [products, setProducts] = useState([])`
   - When state changes, React re-renders component

3. **Effects (useEffect)**: Run code after component renders
   - Example: Fetch data from backend when page loads
   - Runs once with empty dependency array `[]`

4. **Context (useContext)**: Pass data without prop drilling
   - Example: AuthContext.js for logged-in user data
   - Avoid passing props through many components

5. **Routing (React Router)**: Navigate between pages
   - Example: `/dashboard`, `/products`, `/orders`
   - Uses `<Route>` and `<Link>` components

---

## 8. Database Explained

### MongoDB vs SQL

| Feature | MongoDB (Yours) | SQL (MySQL, PostgreSQL) |
|---------|-----------------|------------------------|
| **Type** | NoSQL (Document) | SQL (Relational) |
| **Structure** | Flexible JSON-like | Rigid tables & columns |
| **Storage** | Collections & Documents | Tables & Rows |
| **Scaling** | Horizontal (easy) | Vertical (complex) |
| **Relationships** | Embedded or referenced | Foreign keys |

### Your Database Collections:

#### **1. Users Collection**
```json
{
  "_id": ObjectId("..."),
  "name": "Admin User",
  "email": "admin@company.com",
  "password": "bcrypt_hashed_password",
  "role": "admin",
  "phone": "9876543210",
  "department": "Management",
  "createdAt": ISODate("...")
}
```

**What it stores**: Who can use the company's system  
**Who can see**: Only admin can view all users  
**Passwords**: Never stored in plain text, always encrypted

#### **2. Products Collection**
```json
{
  "_id": ObjectId("..."),
  "sku": "LAP-001",
  "name": "Dell Laptop",
  "description": "Business laptop",
  "quantity": 95,              // Current stock
  "minStockLevel": 10,         // Alert if below this
  "reorderLevel": 20,          // Order more when below this
  "price": 50000,
  "category": "Electronics",
  "supplier": ObjectId("..."), // References Supplier
  "createdAt": ISODate("...")
}
```

**What it stores**: What you're selling  
**How quantity changes**:
- Increases: When GRN created (goods received)
- Decreases: When Sales Order created
- Alerts: If quantity < reorderLevel

#### **3. Customers Collection**
```json
{
  "_id": ObjectId("..."),
  "name": "ABC Corporation",
  "email": "contact@abc.com",
  "phone": "8765432109",
  "city": "Mumbai",
  "gst": "29ZYXWV9876E1Z8",
  "creditLimit": 1000000,      // Max they can owe
  "outstandingBalance": 250000, // How much they currently owe
  "createdAt": ISODate("...")
}
```

**What it stores**: Who you're selling to  
**Why outstanding balance**: Track who owes money  
**Credit limit**: Don't sell more than this amount if not paid

#### **4. Sales Orders Collection**
```json
{
  "_id": ObjectId("..."),
  "orderNumber": "SO-00001",   // Auto-generated
  "customerId": ObjectId("..."),
  "items": [
    {
      "productId": ObjectId("..."),
      "quantity": 5,
      "unitPrice": 50000,
      "total": 250000          // quantity × unitPrice
    }
  ],
  "totalAmount": 250000,
  "status": "pending",          // pending, shipped, delivered
  "deliveryDate": "2026-02-20",
  "createdAt": ISODate("...")
}
```

**What it stores**: Orders you're selling  
**Auto operations**:
- Reduces product quantity
- Updates customer outstanding balance
- Creates invoice automatically

#### **5. Purchase Orders Collection**
```json
{
  "_id": ObjectId("..."),
  "poNumber": "PO-00001",       // Auto-generated
  "supplierId": ObjectId("..."),
  "items": [
    {
      "productId": ObjectId("..."),
      "quantity": 50,
      "unitPrice": 45000
    }
  ],
  "totalAmount": 2250000,
  "status": "pending",          // pending, approved, received, cancelled
  "expectedDelivery": "2026-02-15",
  "approvedBy": ObjectId("..."), // Admin who approved
  "approvedAt": ISODate("..."),
  "createdAt": ISODate("...")
}
```

**What it stores**: Orders you're buying  
**Approval workflow**:
- Created with status "pending"
- Admin must approve (changes to "approved")
- GRN created after approval
- Status changes to "received" when GRN created

#### **6. GRN Collection (Goods Receipt Notes)**
```json
{
  "_id": ObjectId("..."),
  "grnNumber": "GRN-00001",     // Auto-generated
  "purchaseOrderId": ObjectId("..."),
  "items": [
    {
      "productId": ObjectId("..."),
      "ordered": 50,            // We ordered this much
      "received": 48,           // We received this much
      "accepted": 48,           // Quality check passed
      "rejected": 2,            // Damaged/defective
      "remarks": "2 units damaged in shipping"
    }
  ],
  "totalReceived": 48,
  "receivedBy": ObjectId("..."), // Which employee received
  "receivedAt": ISODate("..."),
  "createdAt": ISODate("...")
}
```

**What it stores**: What you actually received from suppliers  
**Auto inventory update**:
- When GRN created, product.quantity += accepted
- From our example: Product stock increased by 48 units

#### **7. Invoices Collection**
```json
{
  "_id": ObjectId("..."),
  "invoiceNumber": "INV-00001",
  "salesOrderId": ObjectId("..."),
  "customerId": ObjectId("..."),
  "items": [
    {
      "productId": ObjectId("..."),
      "quantity": 5,
      "unitPrice": 50000,
      "total": 250000
    }
  ],
  "subtotal": 250000,
  "tax": 45000,                 // 18% GST
  "totalAmount": 295000,
  "status": "unpaid",           // unpaid, paid, partially_paid
  "paymentTerms": "Net 30",
  "dueDate": "2026-03-13",
  "createdAt": ISODate("...")
}
```

**What it stores**: Bills for sales orders  
**Auto generated**: When sales order created
**Tax calculation**: Automatically calculates GST

### Relationships Between Collections:

```
┌─────────────┐
│   Supplier  │
│   (Company) │
└──────┬──────┘
       │
       ├─→ (creates) ┌─────────────┐
       │             │Purchase Order│──→ (must be approved)
       │             └──────┬───────┘
       │                    │
       │                    ├─→ ┌─────┐
       │                    │   │ GRN │──→ (updates inventory)
       │                    │   └─────┘
       │                    │
       └────────────────────┼─→ ┌──────────┐
                            └───→ Product │ (quantity updated)
                                 └────┬───┘
                                      │
                                      ├─→ (sells) ┌────────────┐
                                      │           │Sales Order │──→ (creates)
                                      │           └──────┬─────┘
                                      │                  │
                                      └───(reduces)      ├─→ ┌─────────┐
                                                         │   │ Invoice │
                                      ┌───────────────┐  │   └─────────┘
                                      │   Customer    │←─┘
                                      │(outstanding   │
                                      │balance updated)
                                      └───────────────┘
```

---

## 9. How Authentication Works

### Why You Need Authentication:

Without authentication, anyone could:
- View all customer data
- Create fake orders
- Delete products
- Access unauthorized pages

### JWT Token System (Your Project Uses):

```
┌──────────────────────────────────────────────────────┐
│                 USER REGISTRATION                    │
├──────────────────────────────────────────────────────┤
│ 1. User enters email & password                      │
│ 2. Code checks: Is email already registered?        │
│ 3. Password encrypted using bcrypt                  │
│ 4. User saved to database                           │
│ 5. JWT token generated                              │
│ 6. Token sent to browser                            │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│                    USER LOGIN                        │
├──────────────────────────────────────────────────────┤
│ 1. User enters email & password                      │
│ 2. Code checks: Does user exist?                    │
│ 3. Password verified (encrypted match?)             │
│ 4. JWT token created                                │
│ 5. Token sent to browser                            │
│ 6. Frontend stores token in localStorage            │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│              MAKING AUTHENTICATED REQUEST            │
├──────────────────────────────────────────────────────┤
│ 1. Frontend sends GET /api/products                  │
│ 2. Token included in header: Authorization: Bearer  │
│ 3. Backend middleware checks token                  │
│ 4. If valid: Request allowed                        │
│ 5. If invalid: Error 401 Unauthorized               │
│ 6. Response sent back                               │
└──────────────────────────────────────────────────────┘
```

### JWT Token Structure:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluQGNvbXBhbnkuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

[Header].[Payload].[Signature]
```

**Header**: Encryption type  
**Payload**: User info (ID, email, role)  
**Signature**: Ensures token is not tampered with

### Code Example: Login

```javascript
// Frontend: LoginPage.js
const handleLogin = async (email, password) => {
  const response = await api.post('/api/auth/login', {
    email,
    password
  })
  
  // response.data = { token: "jwt_token_here", user: {...} }
  
  // Store token in browser
  localStorage.setItem('token', response.data.token)
  
  // Redirect to dashboard
  navigate('/dashboard')
}

// ============================================

// Backend: authController.js
const login = async (req, res) => {
  const { email, password } = req.body
  
  // Find user
  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ error: "User not found" })
  
  // Compare password (encrypted)
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ error: "Wrong password" })
  
  // Create JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }  // Token valid for 7 days
  )
  
  // Send token
  res.json({ token, user })
}

// ============================================

// Backend: Middleware (auth.js)
const authenticate = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) return res.status(401).json({ error: "No token provided" })
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Attach user info to request
    req.user = decoded
    
    // Continue to controller
    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" })
  }
}

// ============================================

// Usage: protected routes
app.get('/api/products', authenticate, productController.getProducts)
//     ↑ Only authenticated users can access
```

---

## 10. How Inventory Updates Work

This is the **core feature** of your ERP system. Let me explain the complete flow:

### Scenario: Complete Purchase-to-Sales Workflow

#### **Initial State:**
- Product: "Laptop" with Quantity = 100, reorderLevel = 20

#### **Step 1: Purchase Order Created**
```
Admin creates PO to supplier for 50 laptops
Status: pending (waiting for approval)
Inventory: UNCHANGED (100 units)
```

#### **Step 2: Purchase Order Approved**
```javascript
// Backend: purchaseOrderController.js
const approvePurchaseOrder = async (req, res) => {
  const po = await PurchaseOrder.findById(req.params.id)
  po.status = 'approved'
  po.approvedBy = req.user.id
  po.approvedAt = new Date()
  await po.save()
  // Inventory: UNCHANGED (100 units)
  // Why? We haven't received goods yet
}
```

Status: approved  
Inventory: UNCHANGED (100 units)

#### **Step 3: Goods Receipt Note (GRN) Created**
```javascript
// Backend: grnController.js
const createGRN = async (req, res) => {
  const grn = new GRN({
    purchaseOrderId: req.body.poId,
    items: [
      {
        productId: "laptop_id",
        ordered: 50,
        received: 48,      // 2 damaged
        accepted: 48,
        rejected: 2,
        remarks: "2 damaged in transit"
      }
    ]
  })
  
  // AUTO: Update product inventory
  for each item in grn.items:
    Product.quantity += item.accepted  // Add 48 to existing 100
    // 100 + 48 = 148
  
  await grn.save()
}
```

Status: received  
**Inventory: 100 + 48 = 148 units** ✅ Auto-updated!

#### **Step 4: Sales Order Created**
```javascript
// Backend: salesOrderController.js
const createSalesOrder = async (req, res) => {
  const order = new SalesOrder({
    customerId: req.body.customerId,
    items: [
      {
        productId: "laptop_id",
        quantity: 5
      }
    ]
  })
  
  // AUTO: Reduce inventory
  for each item in order.items:
    const product = await Product.findById(item.productId)
    product.quantity -= item.quantity  // Subtract 5 from existing 148
    // 148 - 5 = 143
    await product.save()
  
  // AUTO: Create invoice
  const invoice = new Invoice({
    salesOrderId: order._id,
    customerId: req.body.customerId,
    items: order.items,
    totalAmount: calculateTotal(order.items)
  })
  await invoice.save()
  
  // AUTO: Update customer balance
  const customer = await Customer.findById(req.body.customerId)
  customer.outstandingBalance += invoice.totalAmount
  await customer.save()
}
```

**Inventory: 148 - 5 = 143 units** ✅ Auto-reduced!  
Invoice: Created automatically  
Customer balance: Updated automatically

#### **Step 5: Check Reorder Level Alert**
```javascript
// If inventory < reorderLevel, show warning
if (product.quantity < product.reorderLevel) {
  alert("⚠️ Stock low for Laptop! Current: 143, Reorder Level: 20")
  // Admin should create new PO
}
```

### Summary: Inventory Flow

```
Start: 100 units

Create & Approve PO (50 units)
  ↓ (Status: approved, NOT received yet)
Inventory: Still 100 ❌ (No goods received)

Create GRN (receive 48 units)
  ↓ (Auto-update inventory)
Inventory: 100 + 48 = 148 ✅ (Received!)

Create Sales Order (sell 5 units)
  ↓ (Auto-reduce inventory)
Inventory: 148 - 5 = 143 ✅ (Sold!)

Check Alert: 143 > 20 (reorderLevel)
  ↓
No alert (stock is ok)

Create Sales Order (sell 130 units more)
  ↓
Inventory: 143 - 130 = 13

Check Alert: 13 < 20 (reorderLevel) ❌
  ↓
⚠️ ALERT: "Stock low! Create new PO"
```

### Why This Matters:

1. **Real-time inventory**: Always accurate
2. **Low stock alerts**: Never run out unintentionally
3. **Audit trail**: Know where stock came from (GRN) and where it went (SO)
4. **Cash flow**: Know customer balances and upcoming orders

---

## Summary of MERN Flow

```
┌───────────────────────────────────────────────────┐
│ User types URL → localhost:3000                   │
│ React app loads in browser                        │
└────────────────────┬────────────────────────────┘
                     │
                     ↓
┌───────────────────────────────────────────────────┐
│ Login/Register (Auth context stores JWT token)   │
└────────────────────┬────────────────────────────┘
                     │
                     ↓
┌───────────────────────────────────────────────────┐
│ Dashboard loaded (useEffect fetches data)        │
│ api.get('/api/dashboard/stats')                  │
└────────────────────┬────────────────────────────┘
                     │
                     ↓ (HTTP request with JWT)
┌────────────────────────────────────────────────────┐
│ Express Server (localhost:5000)                    │
│ Route received: /api/dashboard/stats              │
│ Middleware: Check JWT token ✅                     │
│ Controller: Fetch data from MongoDB               │
└────────────────────┬───────────────────────────────┘
                     │
                     ↓
┌────────────────────────────────────────────────────┐
│ MongoDB                                            │
│ Query: Find all products, orders, etc             │
│ Return: Data to controller                        │
└────────────────────┬───────────────────────────────┘
                     │
                     ↓ (JSON response)
┌───────────────────────────────────────────────────┐
│ Express sends JSON response                       │
│ { totalProducts: 50, revenue: 1000000, ... }     │
└────────────────────┬────────────────────────────┘
                     │
                     ↓
┌───────────────────────────────────────────────────┐
│ React receives response                           │
│ Update state: setStats(response.data)             │
│ Component re-renders                              │
│ User sees updated dashboard! ✅                    │
└───────────────────────────────────────────────────┘
```

---

## Next Steps to Learn More:

1. **Open the code** and follow along with these explanations
2. **Try creating data** (products, customers, orders)
3. **Check your browser's Network tab** (F12) to see real HTTP requests
4. **Check MongoDB** (MongoDB Compass) to see how data is stored
5. **Read controller files** to understand business logic
6. **Read React component files** to understand UI logic

---

**You've got this! This ERP system covers all core MERN concepts. Master this, and you can build any web application!** 🚀
