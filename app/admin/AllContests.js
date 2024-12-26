"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function AllContests() {
  const [contests, setContests] = useState([]);

  // Fetch all contests from the backend
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("http://localhost:9090/getAllContests");
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

  // Function to handle redirection to edit contest page
  const handleEditClick = (contestId) => {
    window.location.href = `/admin/EditContest?contestId=${contestId}`; // Redirect to the editContest page with
  };

  const handleDelete = async (contestId) => {
    // alert("Are you sure you want to delete this contest?");
    if(confirm("Are you sure you want to delete this contest?")){
      const response = await fetch(`http://localhost:4000/deleteContest?contest_id=${contestId}`, {
        method: "DELETE",
      });
      if(response.ok){
        alert("Contest deleted successfully");
        window.location.reload();
      }else{
        alert("Failed to delete contest");
      }
    }
  }

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
            <th className="py-2 px-4">Action</th>{" "}
            {/* New column for action button */}
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
                <td className="py-2 px-4">
                  {/* Action button */}
                  <button
                    onClick={() => handleEditClick(contest.id)} // On click, redirect to edit page
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contest.id)} // On click, redirect to edit page
                    className="bg-blue-500 text-white px-4 py-2 ms-2 mt-2 rounded-lg hover:bg-blue-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-4 text-center">
                No contests available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
