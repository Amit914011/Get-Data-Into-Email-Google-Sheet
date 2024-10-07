import React, { useState } from 'react';

const LeadGeneinExcelSheet = () => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      setErrors({});

      // Prepare data for submission
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });

      const scriptUrl = 'https://script.google.com/macros/s/AKfycby3Mv8NHAgFH1cLuuJQ2Xm-pBAH_hg3nvIB1Apxd7kwRT7shdl1_5hF1gBPQtaBrmZ5Lw/exec';

      fetch(scriptUrl, {
        method: 'POST',
        body: formDataToSubmit,
        mode: 'no-cors',
      })
        .then(() => {
          setSuccessMessage('Form submitted successfully!');
          setErrorMessage('');

          // Reset form
          setFormData({
            name: '',
            number: '',
            email: '',
            from: '',
            to: '',
            departureDate: '',
            adults: '',
            children: '',
            travelClass: ''
          });
          setLoading(false);
        })
        .catch((error) => {
          setErrorMessage('There was an error submitting the form. Please try again.');
          setLoading(false);
        });
    }
  };

  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 w-full max-w-xl">
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
            <label className="block mb-2">Email Address</label>
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
              <option value="">Select Class</option>
              <option value="General">General Class</option>
              <option value="Economy">Economy Class</option>
              <option value="Business">Business Class</option>
            </select>
            {errors.travelClass && <p className="text-red-500 text-sm">{errors.travelClass}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Success and Error Messages */}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LeadGeneinExcelSheet;
