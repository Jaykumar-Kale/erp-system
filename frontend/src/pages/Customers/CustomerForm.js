import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: { street: '', city: '', state: '', pincode: '', country: '' },
    gstNumber: '',
    creditLimit: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const loadCustomer = async () => {
      try {
        const response = await api.get(`/customers/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [field]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await api.put(`/customers/${id}`, formData);
      } else {
        await api.post('/customers', formData);
      }
      navigate('/customers');
    } catch (error) {
      alert('Error saving customer');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">{id ? 'Edit' : 'Add'} Customer</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
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
              <label>Company</label>
              <input type="text" name="company" className="form-control" value={formData.company} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>GST Number</label>
              <input type="text" name="gstNumber" className="form-control" value={formData.gstNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Credit Limit</label>
              <input type="number" name="creditLimit" className="form-control" value={formData.creditLimit} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" name="address.city" className="form-control" value={formData.address.city} onChange={handleChange} />
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
              {loading ? 'Saving...' : 'Save Customer'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/customers')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
