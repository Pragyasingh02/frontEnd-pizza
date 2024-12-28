import React, { useState } from 'react';
import useFetch from '../CustomHook/useFetch';
import PizzaCard from '../Home/PizzaCard';

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [url, setUrl] = useState('http://localhost:8084/pizza');
  const { data: items, loading, error } = useFetch(url);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    switch (newFilter) {
      case 'veg':
        setUrl('http://localhost:8084/pizza/type/VEG');
        break;
      case 'nonveg':
        setUrl('http://localhost:8084/pizza/type/NON_VEG');
        break;
      case 'size-large':
        setUrl('http://localhost:8084/pizza/size/LARGE');
        break;
      case 'size-medium':
        setUrl('http://localhost:8084/pizza/size/MEDIUM');
        break;
      case 'size-small':
        setUrl('http://localhost:8084/pizza/size/SMALL');
        break;
      default:
        setUrl('http://localhost:8084/pizza');
        break;
    }
    setIsOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {filter === 'all' ? 'Sort by' : filter}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => handleFilterChange('all')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('veg')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Veg
            </button>
            <hr></hr>
            <button
              onClick={() => handleFilterChange('nonveg')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Non-Veg
            </button>
            <button
              onClick={() => handleFilterChange('size-large')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Large
            </button>
            <button
              onClick={() => handleFilterChange('size-medium')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Medium
            </button>
            <button
              onClick={() => handleFilterChange('size-small')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Small
            </button>
          </div>
        </div>
      )}

      {/* <div className="mt-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 border border-gray-300 rounded-md mb-2">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>{item.description}</p>
            <p className="text-gray-500">Price: ${item.price}</p>
          </div>
        ))}
      </div> */}
      {/* <div className='flex flex-wrap w-full mx-auto mt-4 pb-6'> */}
      <div className='bg-gray-100 min-h-screen flex flex-wrap h-fit pt-[60px] w-full'>
      {items.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} />
      ))}
      </div>
    </div>
  );
};

export default SortDropdown;
