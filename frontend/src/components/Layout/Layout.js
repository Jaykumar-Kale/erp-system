import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const canAccessUsers = user?.role === 'admin' || user?.role === 'manager';

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>ERP System</h2>
          <p className="user-info">
            {user?.name}
            <span className="user-role">{user?.role}</span>
          </p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className={isActive('/') && !isActive('/products') && !isActive('/customers') && !isActive('/suppliers') && !isActive('/orders') && !isActive('/invoices') && !isActive('/users') ? 'active' : ''}>
            <span>📊</span> Dashboard
          </Link>
          <Link to="/products" className={isActive('/products') ? 'active' : ''}>
            <span>📦</span> Products
          </Link>
          <Link to="/customers" className={isActive('/customers') ? 'active' : ''}>
            <span>👥</span> Customers
          </Link>
          <Link to="/suppliers" className={isActive('/suppliers') ? 'active' : ''}>
            <span>🏭</span> Suppliers
          </Link>
          <Link to="/orders" className={isActive('/orders') ? 'active' : ''}>
            <span>🛒</span> Orders
          </Link>
          <Link to="/invoices" className={isActive('/invoices') ? 'active' : ''}>
            <span>📄</span> Invoices
          </Link>
          {canAccessUsers && (
            <Link to="/users" className={isActive('/users') ? 'active' : ''}>
              <span>⚙️</span> Users
            </Link>
          )}
        </nav>

        <div className="sidebar-footer">
          <button onClick={logout} className="btn btn-danger btn-block">
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
