import { useEffect, useState } from "react";
import axios from "axios";
import "./Menu.css";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://restaurant-backend-fjsw.onrender.com/api/menu")
      .then((res) => {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching menu:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading menu...</p>;

  return (
    <div className="menu-page">
      <section className="menu-header">
        <h1>Our Menu</h1>
        <p>
          Explore a curated selection of delicious dishes crafted with the
          freshest ingredients to satisfy every palate.
        </p>
      </section>

      <section className="menu-gallery">
        {menuItems.map((item) => (
          <div className="menu-box" key={item._id}>
            <img
              src={`${import.meta.env.VITE_API_URL}${item.image}`}
              alt={item.name}
              className="menu-image"
            />
            <div className="menu-details">
              <h3>{item.name}</h3>
              <span className="price">${item.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
