"use client";
import React, { useEffect, useState } from "react";

export default function AllContests() {
  const [contests, setContests] = useState([]);

  // Fetch all contests from the backend
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("http://localhost:9090/all");
        if (response.ok) {
          const data = await response.json();
          setContests(data);
        } else {
          alert("Failed to load contests");
        }
      } catch (error) {
        console.error("Error fetching contests:", error);
        alert("An error occurred while fetching contests");
      }
    };

    fetchContests();
  }, []);

  // Function to format date and time as '12 January 2025, 14:30'
  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 12-hour format with AM/PM
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", options); // 'en-GB' for full month name and time
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">All Contests</h2>

      {/* Table for contests */}
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Contest Name</th>
            <th className="py-2 px-4">Start Time</th>
            <th className="py-2 px-4">End Time</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Created At</th>
          </tr>
        </thead>
        <tbody>
          {contests.length > 0 ? (
            contests.map((contest) => (
              <tr key={contest.id} className="border-b">
                <td className="py-2 px-4">{contest.id}</td>
                <td className="py-2 px-4">{contest.name}</td>
                <td className="py-2 px-4">
                  {formatDateTime(contest.start_time)}
                </td>
                <td className="py-2 px-4">
                  {formatDateTime(contest.end_time)}
                </td>
                <td className="py-2 px-4">{contest.status}</td>
                <td className="py-2 px-4">
                  {formatDateTime(contest.created_at)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-center">
                No contests available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
