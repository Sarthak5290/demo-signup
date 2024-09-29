import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/'); // Redirect to home if token exists
    } else {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        setIsTransitioning(true);
        setTimeout(() => {
          navigate('/login'); // Redirect to login page on success
        }, 500);
      } else {
        setErrorMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Error during signup. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-300 overflow-hidden">
      <div
        className={`w-full max-w-md bg-white p-8 rounded-lg shadow-lg transition-transform duration-500 ${
          isTransitioning ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>
        
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={handleLoginRedirect}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
