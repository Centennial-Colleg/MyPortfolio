import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getServices, deleteService } from "../api.js";
import "./Services.css";

function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchServices();
  }, [isAuthenticated, navigate]);

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

  if (!isAuthenticated) return null;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="services-container">
      <h1>My Services</h1>
      <Link to="/services/new" className="add-button">Add New Service</Link>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            {service.icon && <img src={service.icon} alt={service.title} />}
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <div className="service-actions">
              <Link to={`/services/${service.id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(service.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesList;