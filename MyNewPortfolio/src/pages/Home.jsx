 import { Link } from "react-router-dom";
import "./Home.css";
 function Home() {
  return (
    <header class="hero">
  <div class="hero-content">
    <h1>Hi, I'm Brian Nubila</h1>
    <h2>Software Engineering Student & Web Developer</h2>

    <p class="mission">
      My mission is to design and build modern, efficient, and user-friendly software
      solutions that solve real-world problems and create meaningful digital experiences.
    </p>

    <a href="about.html" class="btn">Learn More About Me</a>
  </div>
</header>
  );
}
export default Home;