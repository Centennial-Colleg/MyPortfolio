import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";
import './App.css';
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import ProjectsList from "./pages/ProjectsList.jsx";
import ProjectForm from "./pages/ProjectForm.jsx";
import Contact from "./pages/Contact.jsx";
import ServicesList from "./pages/ServicesList.jsx";
import ServiceForm from "./pages/ServiceForm.jsx";
import UsersList from "./pages/UsersList.jsx";
import UserForm from "./pages/UserForm.jsx";
import ReferencesList from "./pages/ReferencesList.jsx";
import ReferenceForm from "./pages/ReferenceForm.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/:id/edit" element={<ProjectForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/services/new" element={<ServiceForm />} />
          <Route path="/services/:id/edit" element={<ServiceForm />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="/references" element={<ReferencesList />} />
          <Route path="/references/new" element={<ReferenceForm />} />
          <Route path="/references/:id/edit" element={<ReferenceForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
