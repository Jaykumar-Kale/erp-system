import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Components
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import ProductForm from './pages/Products/ProductForm';
import Customers from './pages/Customers/Customers';
import CustomerForm from './pages/Customers/CustomerForm';
import Suppliers from './pages/Suppliers/Suppliers';
import SupplierForm from './pages/Suppliers/SupplierForm';
import Orders from './pages/Orders/Orders';
import OrderForm from './pages/Orders/OrderForm';
import Invoices from './pages/Invoices/Invoices';
import InvoiceForm from './pages/Invoices/InvoiceForm';
import Users from './pages/Users/Users';
import UserForm from './pages/Users/UserForm';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect if logged in)
const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return !user ? children : <Navigate to="/" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        
        <Route path="products">
          <Route index element={<Products />} />
          <Route path="new" element={<ProductForm />} />
          <Route path="edit/:id" element={<ProductForm />} />
        </Route>
        
        <Route path="customers">
          <Route index element={<Customers />} />
          <Route path="new" element={<CustomerForm />} />
          <Route path="edit/:id" element={<CustomerForm />} />
        </Route>
        
        <Route path="suppliers">
          <Route index element={<Suppliers />} />
          <Route path="new" element={<SupplierForm />} />
          <Route path="edit/:id" element={<SupplierForm />} />
        </Route>
        
        <Route path="orders">
          <Route index element={<Orders />} />
          <Route path="new" element={<OrderForm />} />
          <Route path="view/:id" element={<OrderForm />} />
        </Route>
        
        <Route path="invoices">
          <Route index element={<Invoices />} />
          <Route path="new" element={<InvoiceForm />} />
          <Route path="view/:id" element={<InvoiceForm />} />
        </Route>
        
        <Route path="users">
          <Route index element={<Users />} />
          <Route path="new" element={<UserForm />} />
          <Route path="edit/:id" element={<UserForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
