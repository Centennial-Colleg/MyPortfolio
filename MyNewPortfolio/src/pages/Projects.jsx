import { useState, useEffect } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../api.js";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    link: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      if (response.success) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
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
      if (editingId) {
        await updateProject(editingId, projectData);
      } else {
        await createProject(projectData);
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      image: project.image || "",
      technologies: project.technologies ? project.technologies.join(", ") : "",
      link: project.link || ""
    });
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      image: "",
      technologies: "",
      link: ""
    });
    setEditingId(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="projects">
      <h1>My Projects</h1>

      <div className="project-form">
        <h2>{editingId ? "Edit Project" : "Add New Project"}</h2>
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
          <button type="submit">{editingId ? "Update" : "Add"} Project</button>
          {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
        </form>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            {project.image && <img src={project.image} alt={project.title} />}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.technologies && project.technologies.length > 0 && (
              <p><strong>Technologies:</strong> {project.technologies.join(", ")}</p>
            )}
            {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>}
            <div className="project-actions">
              <button onClick={() => handleEdit(project)}>Edit</button>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;