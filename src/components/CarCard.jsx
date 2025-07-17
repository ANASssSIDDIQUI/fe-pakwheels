import { useNavigate} from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate()
  function showDescription(id) {
    navigate(`/details/${id}`)
  }

  return (
    // <a href="/details">
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-72">
      <img
        src={car.image}
        alt={`${car.make} ${car.model}`}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">
          {car.make} {car.model}
        </h2>
        <p className="text-sm text-gray-600">
          {car.year} | {car.condition}
        </p>
        <p className="text-gray-500 mt-2">{car.description}</p>
        <p className="text-blue-600 font-semibold mt-2">
          Rs. {car.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-400">{car.location}</p>
        <button
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-300 transition"
          onClick={() => showDescription(car.id)}
        >
          Show Description
        </button>
      </div>
    </div>
    // </a>
  );
};
export default CarCard;
