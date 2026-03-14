import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';

const InvoiceForm = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate('/invoices');
      return;
    }

    const loadInvoice = async () => {
      try {
        const response = await api.get(`/invoices/${id}`);
        setInvoice(response.data.data);
      } catch (loadError) {
        setError(loadError.response?.data?.message || 'Error loading invoice');
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [id, navigate]);

  if (loading) {
    return <div className="loading">Loading invoice...</div>;
  }

  if (error || !invoice) {
    return (
      <div>
        <h1 className="page-title">Invoice Details</h1>
        <div className="card">
          <p>{error || 'Invoice not found'}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/invoices')}>
            Back to Invoices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex-between mb-20">
        <h1 className="page-title">Invoice {invoice.invoiceNumber}</h1>
        <button className="btn btn-secondary" onClick={() => navigate('/invoices')}>
          Back to Invoices
        </button>
      </div>

      <div className="card">
        <div className="grid grid-2 mb-20">
          <div>
            <h3>Customer</h3>
            <p>{invoice.customer?.name || 'N/A'}</p>
            <p>{invoice.customer?.email || 'N/A'}</p>
          </div>
          <div>
            <h3>Summary</h3>
            <p>Status: {invoice.status}</p>
            <p>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</p>
            <p>Payment Method: {invoice.paymentMethod || 'Not set'}</p>
          </div>
        </div>

        <table className="table mb-20">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={`${item.product || 'item'}-${index}`}>
                <td>{item.productName || item.product?.name || 'Product'}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price.toLocaleString()}</td>
                <td>₹{item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-2">
          <div>
            <p>Subtotal: ₹{invoice.subtotal.toLocaleString()}</p>
            <p>Tax: ₹{invoice.tax.toLocaleString()}</p>
            <p>Discount: ₹{invoice.discount.toLocaleString()}</p>
          </div>
          <div>
            <p>Total: ₹{invoice.total.toLocaleString()}</p>
            <p>Paid: ₹{invoice.paidAmount.toLocaleString()}</p>
            <p>Due: ₹{invoice.dueAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
