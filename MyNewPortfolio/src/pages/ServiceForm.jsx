import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServices, createService, updateService } from "../api.js";
import "./ServiceForm.css";

function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: ""
  });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await getServices();
      if (response.success) {
        const service = response.data.find(s => s.id === id);
        if (service) {
          setForm({
            title: service.title,
            description: service.description,
            icon: service.icon || ""
          });
        }
      }
    } catch (error) {
      console.error("Error fetching service:", error);
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
        await updateService(id, form);
      } else {
        await createService(form);
      }
      navigate("/services");
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="service-form-page">
      <h1>{id ? "Edit Service" : "Add New Service"}</h1>
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
        <button type="submit">{id ? "Update" : "Add"} Service</button>
        <button type="button" onClick={() => navigate("/services")}>Cancel</button>
      </form>
    </section>
  );
}

export default ServiceForm;