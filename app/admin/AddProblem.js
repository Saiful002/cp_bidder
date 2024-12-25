"use client";
import React, { useState, useEffect } from "react";

export default function AddProblem() {
  const [formData, setFormData] = useState({
    name: "",
    statement: "",
    sample_input: "",
    sample_output: "",
    constraints: "",
    result: "",
    contest_id: "",
  });

  const [contests, setContests] = useState([]);

  // Fetch contests
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("http://localhost:9090/getAllContests");
        if (response.ok) {
          const data = await response.json();
          setContests(data);
        } else {
          console.error("Failed to fetch contests");
        }
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/addProblem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Problem added successfully!");
        console.log(result);
        // Reset the form
        setFormData({
          name: "",
          statement: "",
          sample_input: "",
          sample_output: "",
          constraints: "",
          result: "",
          contest_id: "",
        });
      } else {
        const error = await response.text();
        alert("Failed to add problem: " + error);
      }
    } catch (error) {
      console.error("Error adding problem:", error);
      alert("An error occurred while adding the problem.");
    }

    console.log(formData);
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Add Problem</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Problem Title
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter problem title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Problem Statement
            </label>
            <textarea
              name="statement"
              value={formData.statement}
              onChange={handleChange}
              className="border text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter problem statement"
              rows="5"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Sample Input
            </label>
            <textarea
              name="sample_input"
              value={formData.sample_input}
              onChange={handleChange}
              className="border text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter sample input"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Sample Output
            </label>
            <textarea
              name="sample_output"
              value={formData.sample_output}
              onChange={handleChange}
              className="border text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter sample output"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Constraints
            </label>
            <textarea
              name="constraints"
              value={formData.constraints}
              onChange={handleChange}
              className="border text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter constraints"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Expected Result
            </label>
            <input
              type="text"
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="border text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter expected result"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Contest
            </label>
            <select
              name="contest_id"
              value={formData.contest_id}
              onChange={handleChange}
              className="border text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select a contest</option>
              {contests.map((contest) => (
                <option key={contest.id} value={contest.id}>
                  {contest.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add Problem
          </button>
        </form>
      </div>
    </div>
  );
}
