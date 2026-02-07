 function Services() {
  return (
    <div className="services-container">
      <h1>My Services</h1>

      <div className="services-grid">

        <div className="service-card">
          <h2>Web Development</h2>
          <p>
            Designing and building responsive, modern, and user-friendly
            websites using HTML, CSS, JavaScript, and React.
          </p>
        </div>

        <div className="service-card">
          <h2>Software Development</h2>
          <p>
            Developing efficient and scalable software applications using Java,
            C#, and object-oriented programming principles.
          </p>
        </div>

        <div className="service-card">
          <h2>Linux System Administration</h2>
          <p>
            Creating automation scripts, managing servers, handling backups,
            and configuring Linux-based systems.
          </p>
        </div>

        <div className="service-card">
          <h2>Technical Support</h2>
          <p>
            Providing troubleshooting, system setup, and technical assistance
            for software and hardware-related issues.
          </p>
        </div>

      </div>
    </div>
  );
}
export default Services;