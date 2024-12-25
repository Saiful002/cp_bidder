'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ContestPage = () => {
  const [contests, setContests] = useState([]);

  // Fetch contests from the backend API
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("http://localhost:9090/all");
        if (response.ok) {
          const data = await response.json();
          setContests(data); // Store the contest data in state
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

  // Function to calculate the duration between start and end times
  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const durationInMillis = end - start;
    const durationInMinutes = Math.floor(durationInMillis / (1000 * 60));
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      {/* Page Header */}
      <div className="py-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Contests</h1>
        <p className="text-gray-300 text-lg">
          Browse through the upcoming and ongoing contests. Join and showcase
          your skills!
        </p>
      </div>

      {/* Contest Cards */}
      <div className="container mx-auto px-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {contests.length > 0 ? (
          contests.map((contest) => (
            <div
              key={contest.id}
              className="bg-gradient-to-br from-cyan-700 to-cyan-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {contest.name}
              </h2>
              <p className="text-gray-200 mb-2">
                <strong>Start:</strong>{" "}
                {new Date(contest.start_time).toLocaleString()}
              </p>
              {/* <p className="text-gray-200 mb-2">
                <strong>End:</strong>{" "}
                {new Date(contest.end_time).toLocaleString()}
              </p> */}

              {/* Display duration */}
              <p className="text-gray-200 mb-2">
                <strong>Duration:</strong> {calculateDuration(contest.start_time, contest.end_time)}
              </p>

              <strong>
                Status:{" "}
                <p
                  className={`mb-4 ${
                    contest.status === "Upcoming"
                      ? "text-yellow-500"
                      : "text-lime-400"
                  }`}
                >
                  {contest.status}
                </p>
              </strong>

              <Link
                href={`/contest/${contest.id}`}
                className="inline-block bg-teal-800 text-white py-2 px-4 rounded-md hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300"
              >
                View Contest
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No contests available</p>
        )}
      </div>
    </div>
  );
};

export default ContestPage;
