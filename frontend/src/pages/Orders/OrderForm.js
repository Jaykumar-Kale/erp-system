import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const OrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customer: '',
    items: [],
    tax: 0,
    discount: 0,
    paymentMethod: 'cash'
  });
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [customersRes, productsRes] = await Promise.all([
        api.get('/customers'),
        api.get('/products')
      ]);
      setCustomers(customersRes.data.data);
      setProducts(productsRes.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addItem = () => {
    const product = products.find(p => p._id === selectedProduct);
    if (!product || quantity <= 0) return;

    const newItem = {
      product: product._id,
      quantity,
      price: product.price
    };

    setFormData({
      ...formData,
      items: [...formData.items, newItem]
    });

    setSelectedProduct('');
    setQuantity(1);
  };

  const removeItem = (index) => {
    const items = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items });
  };

  const calculateTotal = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return subtotal + formData.tax - formData.discount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/orders', formData);
      navigate('/orders');
    } catch (error) {
      alert('Error creating order');
    }
  };

  return (
    <div>
      <h1 className="page-title">Create Order</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer *</label>
            <select
              className="form-control"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              required
            >
              <option value="">Select Customer</option>
              {customers.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <h3>Order Items</h3>
          <div className="flex flex-gap-10 mb-20">
            <select
              className="form-control"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map(p => (
                <option key={p._id} value={p._id}>{p.name} - ₹{p.price}</option>
              ))}
            </select>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              placeholder="Qty"
              style={{ width: '100px' }}
            />
            <button type="button" className="btn btn-primary" onClick={addItem}>Add</button>
          </div>

          {formData.items.length > 0 && (
            <table className="table mb-20">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => {
                  const product = products.find(p => p._id === item.product);
                  return (
                    <tr key={index}>
                      <td>{product?.name}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.price * item.quantity}</td>
                      <td>
                        <button type="button" className="btn btn-danger" onClick={() => removeItem(index)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <div className="grid grid-3">
            <div className="form-group">
              <label>Tax</label>
              <input
                type="number"
                className="form-control"
                value={formData.tax}
                onChange={(e) => setFormData({ ...formData, tax: Number(e.target.value) })}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Discount</label>
              <input
                type="number"
                className="form-control"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <select
                className="form-control"
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
          </div>

          <h3 className="mt-20">Total: ₹{calculateTotal()}</h3>

          <div className="flex flex-gap-10 mt-20">
            <button type="submit" className="btn btn-primary" disabled={formData.items.length === 0}>
              Create Order
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/orders')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
