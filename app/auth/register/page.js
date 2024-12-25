"use client";
import React, { useState } from "react";


export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    handle: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message

    // Validate input locally
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          handle: formData.handle,
          email: formData.email,
          password: formData.password,
        }),
      });

       console.log(JSON.stringify(formData));
      // console.log();

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed.");
        return;
      }

      // Red console.log(JSON.stringify(formData));irect to login or show success message
      alert("Registration successful! You can now log in.");

      console.log(response);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-700 via-sky-900 to-cyan-500">
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md sm:w-3/4 lg:w-1/3">
        <h2 className="text-gray-100 text-2xl font-extrabold mb-4 text-center">
          Create an Account
        </h2>
        <p className="text-gray-300 text-sm text-center mb-6">
          Join us to start participating in contests and challenges.
        </p>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="handle"
              value={formData.handle}
              onChange={handleChange}
              placeholder="Handle (must be unique)"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded shadow-lg hover:bg-teal-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-4">
          <span className="h-px w-full bg-gray-600"></span>
          <span className="text-gray-400 text-sm">Or</span>
          <span className="h-px w-full bg-gray-600"></span>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-teal-300 hover:text-teal-500 transition duration-300"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
