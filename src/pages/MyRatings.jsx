import { useEffect, useState } from "react";
import api from "../api/axios";

const MyRatings = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    api.get("/ratings/my").then((res) => setRatings(res.data));
  }, []);

  return (
    <div>
      <h2>My Ratings</h2>
      <ul>
        {ratings.map((r) => (
          <li key={r.id}>
            Store {r.store_id} → ⭐ {r.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRatings;
