import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getUsers, deleteUser } from "../api.js";
import "./Users.css";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [isAuthenticated, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (!isAuthenticated) return null;

  if (loading) return <div>Loading...</div>;

  return (
    <section className="users">
      <h1>Users</h1>
      <Link to="/users/new" className="add-button">Add New User</Link>

      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.firstname} {user.lastname}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
            {user.message && <p><strong>Message:</strong> {user.message}</p>}
            <div className="user-actions">
              <Link to={`/users/${user.id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UsersList;