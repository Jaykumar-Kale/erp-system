# 📁 Complete Project Folder Structure Explained

**Understanding your project file-by-file.**

---

## 🎯 Top Level: What Everything Is

```
skyBricks/                          ← Your project root folder
│
├── 📗 README.md                    ← READ FIRST: Project overview
├── 📗 MERN_LEARNING_GUIDE.md       ← DETAILED: Learn MERN Stack
├── 📗 SETUP.md                     ← HOW TO: Install & run
├── 📗 NEXT_STEPS.md                ← DO THIS: Test workflows
├── 📗 API_DOCUMENTATION.md         ← REFERENCE: All endpoints
├── 📗 GITHUB_SETUP.md              ← HOW TO: Push to GitHub
├── 📗 INTERVIEW_GUIDE.md           ← PREPARE: For interviews
├── 📗 MONGODB_INSTALL.md           ← HELP: MongoDB issues
├── 📗 QUICK_START_CHECKLIST.md     ← CHECKLIST: Setup steps
├── 📗 DOCUMENTATION_INDEX.md       ← INDEX: All guides
├── 📗 PROJECT_COMPLETION_SUMMARY.md ← SUMMARY: What you have
├── 📗 PROJECT_STATUS.md            ← STATUS: Completion checklist
│
├── 📁 backend/                     ← SERVER CODE (Node.js + Express)
│
├── 📁 frontend/                    ← CLIENT CODE (React)
│
├── 🔧 .gitignore                   ← Files NOT pushed to GitHub
│
└── 📄 ERP Management System...pdf  ← Source PDF (not pushed)
```

---

## 📂 Backend Folder Structure

```
backend/
│
├── 🔤 server.js                    ← ENTRY POINT: Starts Express server
│                                    │ • Connects to MongoDB
│                                    │ • Sets up routes
│                                    │ • Starts listening on port 5000
│
├── 📦 package.json                 ← DEPENDENCIES: npm packages
│                                    │ • express, mongoose, jsonwebtoken
│                                    │ • bcryptjs, morgan, cors, dotenv
│
├── 🔐 .env                         ← ⚠️ SECRETS (Never push to GitHub!)
│                                    │ PORT=5000
│                                    │ MONGODB_URI=mongodb://...
│                                    │ JWT_SECRET=your_secret_here
│
├── 🔐 .env.example                 ← TEMPLATE: What .env should look like
│                                    │ (Safe to push - no secrets!)
│
├── 📁 models/                      ← DATABASE SCHEMAS (8 collections)
│   ├── User.js                     │ Email, password, role, department
│   ├── Product.js                  │ SKU, name, price, quantity, reorderLevel
│   ├── Customer.js                 │ Name, email, credit limit, GST, balance
│   ├── Supplier.js                 │ Name, phone, payment terms, rating
│   ├── SalesOrder.js               │ Order number, items, customer, status
│   ├── PurchaseOrder.js            │ PO number, supplier, items, approval
│   ├── GRN.js                      │ GRN number, received qty, auto-inventory
│   └── Invoice.js                  │ Invoice number, total, customer, status
│
├── 📁 controllers/                 ← BUSINESS LOGIC (What happens when API called)
│   ├── authController.js           │ • Register user
│   │                                │ • Login user (create JWT)
│   │
│   ├── productController.js        │ • Create product
│   │                                │ • Read/list products
│   │                                │ • Update product
│   │                                │ • Delete product
│   │
│   ├── salesOrderController.js     │ • Create sales order
│   │                                │ • ⭐ AUTO: Reduce inventory
│   │                                │ • ⭐ AUTO: Create invoice
│   │                                │ • ⭐ AUTO: Update customer balance
│   │
│   ├── purchaseOrderController.js  │ • Create PO
│   │                                │ • List POs
│   │                                │ • Approve PO (change status)
│   │
│   ├── grnController.js            │ • Create GRN
│   │                                │ • ⭐ AUTO: Update inventory
│   │                                │ • List GRNs
│   │
│   ├── invoiceController.js        │ • Create invoice
│   │                                │ • List invoices
│   │                                │ • Get invoice details
│   │
│   ├── customerController.js       │ • Manage customers
│   ├── supplierController.js       │ • Manage suppliers
│   ├── dashboardController.js      │ • Get statistics
│   │                                │ • Get low stock alerts
│   │
│   └── userController.js           │ • Manage users (admin)
│
├── 📁 routes/                      ← API ENDPOINTS (How frontend accesses data)
│   ├── auth.js                     │ POST /api/auth/register
│   │                                │ POST /api/auth/login
│   │
│   ├── products.js                 │ GET    /api/products (list)
│   │                                │ POST   /api/products (create)
│   │                                │ PUT    /api/products/:id (update)
│   │                                │ DELETE /api/products/:id (delete)
│   │
│   ├── sales-orders.js             │ GET  /api/sales-orders (list)
│   │                                │ POST /api/sales-orders (create)
│   │
│   ├── purchase-orders.js          │ GET  /api/purchase-orders
│   │                                │ POST /api/purchase-orders
│   │                                │ PUT  /api/purchase-orders/:id/approve
│   │
│   ├── grn.js                      │ GET  /api/grn
│   │                                │ POST /api/grn
│   │
│   ├── invoices.js                 │ GET /api/invoices
│   ├── customers.js                │ Customer CRUD
│   ├── suppliers.js                │ Supplier CRUD
│   ├── dashboard.js                │ GET /api/dashboard/stats
│   │                                │ GET /api/dashboard/low-stock
│   │
│   └── users.js                    │ User management (admin)
│
├── 📁 middleware/                  ← AUTHENTICATION & VALIDATION
│   └── auth.js                     │ JWT verification middleware
│                                    │ Checks if user is logged in
│                                    │ Applied to protected routes
│
└── 📁 node_modules/                ← ⚠️ NOT PUSHED TO GITHUB
                                     │ (Regenerated with npm install)
                                     │ Contains all npm packages
```

---

## ⚙️ How Backend Works

### When Frontend makes an API call:

```
Frontend                    Backend
   │                          │
   │─ POST /api/sales-orders ─>│
   │  (with order data)        │
   │                           │ server.js routes to:
   │                           ├─> sales-orders.js route
   │                           │   (checks path & method)
   │                           │
   │                           ├─> auth middleware
   │                           │   (verifies JWT token)
   │                           │
   │                           ├─> salesOrderController.js
   │                           │   (business logic)
   │                           │   • Validate data
   │                           │   • Create sales order
   │                           │   • Reduce inventory
   │                           │   • Create invoice
   │                           │   • Update customer balance
   │                           │
   │                           └─> MongoDB
   │                               (saves data)
   │                               
   │<─ JSON response ───────────│
   │  (success or error)        │
```

---

## 🎨 Frontend Folder Structure

```
frontend/
│
├── 📦 package.json                 ← Dependencies
│                                    │ react, react-router-dom
│                                    │ axios, recharts
│
├── 📁 public/                      ← Static files
│   └── index.html                  │ Main HTML template
│
├── 📁 src/                         ← SOURCE CODE
│   │
│   ├── 🎯 App.js                   ← MAIN COMPONENT
│   │                                │ • Sets up routing
│   │                                │ • Auth context provider
│   │                                │ • Main app layout
│   │
│   ├── 🎯 index.js                 ← ENTRY POINT
│   │                                │ Renders App into HTML
│   │
│   ├── 📁 pages/                   ← FULL PAGE COMPONENTS
│   │   ├── Dashboard.js            │ Shows statistics
│   │   │                            │ fetches /api/dashboard/stats
│   │   │                            │ Displays low stock alerts ⚠️
│   │   │
│   │   ├── Login.js                │ Login form
│   │   │                            │ POST /api/auth/login
│   │   │                            │ Stores JWT token
│   │   │
│   │   ├── Register.js             │ Registration form
│   │   │                            │ POST /api/auth/register
│   │   │
│   │   ├── Products.js             │ Product listing & CRUD
│   │   │                            │ GET /api/products
│   │   │                            │ POST /api/products (create)
│   │   │                            │ PUT /api/products/:id (update)
│   │   │                            │ DELETE /api/products/:id
│   │   │
│   │   ├── SalesOrders.js          │ Create & view sales orders
│   │   │                            │ • Shows form to select customer
│   │   │                            │ • Select products
│   │   │                            │ • POST /api/sales-orders
│   │   │
│   │   ├── PurchaseOrders.js       │ Create & manage POs
│   │   │                            │ • Create PO form
│   │   │                            │ • Approve button
│   │   │
│   │   ├── GRN.js                  │ Goods receipt management
│   │   │                            │ • Create GRN form
│   │   │                            │ • Select approved PO
│   │   │                            │ • Enter received qty
│   │   │
│   │   ├── Invoices.js             │ View generated invoices
│   │   │
│   │   ├── Customers.js            │ Customer CRUD
│   │   │
│   │   ├── Suppliers.js            │ Supplier CRUD
│   │   │
│   │   └── Users.js                │ User management (admin)
│   │
│   ├── 📁 components/              ← REUSABLE UI PIECES
│   │   ├── Navbar.js               │ Top navigation bar
│   │   ├── Sidebar.js              │ Left sidebar menu
│   │   ├── ProductForm.js          │ Forms used on multiple pages
│   │   ├── PrivateRoute.js         │ Route protection (logged-in only)
│   │   └── ... other components
│   │
│   ├── 📁 context/                 ← GLOBAL STATE (without Redux)
│   │   └── AuthContext.js          │ Stores:
│   │                                │ • Logged-in user info
│   │                                │ • JWT token
│   │                                │ • Login/logout functions
│   │
│   ├── 📁 utils/                   ← HELPER FUNCTIONS
│   │   └── api.js                  │ Axios instance
│   │                                │ • Base URL: localhost:5000
│   │                                │ • Auto-adds JWT in headers
│   │                                │ • Error handling
│   │
│   └── 📁 styles/                  ← CSS FILES (optional)
│       └── ... style files
│
└── 📁 node_modules/                ← ⚠️ NOT PUSHED TO GITHUB
```

---

## 🔄 How Frontend Works

### Example: Creating a Sales Order

```
User fills form (customer, products, qty)
         ↓
Component: SalesOrders.js
  handleSubmit(formData)
         ↓
  api.post('/api/sales-orders', formData)
  (from utils/api.js - adds JWT automatically)
         ↓
Backend receives → Controller processes
  ✅ Reduce inventory
  ✅ Create invoice
  ✅ Update customer balance
         ↓
Response: { success: true, order: {...} }
         ↓
Frontend:
  setOrders([...orders, newOrder])
  showNotification("Order created!")
  navigate('/sales-orders')
         ↓
User sees updated order list ✅
```

---

## 🗂️ Key Files You Should Know

### MUST UNDERSTAND:

1. **backend/server.js**
   - How Express starts
   - How routes are registered
   - How MongoDB connects

2. **backend/models/GRN.js**
   - Post-save hook
   - How inventory updates automatically

3. **backend/controllers/salesOrderController.js**
   - How sales order creation works
   - Auto inventory reduction
   - Auto invoice creation
   - Auto customer balance update

4. **backend/middleware/auth.js**
   - How JWT verification works
   - How protected routes work

5. **frontend/context/AuthContext.js**
   - How login state is managed
   - How JWT token is stored

6. **frontend/pages/Dashboard.js**
   - How data is fetched
   - How components are rendered
   - How hooks work

---

## 📊 File Relationships

```
User Registration/Login Flow:
  Frontend: Register.js → Backend: authController.js → User.js model
                                    ↓
  Response with JWT token → Frontend: AuthContext.js stores token

Purchase Order Flow:
  Frontend: PurchaseOrders.js
            POST /api/purchase-orders
            ↓
  Backend: routes/purchase-orders.js
           → purchaseOrderController.js
           → PurchaseOrder.js (save to MongoDB)

GRN Inventory Update Flow:
  Frontend: GRN.js
            POST /api/grn
            ↓
  Backend: routes/grn.js
           → grnController.js
           → GRN.js (post-save hook)
           → Product.js (update quantity)

Sales Order Complete Flow:
  Frontend: SalesOrders.js
            POST /api/sales-orders
            ↓
  Backend: routes/sales-orders.js
           → salesOrderController.js
           ├→ SalesOrder.js (save order)
           ├→ Product.js (reduce qty)
           ├→ Invoice.js (create invoice)
           └→ Customer.js (update balance)
```

---

## 🔐 Security File Locations

```
🔒 .env (NEVER PUSHED)
   └─ Contains: JWT_SECRET, MONGODB_URI

✅ .env.example (CAN BE PUSHED)
   └─ Template: Shows what .env needs

🔒 .gitignore
   ├─ Excludes: .env, node_modules, .venv
   └─ Hidden these files from GitHub

🔒 auth.js (middleware)
   └─ Verifies JWT token (protects routes)

🔒 authController.js
   ├─ Encrypts password (bcrypt)
   └─ Creates JWT token
```

---

## 🎯 Quick File Navigation

**Need to add a new feature?**

### New API Endpoint
1. Create route in backend/routes/
2. Create controller logic in backend/controllers/
3. Add model if needed in backend/models/
4. Create frontend component in frontend/src/pages/
5. Add to sidebar menu in frontend/src/components/Sidebar.js

### New Database Field
1. Add field to model in backend/models/
2. Update controller if validation needed
3. Update route if needed
4. Update frontend form in frontend/src/pages/

### New Inventory Calculation
1. Modify backend/controllers/ (business logic)
2. Maybe add hook to backend/models/ (auto-update)
3. Update frontend to show new field
4. Test with sample data from NEXT_STEPS.md

---

## 📈 File Sizes (Approximate)

```
Models: 1-2 KB each (8 files = 10KB)
Controllers: 3-5 KB each (8 files = 30KB)
Routes: 2-3 KB each (8 files = 20KB)
Frontend pages: 3-5 KB each (8 files = 30KB)
Frontend components: 1-2 KB each (5 files = 10KB)

Total code: ~150 KB (very manageable!)
Total with documentation: ~650 KB
Total with node_modules: ~600 MB (not pushed)
```

---

## ✨ Project Elegance

What makes this project well-structured:

1. **Clear Separation**: Models → Controllers → Routes → Frontend
2. **DRY Code**: No duplication
3. **Middleware**: Auth handled once, used everywhere
4. **Hooks**: Auto-calculations via MongoDB hooks
5. **Context**: Global state without Redux complexity
6. **Consistent Naming**: File names match route names

---

**This structure is production-ready!** 🚀

Understanding this folder structure means you understand:
- How backend works
- How frontend works
- How they communicate
- How data flows
- How security works
- How to scale it

**You've learned full-stack architecture!** ✨

