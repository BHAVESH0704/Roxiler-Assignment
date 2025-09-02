import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const StoreDetails = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    api.get(`/stores/${id}`).then((res) => setStore(res.data));
  }, [id]);

  if (!store) return <p>Loading...</p>;

  return (
    <div>
      <h2>{store.name}</h2>
      <p>{store.description}</p>
      <p>⭐ Average Rating: {store.average_rating}</p>
    </div>
  );
};

export default StoreDetails;
