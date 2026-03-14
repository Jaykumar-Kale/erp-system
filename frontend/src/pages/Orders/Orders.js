import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/sales-orders');
      setOrders(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="flex-between mb-20">
        <h1 className="page-title">Sales Orders</h1>
        <Link to="/orders/new" className="btn btn-primary">Create Sales Order</Link>
      </div>

      <div className="card">
        {orders.length === 0 ? (
          <div className="empty-state"><h3>No orders found</h3></div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.customer?.name}</td>
                  <td>₹{order.total.toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${order.status === 'delivered' ? 'success' : 'warning'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${order.paymentStatus === 'paid' ? 'success' : 'warning'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/orders/view/${order._id}`} className="btn btn-secondary">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
