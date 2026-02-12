import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    try {
      let url = '/products';
      if (filter === 'lowStock') url += '?lowStock=true';
      const response = await api.get(url);
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div>
      <div className="flex-between mb-20">
        <h1 className="page-title">Products</h1>
        <Link to="/products/new" className="btn btn-primary">Add New Product</Link>
      </div>

      <div className="card">
        <div className="flex-between mb-20">
          <div className="flex flex-gap-10">
            <button 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('all')}
            >
              All Products
            </button>
            <button 
              className={`btn ${filter === 'lowStock' ? 'btn-warning' : 'btn-secondary'}`}
              onClick={() => setFilter('lowStock')}
            >
              Low Stock
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Start by adding your first product</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.category}</td>
                    <td>₹{product.price}</td>
                    <td>
                      {product.quantity}
                      {product.quantity <= product.minStockLevel && (
                        <span className="badge badge-danger ml-10">Low</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge badge-${product.status === 'active' ? 'success' : 'secondary'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-gap-10">
                        <Link to={`/products/edit/${product._id}`} className="btn btn-secondary">
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(product._id)} 
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
