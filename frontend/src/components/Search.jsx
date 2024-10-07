import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Search() {
  const countries = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
  ];

  const travelClasses = [
    { value: "general", label: "General Class" },
    { value: "economy", label: "Economy Class" }
  ];

  // States for the form
  const [selectOption1, setSelectOption1] = useState(null);
  const [selectOption2, setSelectOption2] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [travelClass, setTravelClass] = useState(null);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    if (!selectOption1 || !selectOption2 || !startDate || adults === '' || children === '' || !travelClass) {
      setError('All fields are required.');
      return;
    }

    if (adults <= 0 || children < 0) {
      setError('Number of adults must be greater than 0, and children cannot be negative.');
      return;
    }

    // Extract day, month, and year from the selected date
    const day = startDate.getDate();
    const month = startDate.getMonth() + 1; // Months are 0-based, so we add 1
    const year = startDate.getFullYear();

    console.log('Selected countries:', selectOption1.value, selectOption2.value);
    console.log('Selected Date:', `${day}/${month}/${year}`);
    console.log('Number of Adults:', adults, 'Number of Children:', children, 'Travel Class:', travelClass.value);

    setError('');  // Clear error on successful submission

    // You can send this data to the backend as needed.
  };

  return (
    <div className='w-full h-screen bg-gradient-to-r from-purple-500 to-blue-500 pt-20 flex items-center justify-center'>
      <form className='bg-white p-8 rounded-lg shadow-lg w-[600px]' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Search Flights</h2>
        
        <div className='flex justify-between items-center gap-4'>
          {/* From Country Select */}
          <div className='flex flex-col w-[45%]'>
            <label htmlFor="from" className="mb-1 text-sm text-gray-700">From</label>
            <Select
              id="from"
              options={countries}
              value={selectOption1}
              onChange={setSelectOption1}
              placeholder='Select country...'
              className='w-full'
            />
          </div>

          {/* To Country Select */}
          <div className='flex flex-col w-[45%]'>
            <label htmlFor="to" className="mb-1 text-sm text-gray-700">To</label>
            <Select
              id="to"
              options={countries}
              value={selectOption2}
              onChange={setSelectOption2}
              placeholder='Select country...'
              className='w-full'
            />
          </div>
        </div>

        {/* Date Picker */}
        <div className='flex flex-col mt-4'>
          <label htmlFor="date" className="mb-1 text-sm text-gray-700">Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select date"
            disabledKeyboardNavigation
            className='w-full px-4 py-2 border border-gray-300 rounded-md'
          />
        </div>

        {/* Number of Adults */}
        <div className='flex flex-col mt-4'>
          <label htmlFor="adults" className="mb-1 text-sm text-gray-700">Adults (+18)</label>
          <input 
            type="number" 
            id="adults" 
            value={adults} 
            onChange={(e) => setAdults(e.target.value)} 
            className='w-full px-4 py-2 border border-gray-300 rounded-md'
            min="1"
          />
        </div>

        {/* Number of Children */}
        <div className='flex flex-col mt-4'>
          <label htmlFor="children" className="mb-1 text-sm text-gray-700">Children (-17)</label>
          <input 
            type="number" 
            id="children" 
            value={children} 
            onChange={(e) => setChildren(e.target.value)} 
            className='w-full px-4 py-2 border border-gray-300 rounded-md'
            min="0"
          />
        </div>

        {/* Travel Class */}
        <div className='flex flex-col mt-4'>
          <label htmlFor="travelClass" className="mb-1 text-sm text-gray-700">Travel Class</label>
          <Select
            id="travelClass"
            options={travelClasses}
            value={travelClass}
            onChange={setTravelClass}
            placeholder='Select class...'
            className='w-full'
          />
        </div>

        {/* Error Message */}
        {error && <p className='text-red-500 mt-2'>{error}</p>}

        {/* Submit Button */}
        <button 
          type="submit" 
          className='mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200'>
          Search Flights
        </button>
      </form>
    </div>
  );
}
