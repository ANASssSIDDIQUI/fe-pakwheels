import { useState } from "react";
import axios from "axios";

const AddNewListing = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    location: "",
    condition: "",
    image:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      make: formData.make,
      model: formData.model,
      year: formData.year,
      price: formData.price,
      location: formData.location,
      condition: formData.condition,
      image: formData.image
    };

    const addCar = async () => {
      const response = await axios.post("http://localhost:3000/api/cars" , payload);
      console.log(response)
    };
    addCar();

    handleClear(); // Reset the form after saving
  };

  const handleClear = () => {
    setFormData({
      make: "",
      model: "",
      year: "",
      price: "",
      location: "",
      condition: "",
      image: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add New Car Listing
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields */}
        {[
          { label: "Make", name: "make" },
          { label: "Model", name: "model" },
          { label: "Year", name: "year", type: "number" },
          { label: "Price", name: "price", type: "number" },
          { label: "Location", name: "location" },
          { label: "Image URL", name: "image" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />
          </div>
        ))}

        {/* Condition Dropdown */}
        <div>
          <label className="block font-medium">Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          >
            <option value="Used">Used</option>
            <option value="New">New</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            rows="4"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition w-full"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewListing;
