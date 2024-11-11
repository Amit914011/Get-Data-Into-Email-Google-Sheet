import React, { useState } from 'react';

export default function ButtonChangerTab() {
  const [activeButton, setActiveButton] = useState(''); // State to track which button is clicked
  const [name, setName] = useState(''); // State to track name input
  const [error, setError] = useState(''); // State to track form validation errors

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (name.trim() === '') {
      setError('Name is required'); // Set error if name is empty
      return;
    }
    // Clear the error if validation passes
    setError('');

    // Log form data to the console
    console.log({
      name: name,
      client: activeButton === 'button1' ? 'B2C' : 'B2B'
    });

    // Handle the form based on the active button
    // if (activeButton === 'button1') {
    //   alert(`Form submitted for B2C with name: ${name}`);
    // } else if (activeButton === 'button2') {
    //   alert(`Form submitted for B2B with name: ${name}`);
    // } else {
    //   alert('Please select either B2C or B2B');
    // }
  };

  return (
    <div className="text-2xl text-center mt-5">
      <div>
        <button
          className={`mr-4 p-2 ${activeButton === 'button1' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveButton('button1')}
        >
          B2C
        </button>
        <button
          className={`p-2 ${activeButton === 'button2' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveButton('button2')}
        >
          B2B
        </button>
      </div>

      {/* Form starts here */}
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
        </div>

        <div className="mt-5">
          {/* Conditionally rendering content based on which button is clicked */}
          {activeButton === 'button1' && (
            <div>
              <button type="submit" className="bg-green-500 text-white p-2">Buy Dummy Ticket B2C</button>
            </div>
          )}

          {activeButton === 'button2' && (
            <div>
              <button type="submit" className="bg-green-500 text-white p-2">Buy Dummy Ticket B2B</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
