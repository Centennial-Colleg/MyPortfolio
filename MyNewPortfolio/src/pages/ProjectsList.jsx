import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getProjects, deleteProject } from "../api.js";

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchProjects();
  }, [isAuthenticated, navigate]);

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

  if (!isAuthenticated) return null;

  if (loading) return <div>Loading...</div>;

  return (
    <section className="projects">
      <h1>My Projects</h1>
      <Link to="/projects/new" className="add-button">Add New Project</Link>

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
              <Link to={`/projects/${project.id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsList;