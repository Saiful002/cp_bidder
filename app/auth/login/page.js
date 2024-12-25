"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Login() {
  const [formData, setFormData] = useState({
    handle: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter(); // Initialize the router

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message

    try {
      const response = await fetch("http://localhost:9090/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          handle: formData.handle,
          password: formData.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setErrorMessage(responseData.message || "Login failed.");
        return;
      }

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(responseData));

      // Redirect to contest page
      router.push("/contest");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-900 via-teal-500 to-cyan-700">
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md sm:w-3/4 lg:w-1/3">
        <h2 className="text-gray-100 text-2xl font-extrabold mb-4 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-300 text-sm text-center mb-6">
          Log in to continue to your account
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
              name="handle"
              value={formData.handle}
              onChange={handleChange}
              placeholder="Handle"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="block w-full px-4 py-3 text-gray-100 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded shadow-lg hover:bg-teal-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <a
            href="../auth/forget-password"
            className="text-sm text-purple-300 hover:text-purple-500 transition duration-300"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
