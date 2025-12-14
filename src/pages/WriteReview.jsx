import { useState } from "react";
import "./WriteReview.css";


function WriteReview() {
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    message: "",
  });

  const submitReview = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8888/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Review submitted for approval");
    setForm({ name: "", rating: 0, message: "" });
  };

  return (
    <div className="review-page">
      <h1>Write a Review</h1>

      <form onSubmit={submitReview} className="review-form">
        <div className="form-row">
          <input type="text" placeholder="Your name" value={form.name}  onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        
        {/* Star Rating */}
        <div className="form-row">
          <div className="star-rating">
            <p>Rating</p>

            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <i key={star} className={star <= form.rating ? "fa-solid fa-star star filled" : "fa-regular fa-star star" }
                  onClick={() => setForm({ ...form, rating: star })}></i>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row">
          <textarea placeholder="Write your review" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        </div>

        <button type="submit" disabled={!form.rating}>
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default WriteReview;
