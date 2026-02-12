import React from 'react';
import { useNavigate } from 'react-router-dom';

const InvoiceForm = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="page-title">Create Invoice</h1>
      <div className="card">
        <p>Invoice creation feature - Similar to Order Form</p>
        <button className="btn btn-secondary" onClick={() => navigate('/invoices')}>
          Back to Invoices
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
