"use client";
import React, { useState } from "react";

export default function AddContest() {
  const [contestName, setContestName] = useState("");
  const [startTime, setStartTime] = useState(""); // Date and time
  const [endTime, setEndTime] = useState(""); // Date and time
  const [status, setStatus] = useState("Scheduled"); // Default status

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(startTime < new Date().toISOString()) {
        alert("Start time cannot be in the past.");
        return;
    }

    if(startTime >= endTime) {
        alert("End time must be after start time.");
        return;
    }

    // Prepare the payload with both date and time
    const payload = {
      name: contestName,
      startTime: startTime, // 'startTime' will now have both date and time
      endTime: endTime, // 'endTime' will also have both date and time
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

          {/* Start Time (Date and Time) */}
          <div className="mb-4">
            <label className="block text-black mb-2 font-medium">
              Start Time
            </label>
            <input
              type="datetime-local" // Allows both date and time selection
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border-black text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* End Time (Date and Time) */}
          <div className="mb-4">
            <label className="block text-black mb-2 font-medium">
              End Time
            </label>
            <input
              type="datetime-local" // Allows both date and time selection
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
