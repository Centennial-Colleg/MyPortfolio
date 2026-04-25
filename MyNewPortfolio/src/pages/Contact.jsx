import { useState } from "react";
import { createUser } from "../api.js";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      setSubmitted(true);
      setForm({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <section className="contact">
      <h1>Contact Me</h1>

      <div className="contact-container">

        <div className="contact-info">
          <h3>Get In Touch</h3>
          <p><strong>Email:</strong> Brian@gmail.com</p>
          <p><strong>Phone:</strong> 4374847051</p>
          <p><strong>Location:</strong> Ontario, Canada</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Contact Number"
            value={form.phone}
            onChange={handleInputChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleInputChange}
            required
          ></textarea>

          <button type="submit" className="btn">Send Message</button>
          {submitted && <p>Message sent successfully!</p>}
        </form>

      </div>
    </section>
  );
}

export default Contact;