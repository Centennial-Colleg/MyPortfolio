import { useState, useEffect } from "react";
import { getReferences, createReference, updateReference, deleteReference } from "../api.js";
import "./References.css";

function References() {
  const [references, setReferences] = useState([]);
  const [form, setForm] = useState({
    name: "",
    position: "",
    company: "",
    testimonial: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferences();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateReference(editingId, form);
      } else {
        await createReference(form);
      }
      fetchReferences();
      resetForm();
    } catch (error) {
      console.error("Error saving reference:", error);
    }
  };

  const handleEdit = (reference) => {
    setForm({
      name: reference.name,
      position: reference.position,
      company: reference.company,
      testimonial: reference.testimonial
    });
    setEditingId(reference.id);
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

  const resetForm = () => {
    setForm({
      name: "",
      position: "",
      company: "",
      testimonial: ""
    });
    setEditingId(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="references">
      <h1>References</h1>

      <div className="reference-form">
        <h2>{editingId ? "Edit Reference" : "Add New Reference"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={form.position}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="testimonial"
            placeholder="Testimonial"
            value={form.testimonial}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{editingId ? "Update" : "Add"} Reference</button>
          {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
        </form>
      </div>

      <div className="references-list">
        {references.map((reference) => (
          <div key={reference.id} className="reference-card">
            <h3>{reference.name}</h3>
            <p><strong>Position:</strong> {reference.position}</p>
            <p><strong>Company:</strong> {reference.company}</p>
            <p><strong>Testimonial:</strong> {reference.testimonial}</p>
            <div className="reference-actions">
              <button onClick={() => handleEdit(reference)}>Edit</button>
              <button onClick={() => handleDelete(reference.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default References;