import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getReferences, deleteReference } from "../api.js";
import "./References.css";

function ReferencesList() {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchReferences();
  }, [isAuthenticated, navigate]);

  const fetchReferences = async () => {
    try {
      const response = await getReferences();
      if (response.success) {
        setReferences(response.data);
      }
    } catch (error) {
      console.error("Error fetching references:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reference?")) {
      try {
        await deleteReference(id);
        fetchReferences();
      } catch (error) {
        console.error("Error deleting reference:", error);
      }
    }
  };

  if (!isAuthenticated) return null;

  if (loading) return <div>Loading...</div>;

  return (
    <section className="references">
      <h1>References</h1>
      <Link to="/references/new" className="add-button">Add New Reference</Link>

      <div className="references-list">
        {references.map((reference) => (
          <div key={reference.id} className="reference-card">
            <h3>{reference.name}</h3>
            <p><strong>Position:</strong> {reference.position}</p>
            <p><strong>Company:</strong> {reference.company}</p>
            <p><strong>Testimonial:</strong> {reference.testimonial}</p>
            <div className="reference-actions">
              <Link to={`/references/${reference.id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(reference.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReferencesList;