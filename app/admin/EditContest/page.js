"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";

export default function EditContest() {
  const [contestName, setContestName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [contestId, setContestId] = useState(null);
  const searchParams = useSearchParams();

  const id = searchParams.get("contestId");



  // Fetch contest details using the contest ID from the URL
  useEffect(() => {
    if (id) {
      // Fetch contest details from the backend
      const fetchContestDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/getContestById?contest_id=${id}`
          );
          if (response.ok) {
            const data = await response.json();
            setContestId(data.id);
            setContestName(data.name);
            setStartTime(data.start_time);
            setEndTime(data.end_time);
            setStatus(data.status);
          } else {
            alert("Failed to load contest details");
          }
        } catch (error) {
          console.error("Error fetching contest details:", error);
          alert("An error occurred while fetching contest details");
        }
      };

      fetchContestDetails();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (startTime >= endTime) {
      alert("End time must be after start time.");
      return;
    }

    // Prepare the payload with updated contest data
    const payload = {
      contest_id: contestId,
      name: contestName,
      start_time: startTime,
      end_time: endTime
    };

    try {
      const response = await fetch("http://localhost:4000/editContest", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Contest updated successfully!");
        window.location.href="/admin/AllContests" // Redirect to AllContests page after successful update
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update contest.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the contest.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Edit Contest</h2>
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
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border-black text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* End Time (Date and Time) */}
        <div className="mb-4">
          <label className="block text-black mb-2 font-medium">End Time</label>
          <input
            type="datetime-local"
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
          className="bg-indigo-600 text-white px-4 py-2 mb-3 rounded hover:bg-indigo-700"
        >
          Update Contest
        </button>
        <Link
          href={`/admin`}
          className="bg-indigo-600
        text-white
        px-4
        py-2
        rounded
        ms-4
        hover:bg-indigo-700"
        >
          Back to Admin
        </Link>
      </form>
    </div>
  );
}
