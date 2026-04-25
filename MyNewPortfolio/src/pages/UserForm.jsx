import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers, createUser, updateUser } from "../api.js";
import "./UserForm.css";

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await getUsers();
      if (response.success) {
        const user = response.data.find(u => u.id === id);
        if (user) {
          setForm({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone || "",
            message: user.message || ""
          });
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
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
      if (id) {
        await updateUser(id, form);
      } else {
        await createUser(form);
      }
      navigate("/users");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="user-form-page">
      <h1>{id ? "Edit User" : "Add New User"}</h1>
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
        <button type="submit">{id ? "Update" : "Add"} User</button>
        <button type="button" onClick={() => navigate("/users")}>Cancel</button>
      </form>
    </section>
  );
}

export default UserForm;