import CarCard from "../components/CarCard";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import axios from "axios";

function CarListing() {
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    const getCarList = async () => {
      const response = await axios.get('https://be-pakwheels-production-b99b.up.railway.app/api/cars');
      setCarsData(response.data);
    };

    getCarList();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Hero />
      <h1 className="text-3xl font-bold mb-6 text-center">Car Listings</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {carsData.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
export default CarListing;
