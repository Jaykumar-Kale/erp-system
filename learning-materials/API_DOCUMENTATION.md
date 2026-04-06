# API Documentation & Testing Guide

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Authentication

All endpoints except `/auth/register` and `/auth/login` require authentication.

**Headers Required:**
```
Authorization: Bearer <your_jwt_token>
```

---

## 📍 Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "admin",
  "department": "Management"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

---

## 📍 Product Endpoints

### Get All Products
```http
GET /products
Authorization: Bearer <token>
```

### Get Single Product
```http
GET /products/:id
Authorization: Bearer <token>
```

### Create Product
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Product Name",
  "sku": "PRD001",
  "category": "Electronics",
  "unit": "pcs",
  "price": 1000,
  "costPrice": 800,
  "quantity": 100,
  "minStockLevel": 10,
  "status": "active",
  "description": "Product description"
}
```

### Update Product
```http
PUT /products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 1200
}
```

### Delete Product
```http
DELETE /products/:id
Authorization: Bearer <token>
```

---

## 📍 Customer Endpoints

### Get All Customers
```http
GET /customers
Authorization: Bearer <token>
```

### Create Customer
```http
POST /customers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "9876543210",
  "company": "ABC Company",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  },
  "gstNumber": "27AABCU9603R1ZM",
  "creditLimit": 50000,
  "status": "active"
}
```

### Update Customer
```http
PUT /customers/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "phone": "9999999999",
  "creditLimit": 75000
}
```

### Delete Customer
```http
DELETE /customers/:id
Authorization: Bearer <token>
```

---

## 📍 Supplier Endpoints

### Get All Suppliers
```http
GET /suppliers
Authorization: Bearer <token>
```

### Create Supplier
```http
POST /suppliers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Supplier Name",
  "email": "supplier@example.com",
  "phone": "9876543210",
  "company": "XYZ Supplies",
  "address": {
    "city": "Delhi",
    "state": "Delhi",
    "country": "India"
  },
  "gstNumber": "07AABCX9603R1ZM",
  "productCategories": ["Electronics", "Hardware"],
  "paymentTerms": "Net 30",
  "rating": 4.5,
  "status": "active"
}
```

### Update Supplier
```http
PUT /suppliers/:id
Authorization: Bearer <token>
```

### Delete Supplier
```http
DELETE /suppliers/:id
Authorization: Bearer <token>
```

---

## 📍 Order Endpoints

### Get All Orders
```http
GET /orders
Authorization: Bearer <token>
```

### Get Single Order
```http
GET /orders/:id
Authorization: Bearer <token>
```

### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "customer": "customer_id_here",
  "items": [
    {
      "product": "product_id_here",
      "quantity": 5,
      "price": 1000
    },
    {
      "product": "another_product_id",
      "quantity": 3,
      "price": 500
    }
  ],
  "tax": 180,
  "discount": 100,
  "paymentMethod": "cash",
  "notes": "Order notes"
}
```

**Note:** Creating an order automatically:
- Reduces product inventory
- Increments customer outstanding balance
- Generates unique order number

### Update Order
```http
PUT /orders/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "delivered",
  "paymentStatus": "paid"
}
```

### Delete Order
```http
DELETE /orders/:id
Authorization: Bearer <token>
```

---

## 📍 Invoice Endpoints

### Get All Invoices
```http
GET /invoices
Authorization: Bearer <token>
```

### Get Single Invoice
```http
GET /invoices/:id
Authorization: Bearer <token>
```

### Create Invoice
```http
POST /invoices
Authorization: Bearer <token>
Content-Type: application/json

{
  "customer": "customer_id_here",
  "order": "order_id_here",
  "items": [
    {
      "description": "Product A",
      "quantity": 2,
      "price": 1000,
      "total": 2000
    }
  ],
  "subtotal": 2000,
  "tax": 360,
  "discount": 50,
  "total": 2310,
  "dueDate": "2024-12-31",
  "notes": "Payment due in 30 days"
}
```

**Note:** `dueAmount` is auto-calculated as `total - paidAmount`

### Update Invoice
```http
PUT /invoices/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "paid"
}
```

### Record Payment
```http
POST /invoices/:id/payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 1000,
  "paymentMethod": "bank_transfer",
  "transactionId": "TXN123456",
  "notes": "Partial payment"
}
```

### Delete Invoice
```http
DELETE /invoices/:id
Authorization: Bearer <token>
```

---

## 📍 User Endpoints (Admin/Manager Only)

### Get All Users
```http
GET /users
Authorization: Bearer <token>
```

### Get Single User
```http
GET /users/:id
Authorization: Bearer <token>
```

### Create User
```http
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "employee",
  "department": "Sales",
  "status": "active"
}
```

### Update User
```http
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "manager",
  "status": "active"
}
```

### Delete User
```http
DELETE /users/:id
Authorization: Bearer <token>
```

---

## 📍 Dashboard Endpoints

### Get Dashboard Statistics
```http
GET /dashboard/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalProducts": 150,
    "lowStockProducts": 5,
    "totalCustomers": 45,
    "activeCustomers": 38,
    "totalOrders": 230,
    "pendingOrders": 12,
    "totalRevenue": 1250000,
    "monthlyRevenue": 85000,
    "lowStockAlerts": [
      {
        "name": "Product Name",
        "sku": "PRD001",
        "quantity": 5,
        "minStockLevel": 10
      }
    ],
    "recentOrders": [...],
    "recentInvoices": [...]
  }
}
```

---

## 🧪 Testing with Postman

### 1. Import Collection
Create a new Postman collection and import these endpoints.

### 2. Set Environment Variables
```
baseUrl: http://localhost:5000/api
token: (will be set after login)
```

### 3. Test Flow
1. **Register** a new user → Get token
2. **Login** with credentials → Get token
3. Set token in Authorization header for all requests
4. **Create Products** → Get product IDs
5. **Create Customers** → Get customer IDs
6. **Create Order** → Use customer and product IDs
7. **Create Invoice** → Use customer and order IDs
8. **Check Dashboard** → View statistics

### 4. Automated Tests
```javascript
// In Postman Tests tab
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success=true", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
});

// Save token after login
if (pm.response.json().token) {
    pm.environment.set("token", pm.response.json().token);
}
```

---

## 📊 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation Error)
- `401` - Unauthorized (No/Invalid Token)
- `403` - Forbidden (Insufficient Permissions)
- `404` - Not Found
- `500` - Server Error

---

## 🔐 Role Permissions

### Admin
- Full access to all endpoints
- Can manage users

### Manager
- All endpoints except user management
- Cannot create or delete users

### Employee
- Read access to most endpoints
- Can create orders and invoices
- Limited delete permissions

---

## 🐛 Common Issues & Solutions

### 401 Unauthorized
- Token missing or expired → Login again
- Token format: `Bearer <token>` (note space after Bearer)

### 400 Bad Request
- Check required fields
- Validate data types
- Ensure unique constraints (SKU, email)

### 404 Not Found
- Verify ID exists in database
- Check endpoint URL

### 500 Server Error
- Check server logs
- Verify MongoDB is running
- Check database connection

---

## 📝 Sample Test Data

### Product
```json
{
  "name": "Laptop Dell XPS 13",
  "sku": "DELL-XPS-13",
  "category": "Electronics",
  "unit": "pcs",
  "price": 85000,
  "costPrice": 70000,
  "quantity": 25,
  "minStockLevel": 5
}
```

### Customer
```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh@techsolutions.com",
  "phone": "9876543210",
  "company": "Tech Solutions Pvt Ltd",
  "gstNumber": "27AABCU9603R1ZM",
  "creditLimit": 200000
}
```

### Order
```json
{
  "customer": "customer_id",
  "items": [
    {
      "product": "product_id",
      "quantity": 2,
      "price": 85000
    }
  ],
  "tax": 30600,
  "discount": 5000,
  "paymentMethod": "bank_transfer"
}
```

---

## 🔗 Useful Commands

### Test All Endpoints
```bash
# Using curl

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123","role":"admin"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get Products (with token)
curl http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

**Happy Testing! 🚀**
