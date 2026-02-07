import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Brian Nubila Logo" />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
export default Navbar;