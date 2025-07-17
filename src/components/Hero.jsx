import CarSearchWithFilters from "../pages/CarSearchWithFilters";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-4 rounded-xl shadow-md mb-10 mt-12">
      <div className="max-w-4xl max-h-full mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Welcome to Mini PakWheels
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 mb-6">
          Find your next ride — New or Used, Fast and Easy.
        </p>

        <CarSearchWithFilters />
      </div>
    </section>
  );
};
export default Hero;
