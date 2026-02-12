import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const { overview, lowStockProducts, recentOrders, recentInvoices } = stats;

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{overview.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{overview.totalCustomers}</h3>
            <p>Total Customers</p>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <h3>{overview.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card stat-info">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>₹{overview.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-card stat-danger">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>{overview.pendingOrders}</h3>
            <p>Pending Orders</p>
          </div>
        </div>

        <div className="stat-card stat-secondary">
          <div className="stat-icon">📄</div>
          <div className="stat-content">
            <h3>{overview.pendingInvoices}</h3>
            <p>Pending Invoices</p>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts && lowStockProducts.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2>⚠️ Low Stock Alert</h2>
            <Link to="/products" className="btn btn-primary">View All</Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Current Stock</th>
                  <th>Min Level</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.quantity}</td>
                    <td>{product.minStockLevel}</td>
                    <td>
                      <span className="badge badge-danger">Low Stock</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      {recentOrders && recentOrders.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2>Recent Orders</h2>
            <Link to="/orders" className="btn btn-primary">View All</Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.customer?.name || 'N/A'}</td>
                    <td>₹{order.total.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Invoices */}
      {recentInvoices && recentInvoices.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2>Recent Invoices</h2>
            <Link to="/invoices" className="btn btn-primary">View All</Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.customer?.name || 'N/A'}</td>
                    <td>₹{invoice.total.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  const colors = {
    pending: 'warning',
    processing: 'info',
    shipped: 'info',
    delivered: 'success',
    paid: 'success',
    cancelled: 'danger',
    draft: 'secondary',
    sent: 'warning',
    overdue: 'danger'
  };
  return colors[status] || 'secondary';
};

export default Dashboard;
