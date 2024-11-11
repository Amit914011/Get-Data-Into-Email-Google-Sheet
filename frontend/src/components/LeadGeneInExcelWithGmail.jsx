import React, { useState } from 'react';

const LeadGene = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    from: '',
    to: '',
    departureDate: '',
    adults: '',
    children: '',
    travelClass: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeButton, setActiveButton] = useState(''); // Track which button is clicked

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.number) formErrors.number = 'Number is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.from) formErrors.from = 'Departure location is required';
    if (!formData.to) formErrors.to = 'Destination is required';
    if (!formData.departureDate) formErrors.departureDate = 'Departure date is required';
    if (!formData.adults) formErrors.adults = 'Number of adults is required';
    if (!formData.travelClass) formErrors.travelClass = 'Travel class is required';
    
    return formErrors;
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      setErrors({});
      
      try {
        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSubmit.append(key, value); 
        });
        
        formDataToSubmit.append('type', type);

        const scriptUrl = 'https://script.google.com/macros/s/AKfycby3Mv8NHAgFH1cLuuJQ2Xm-pBAH_hg3nvIB1Apxd7kwRT7shdl1_5hF1gBPQtaBrmZ5Lw/exec';
        
        await fetch(scriptUrl, {
          method: 'POST',
          body: formDataToSubmit,
          mode: 'no-cors',
        });

        // Sending SMS
        if (formData.email && formData.name) {
          await fetch('http://localhost:5000/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, name: formData.name, number: formData.number, from:formData.from,to:formData.to,departureDate:formData.departureDate,adults:formData.adults,children:formData.children,travelClass:formData.travelClass,type:formData.type }),
          });
          
          setSuccessMessage('Your data has been submitted successfully.');
        } else {
          throw new Error('Please enter both a valid email address and name.');
        }

        // Reset form on success
        setFormData({
          name: '',
          number: '',
          email: '',
          from: '',
          to: '',
          departureDate: '',
          adults: '',
          children: '',
          travelClass: '',
        });

      } catch (err) {
        setErrorMessage(err.message || 'There was an error submitting the form. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div>
        <button
          className={`mr-4 p-2 ${activeButton === 'B2C' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveButton('B2C')}
        >
          B2C
        </button>
        <button
          className={`p-2 ${activeButton === 'B2B' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveButton('B2B')}
        >
          B2B
        </button>
      </div>

      <form className="bg-white shadow-md rounded px-8 py-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Enquiry Form</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Name */}
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Number */}
          <div>
            <label className="block mb-2">Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* From */}
          <div>
            <label className="block mb-2">From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
          </div>

          {/* To */}
          <div>
            <label className="block mb-2">To</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
          </div>

          {/* Departure Date */}
          <div>
            <label className="block mb-2">Departure Date</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.departureDate && <p className="text-red-500 text-sm">{errors.departureDate}</p>}
          </div>

          {/* Adults */}
          <div>
            <label className="block mb-2">Adults</label>
            <input
              type="number"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.adults && <p className="text-red-500 text-sm">{errors.adults}</p>}
          </div>

          {/* Children */}
          <div>
            <label className="block mb-2">Children</label>
            <input
              type="number"
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Travel Class */}
          <div>
            <label className="block mb-2">Travel Class</label>
            <select
              name="travelClass"
              value={formData.travelClass}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select class</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
            </select>
            {errors.travelClass && <p className="text-red-500 text-sm">{errors.travelClass}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={(e) => handleSubmit(e, activeButton)}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Success/Error Message */}
        {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LeadGene;
