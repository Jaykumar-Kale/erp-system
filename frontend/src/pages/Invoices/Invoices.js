import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await api.get('/invoices');
      setInvoices(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="flex-between mb-20">
        <h1 className="page-title">Invoices</h1>
        <Link to="/invoices/new" className="btn btn-primary">Create Invoice</Link>
      </div>

      <div className="card">
        {invoices.length === 0 ? (
          <div className="empty-state"><h3>No invoices found</h3></div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice._id}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.customer?.name}</td>
                  <td>₹{invoice.total.toLocaleString()}</td>
                  <td>₹{invoice.paidAmount.toLocaleString()}</td>
                  <td>₹{invoice.dueAmount.toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${invoice.status === 'paid' ? 'success' : 'warning'}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Invoices;
