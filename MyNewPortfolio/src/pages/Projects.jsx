import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpg";
import project3 from "../assets/project3.jpg";

function Projects() {
  return (
    <section className="projects">
      <h1>My Projects</h1>

      <div className="projects-grid">

        {/* Project 1 */}
        <div className="project-card">
          <img src={project1} alt="Student Management System Project" />
          <h3>Student Management System (C#)</h3>
          <p>
            Developed a console-based student management system using C#. The system allows
            users to add, update, delete, and display student records using structured programming.
          </p>
          <p><strong>Role:</strong> Programmer & Designer</p>
          <p><strong>Outcome:</strong> Fully functional application demonstrating object-oriented principles.</p>
        </div>

        {/* Project 2 */}
        <div className="project-card">
          <img src={project2} alt="Linux Backup Automation Script Project" />
          <h3>Linux Backup Automation Script</h3>
          <p>
            Created a Bash script to automate database backup, secure file transfer, and restoration
            across multiple virtual machines using Linux tools.
          </p>
          <p><strong>Role:</strong> System Administrator & Script Developer</p>
          <p><strong>Outcome:</strong> Automated backup system reducing manual work and errors.</p>
        </div>

        {/* Project 3 */}
        <div className="project-card">
          <img src={project3} alt="Java Object-Oriented Application Project" />
          <h3>Java Object-Oriented Application</h3>
          <p>
            Designed and implemented a Java application using object-oriented principles,
            including inheritance, polymorphism, and exception handling.
          </p>
          <p><strong>Role:</strong> Java Developer</p>
          <p><strong>Outcome:</strong> Robust and scalable academic project demonstrating strong OOP skills.</p>
        </div>

      </div>
    </section>
  );
}

export default Projects;