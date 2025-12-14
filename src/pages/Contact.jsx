import { useState } from "react";
import axios from "axios";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://restaurant-backend-fjsw.onrender.com/api/contact",
        formData
      );
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="contact-wrapper">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Have questions, feedback, or special requests? Reach out — we'd love
          to hear from you.
        </p>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <div className="info-card">
            <i className="fa-solid fa-envelope"></i>
            <h3>Email Us</h3>
            <p>info@eatery.com</p>
          </div>
          <div className="info-card">
            <i className="fa-solid fa-phone"></i>
            <h3>Call Us</h3>
            <p>+1 (212) 555-1212</p>
          </div>
          <div className="info-card">
            <i className="fa-solid fa-location-dot"></i>
            <h3>Find Us</h3>
            <p>205 Humber College Blvd, Toronto, ON M9W 5L7</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleChange} required/>
            <input type="text" name="lastName" placeholder="Last Name*" value={formData.lastName} onChange={handleChange} required/>
          </div>

          <div className="form-row">
            <input type="email"  name="email"  placeholder="Email*" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <textarea name="message"  placeholder="Message*" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <div className="success-popup">
              <h4>Message Sent!</h4>
              <p>Thank you for contacting Eatery. We'll respond shortly.</p>
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
