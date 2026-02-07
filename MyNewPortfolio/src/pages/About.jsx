import "./About.css";
import myPhoto from "../assets/myPhoto.png";
import resumePDF from "../assets/MyResume.pdf";

function About() {
  return (
    <section className="about">
      <div className="about-container">

        <div className="about-image">
          <img src={myPhoto} alt="Brian Nubila" />
        </div>

        <div className="about-content">
          <h1>About Me</h1>

          <h3>Brian Nubila</h3>

          <p>
            I am a Software Engineering student with a strong interest in web development,
            programming, and building practical software solutions. I enjoy learning new
            technologies and applying them to real-world projects. My goal is to become
            a skilled full-stack developer and contribute to impactful digital products.
          </p>

          <p>
            Through my academic journey, I have gained experience in HTML, CSS, JavaScript,
            C#, Java, Linux, and database systems. I am highly motivated, detail-oriented,
            and always eager to improve my technical and problem-solving skills.
          </p>

          <a
            href={resumePDF}
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download My Resume
          </a>

        </div>

      </div>
    </section>
  );
}
export default About;