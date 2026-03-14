import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: { city: '', state: '', country: '' },
    gstNumber: '',
    paymentTerms: 'Net 30',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const loadSupplier = async () => {
      try {
        const response = await api.get(`/suppliers/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadSupplier();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await api.put(`/suppliers/${id}`, formData);
      } else {
        await api.post('/suppliers', formData);
      }
      navigate('/suppliers');
    } catch (error) {
      alert('Error saving supplier');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">{id ? 'Edit' : 'Add'} Supplier</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input type="text" name="company" className="form-control" value={formData.company} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>GST Number</label>
              <input type="text" name="gstNumber" className="form-control" value={formData.gstNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex flex-gap-10 mt-20">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Supplier'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/suppliers')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
