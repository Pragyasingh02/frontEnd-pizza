import Corousel from "../Banners/Corousel";
import React, { useState } from "react";
import useFetch from "../CustomHook/useFetch";
import PizzaCard from "../Home/PizzaCard";
import Footer from "../Extra/Footer";

const Pizzas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [url, setUrl] = useState("http://localhost:8082/pizza");
  const { data: items, loading, error } = useFetch(url);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    switch (newFilter) {
      case "veg":
        setUrl("http://localhost:8082/pizza/type/VEG");
        break;
      case "nonveg":
        setUrl("http://localhost:8082/pizza/type/NON_VEG");
        break;
      case "size-large":
        setUrl("http://localhost:8082/pizza/size/LARGE");
        break;
      case "size-medium":
        setUrl("http://localhost:8082/pizza/size/MEDIUM");
        break;
      case "size-small":
        setUrl("http://localhost:8082/pizza/size/SMALL");
        break;
      default:
        setUrl("http://localhost:8082/pizza");
        break;
    }
    setIsOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col pt-[70px]">
      <div className="w-full mb-6">
        <Corousel />
      </div>
      {/* Filter Dropdown */}
      <div className="relative ml-4 inline-block text-left w-full sm:w-1/4 md:w-1/6 lg:w-1/12 mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {filter === "all" ? "Sort by" : filter}
        </button>

        {isOpen && (
          <div className="absolute left-0 mt-2 w-full sm:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                onClick={() => handleFilterChange("all")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange("veg")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Veg
              </button>
              <hr />
              <button
                onClick={() => handleFilterChange("nonveg")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Non-Veg
              </button>
              <button
                onClick={() => handleFilterChange("size-large")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Large
              </button>
              <button
                onClick={() => handleFilterChange("size-medium")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Medium
              </button>
              <button
                onClick={() => handleFilterChange("size-small")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Small
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mx-auto ">
        {items.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Pizzas;
