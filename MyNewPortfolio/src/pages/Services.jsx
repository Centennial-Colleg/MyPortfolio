import { useState, useEffect } from "react";
import { getServices, createService, updateService, deleteService } from "../api.js";

function Services() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      if (response.success) {
        setServices(response.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
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
        await updateService(editingId, form);
      } else {
        await createService(form);
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleEdit = (service) => {
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon || ""
    });
    setEditingId(service.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      icon: ""
    });
    setEditingId(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="services-container">
      <h1>My Services</h1>

      <div className="service-form">
        <h2>{editingId ? "Edit Service" : "Add New Service"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="icon"
            placeholder="Icon URL"
            value={form.icon}
            onChange={handleInputChange}
          />
          <button type="submit">{editingId ? "Update" : "Add"} Service</button>
          {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
        </form>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            {service.icon && <img src={service.icon} alt={service.title} />}
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <div className="service-actions">
              <button onClick={() => handleEdit(service)}>Edit</button>
              <button onClick={() => handleDelete(service.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;