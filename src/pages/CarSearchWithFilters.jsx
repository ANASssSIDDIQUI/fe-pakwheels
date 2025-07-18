import { useState } from "react";
import axios from "axios";

function CarSearchWithFilters() {
  const [formData, setFormData] = useState({
    makeOrModel: "",
    minPrice: "",
    maxPrice: "",
    location: "",
  });

  const [carResults, setCarResults] = useState([]);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const payload = {
      search: formData.makeOrModel,
      location: formData.location,
      minPrice: formData.minPrice ? parseInt(formData.minPrice) * 100000 : undefined,
      maxPrice: formData.maxPrice ? parseInt(formData.maxPrice) * 100000 : undefined,
    };

    try {
      const response = await axios.get("https://be-pakwheels-production-b99b.up.railway.app/api/cars", {
        params: payload,
      });
      setCarResults(response.data);
    } catch (error) {
      console.error("Error fetching filtered cars:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="bg-gradient-to-r from-blue-500 to-blue-500 py-6 px-4 rounded-2xl">
          <div className="max-w-5xl mx-auto flex flex-wrap gap-2 md:gap-4 items-center relative">
            {/* Make or Model Input */}
            <input
              type="text"
              name="makeOrModel"
              value={formData.makeOrModel}
              onChange={handleChange}
              placeholder="Car Make or Model"
              className="flex-1 rounded-md bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-black"
            />

            {/* City Dropdown */}
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="text-black rounded-md bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">All Cities</option>
              <option>Karachi</option>
              <option>Lahore</option>
              <option>Islamabad</option>
              <option>Rawalpindi</option>
              <option>Multan</option>
            </select>

            {/* Price Range Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className="text-black rounded-md bg-white px-4 py-2 text-sm shadow-sm flex items-center focus:outline-none"
              >
                Price Range ▾
              </button>
              {showPriceDropdown && (
                <div className="absolute z-10 bg-white border mt-1 rounded-md w-64 p-4 shadow-lg">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="minPrice"
                        value={formData.minPrice}
                        onChange={handleChange}
                        placeholder="Min"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none text-black"
                      />
                      <span className="text-xs text-gray-500">lacs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="maxPrice"
                        value={formData.maxPrice}
                        onChange={handleChange}
                        placeholder="Max"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none text-black"
                      />
                      <span className="text-xs text-gray-500">lacs</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-3">Quick Select:</div>
                  <ul className="text-sm mt-2 space-y-1 text-black cursor-pointer">
                    {[5, 10, 15, 20, 25, 30].map((val) => (
                      <li
                        key={val}
                        className="hover:underline"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            minPrice: val.toString(),
                            maxPrice: val.toString(),
                          })
                        }
                      >
                        {val} Lacs
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {/* Filtered Car Results */}
      <div className="max-w-5xl mx-auto mt-6">
        {carResults.length > 0 && (
          <h2 className="text-xl font-semibold mb-4">Showing results for "{formData.makeOrModel}"</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {carResults.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow p-4">
              <img src={car.image} alt={car.model} className="w-full h-40 object-cover rounded" />
              <h2 className="mt-2 text-lg font-semibold">{car.make} {car.model}</h2>
              <p className="text-sm text-gray-600">{car.location}</p>
              <p className="text-green-600 font-bold mt-1">PKR {car.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarSearchWithFilters;
