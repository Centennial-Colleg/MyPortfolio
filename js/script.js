document.addEventListener("DOMContentLoaded", () => {

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;

      console.log("Contact Form Submission:");
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Email:", email);
      console.log("Phone:", phone);
      console.log("Message:", message);

      alert("Thank you " + firstName + "! Your message has been sent.");

      window.location.href = "index.html";
    });
  }

});
