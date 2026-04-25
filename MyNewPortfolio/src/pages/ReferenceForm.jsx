import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReferences, createReference, updateReference } from "../api.js";

function ReferenceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    position: "",
    company: "",
    testimonial: ""
  });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      fetchReference();
    }
  }, [id]);

  const fetchReference = async () => {
    try {
      const response = await getReferences();
      if (response.success) {
        const reference = response.data.find(r => r.id === id);
        if (reference) {
          setForm({
            name: reference.name,
            position: reference.position,
            company: reference.company,
            testimonial: reference.testimonial
          });
        }
      }
    } catch (error) {
      console.error("Error fetching reference:", error);
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
        await updateReference(id, form);
      } else {
        await createReference(form);
      }
      navigate("/references");
    } catch (error) {
      console.error("Error saving reference:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="reference-form-page">
      <h1>{id ? "Edit Reference" : "Add New Reference"}</h1>
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
        <button type="submit">{id ? "Update" : "Add"} Reference</button>
        <button type="button" onClick={() => navigate("/references")}>Cancel</button>
      </form>
    </section>
  );
}

export default ReferenceForm;