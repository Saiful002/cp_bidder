"use client";
import React, { useState } from "react";

export default function AddContest() {
  const [contestName, setContestName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Scheduled"); // Default status

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      name: contestName,
      startTime: startTime + " 00:00:00", // Add default time for simplicity
      endTime: endTime + " 00:00:00", // Add default time for simplicity
      status,
    };

    try {
      const response = await fetch("http://localhost:9090/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Contest added successfully!");
        setContestName("");
        setStartTime("");
        setEndTime("");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add contest.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the contest.");
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Add Contest</h2>
        <form onSubmit={handleSubmit}>
          {/* Contest Name */}
          <div className="mb-4">
            <label className="block text-black mb-2 font-medium">
              Contest Name
            </label>
            <input
              type="text"
              value={contestName}
              onChange={(e) => setContestName(e.target.value)}
              className="border-black text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter contest name"
              required
            />
          </div>

          {/* Start Time */}
          <div className="mb-4">
            <label className="block text-black mb-2 font-medium">
              Start Time
            </label>
            <input
              type="date"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border-black text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* End Time */}
          <div className="mb-4">
            <label className="block text-black mb-2 font-medium">
              End Time
            </label>
            <input
              type="date"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border-black text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-black mb-2 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border-black text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add Contest
          </button>
        </form>
      </div>
    </div>
  );
}
