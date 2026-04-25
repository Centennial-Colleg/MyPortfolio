import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjects, createProject, updateProject } from "../api.js";
import "./ProjectForm.css";

function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    link: ""
  });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await getProjects();
      if (response.success) {
        const project = response.data.find(p => p.id === id);
        if (project) {
          setForm({
            title: project.title,
            description: project.description,
            image: project.image || "",
            technologies: project.technologies ? project.technologies.join(", ") : "",
            link: project.link || ""
          });
        }
      }
    } catch (error) {
      console.error("Error fetching project:", error);
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
    const projectData = {
      ...form,
      technologies: form.technologies.split(",").map(tech => tech.trim())
    };
    try {
      if (id) {
        await updateProject(id, projectData);
      } else {
        await createProject(projectData);
      }
      navigate("/projects");
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="project-form-page">
      <h1>{id ? "Edit Project" : "Add New Project"}</h1>
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
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="technologies"
          placeholder="Technologies (comma separated)"
          value={form.technologies}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="link"
          placeholder="Project Link"
          value={form.link}
          onChange={handleInputChange}
        />
        <button type="submit">{id ? "Update" : "Add"} Project</button>
        <button type="button" onClick={() => navigate("/projects")}>Cancel</button>
      </form>
    </section>
  );
}

export default ProjectForm;