import { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api.js";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateUser(editingId, form);
      } else {
        await createUser(form);
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setForm({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone || "",
      message: user.message || ""
    });
    setEditingId(user.id);
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

  const resetForm = () => {
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: ""
    });
    setEditingId(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="users">
      <h1>Users</h1>

      <div className="user-form">
        <h2>{editingId ? "Edit User" : "Add New User"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleInputChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleInputChange}
          />
          <button type="submit">{editingId ? "Update" : "Add"} User</button>
          {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
        </form>
      </div>

      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.firstname} {user.lastname}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
            {user.message && <p><strong>Message:</strong> {user.message}</p>}
            <div className="user-actions">
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;