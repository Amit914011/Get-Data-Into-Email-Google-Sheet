import React, { useState } from 'react';

export default function Test() {
  const [activeTab, setActiveTab] = useState('Flight'); // Default tab is 'Flight'
  const [formData, setFormData] = useState({
    flightFrom: '',
    flightTo: '',
    departureDate: '',
    city: '',
    checkInDate: '',
    checkOutDate: ''
  });
  const [errors, setErrors] = useState({});

  // Handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setErrors({});
  };

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Simple form validation
  const validateForm = () => {
    let newErrors = {};
    
    if ((activeTab === 'Flight' || activeTab === 'Both') && !formData.flightFrom) {
      newErrors.flightFrom = 'Departure city is required';
    }
    if ((activeTab === 'Flight' || activeTab === 'Both') && !formData.flightTo) {
      newErrors.flightTo = 'Destination city is required';
    }
    if ((activeTab === 'Flight' || activeTab === 'Both') && !formData.departureDate) {
      newErrors.departureDate = 'Departure date is required';
    }
    if ((activeTab === 'Hotel' || activeTab === 'Both') && !formData.city) {
      newErrors.city = 'City is required';
    }
    if ((activeTab === 'Hotel' || activeTab === 'Both') && !formData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required';
    }
    if ((activeTab === 'Hotel' || activeTab === 'Both') && !formData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log('Form Data:', formData); // Log data to the console

    try {
      const apiUrl = 'https://your-api-endpoint.com/submit'; // Replace with your API URL
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('API Response:', result);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="w-full max-w-md shadow-xl m-auto mt-10 bg-white p-6 rounded-lg relative">
      <form onSubmit={handleSubmit}>
        {/* Tabs Section */}
        <ul className="w-full m-auto p-2 bg-gray-200 flex justify-between items-center rounded-lg px-4 uppercase font-bold">
          <li
            className={`py-2 px-4 rounded cursor-pointer shadow-md ${activeTab === 'Flight' ? 'bg' : ''}`}
            onClick={() => handleTabClick('Flight')}
          >
            Flight
          </li>
          <li
            className={`py-2 px-4 rounded cursor-pointer shadow-md ${activeTab === 'Hotel' ? 'bg-white' : ''}`}
            onClick={() => handleTabClick('Hotel')}
          >
            Hotel
          </li>
          <li
            className={`py-2 px-4 rounded cursor-pointer shadow-md ${activeTab === 'Both' ? 'bg-white' : ''}`}
            onClick={() => handleTabClick('Both')}
          >
            Both
          </li>
        </ul>

        {/* Flight Fields */}
        {(activeTab === 'Flight' || activeTab === 'Both') && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600">From</label>
              <input
                type="text"
                name="flightFrom"
                placeholder="Enter Departure City"
                value={formData.flightFrom}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border ${errors.flightFrom ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#32B57A] focus:outline-none`}
              />
              {errors.flightFrom && <p className="text-red-500 text-xs">{errors.flightFrom}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600">To</label>
              <input
                type="text"
                name="flightTo"
                placeholder="Enter Destination City"
                value={formData.flightTo}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border ${errors.flightTo ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#32B57A] focus:outline-none`}
              />
              {errors.flightTo && <p className="text-red-500 text-xs">{errors.flightTo}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border ${errors.departureDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#32B57A] focus:outline-none`}
              />
              {errors.departureDate && <p className="text-red-500 text-xs">{errors.departureDate}</p>}
            </div>
          </>
        )}

        {/* Hotel Fields */}
        {(activeTab === 'Hotel' || activeTab === 'Both') && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600">City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#32B57A] focus:outline-none`}
              />
              {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600">Check-in Date</label>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border ${errors.checkInDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#32B57A] focus:outline-none`}
              />
              {errors.checkInDate && <p className="text-red-500 text-xs">{errors.checkInDate}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600">Check-out Date</label>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleInputChange}
                className={`w-full mt-1 p-2 border ${errors.checkOutDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#32B57A] focus:outline-none`}
              />
              {errors.checkOutDate && <p className="text-red-500 text-xs">{errors.checkOutDate}</p>}
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="mt-14">
          <button
            type="submit"
            className="w-full bg-[#32B57A] text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Buy Dummy Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
