import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({});

  useEffect(() => {
    if (id) {
      const getCarData = async () => {
        const response = await axios.get(`http://localhost:3000/api/cars/${id}`);
        setCar(response.data);
      };
      getCarData();
    }
  }, [id]);

  return (
    <div className="mt-20 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Car Details</h1>

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-64 object-cover"
        />

        <div className="p-6 space-y-3">
          <p className="text-lg"><strong>Make:</strong> {car.make}</p>
          <p className="text-lg"><strong>Model:</strong> {car.model}</p>
          <p className="text-lg"><strong>Year:</strong> {car.year}</p>
          <p className="text-lg"><strong>Price:</strong> PKR {car.price?.toLocaleString()}</p>
          <p className="text-lg"><strong>Location:</strong> {car.location}</p>
          <p className="text-lg"><strong>Condition:</strong> {car.condition}</p>
          <p className="text-sm text-gray-500">ID: {car.id}</p>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-2xl mx-auto mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow transition"
        >
          ← Back to Listings
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
