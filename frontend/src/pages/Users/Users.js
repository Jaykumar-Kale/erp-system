import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="flex-between mb-20">
        <h1 className="page-title">Users</h1>
        <Link to="/users/new" className="btn btn-primary">Add User</Link>
      </div>

      <div className="card">
        {users.length === 0 ? (
          <div className="empty-state"><h3>No users found</h3></div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge badge-info">{user.role}</span>
                  </td>
                  <td>{user.department}</td>
                  <td>
                    <span className={`badge badge-${user.status === 'active' ? 'success' : 'secondary'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/users/edit/${user._id}`} className="btn btn-secondary">
                      Edit
                    </Link>
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

export default Users;
