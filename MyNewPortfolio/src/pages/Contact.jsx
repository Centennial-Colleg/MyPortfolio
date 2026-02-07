function Contact() {
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

       
        <form className="contact-form" id="contactForm">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Contact Number" />
          <textarea placeholder="Your Message" rows="5" required></textarea>

          <button type="submit" className="btn">Send Message</button>
        </form>

      </div>
    </section>
  );
}

export default Contact;