import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/suppliers');
      setSuppliers(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this supplier?')) {
      try {
        await api.delete(`/suppliers/${id}`);
        fetchSuppliers();
      } catch (error) {
        alert('Error deleting supplier');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="flex-between mb-20">
        <h1 className="page-title">Suppliers</h1>
        <Link to="/suppliers/new" className="btn btn-primary">Add Supplier</Link>
      </div>

      <div className="card">
        {suppliers.length === 0 ? (
          <div className="empty-state"><h3>No suppliers found</h3></div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.company}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>
                    <span className={`badge badge-${supplier.status === 'active' ? 'success' : 'secondary'}`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-gap-10">
                      <Link to={`/suppliers/edit/${supplier._id}`} className="btn btn-secondary">Edit</Link>
                      <button onClick={() => handleDelete(supplier._id)} className="btn btn-danger">Delete</button>
                    </div>
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

export default Suppliers;
