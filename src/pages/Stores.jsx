import { useEffect, useState } from "react";
import api from "../api/axios";

const Stores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/stores").then((res) => setStores(res.data));
  }, []);

  return (
    <div>
      <h2>Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            {store.name} - ⭐ {store.average_rating || "No ratings yet"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stores;
