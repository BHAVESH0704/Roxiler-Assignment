import { useEffect, useState } from "react";
import api from "../api/axios";

const OwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    api.get("/ratings/store").then((res) => setRatings(res.data));
  }, []);

  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      <ul>
        {ratings.map((r) => (
          <li key={r.id}>
            User {r.user_id} rated ⭐ {r.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerDashboard;
