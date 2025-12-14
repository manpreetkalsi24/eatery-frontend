import { useState } from "react";
import axios from "axios";
import "./Reservations.css";

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://restaurant-backend-fjsw.onrender.com/api/reservations",
        formData
      );
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        guests: "",
        message: "",
      });
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      console.error("Error submitting reservation:", error);
    }
    setLoading(false);
  };

  return (
    <div className="reservation-page">
      <h1 className="title">Book your Table</h1>
      <p className="subtitle">
        Alternatively, dial <strong>+1 (212) 555-1212</strong> or complete the form.
      </p>

      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="name"  placeholder="Name*"  value={formData.name}  onChange={handleChange}  required />
          <input type="text" name="phone" placeholder="Phone Number"  value={formData.phone}  onChange={handleChange} />
        </div>

        <div className="form-row">
          <input type="email"  name="email" placeholder="Email*"  value={formData.email}  onChange={handleChange}  required  />
          <input type="date"  name="date"  value={formData.date}  onChange={handleChange}  required  />
        </div>

        <div className="form-row">
          <select name="time"  value={formData.time}  onChange={handleChange}  required >
            <option value="">Select Time*</option>
            <option value="6:00 PM">10:00 AM</option>
            <option value="7:00 PM">11:00 AM</option>
            <option value="8:00 PM">12:00 PM</option>
            <option value="6:00 PM">1:00 PM</option>
            <option value="7:00 PM">2:00 PM</option>
            <option value="8:00 PM">3:00 PM</option>
            <option value="6:00 PM">4:00 PM</option>
            <option value="7:00 PM">5:00 PM</option>
            <option value="8:00 PM">6:00 PM</option>
            <option value="6:00 PM">7:00 PM</option>
            <option value="7:00 PM">8:00 PM</option>
          </select>

          <select name="guests" value={formData.guests}  onChange={handleChange} required >
            <option value="">Number of Seats*</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5+">5+</option>
          </select>
        </div>

        <textarea name="message" placeholder="Any Instructions..." value={formData.message} onChange={handleChange} ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Table"}
        </button>
      </form>

      {success && (
        <div className="success-popup">
          <p>Reservation Confirmed!</p>
          <span>Thank you for booking with Eatery.</span>
        </div>
      )}
    </div>
  );
}
