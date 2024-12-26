"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ContestPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contests from the backend API
  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:9090/getAllContests");
        if (!response.ok) {
          throw new Error("Failed to load contests");
        }
        const data = await response.json();

        // Update the status if start time has passed
        const updatedContests = data.map((contest) => {
          const currTime = new Date().toISOString();

          console.log(currTime);
          console.log(contest.start_time);

          console.log(contest.start_time < currTime);
          console.log(contest.status);

          if (contest.start_time < currTime && contest.status === "Scheduled") {
            console.log("i am here");
            contest.status = "ongoing";
            updateContestStatus(contest.id, "Ongoing"); // Update status in the backend
          }

          if(contest.end_time<currTime && contest.status === "Ongoing"){
            contest.status = "Completed";
            updateContestStatus(contest.id, "Completed");
          }
          return contest;
        });

        setContests(updatedContests);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  // Function to update the contest status in the backend
  const updateContestStatus = async (contestId, status) => {
    try {
      const response = await fetch(
        "http://localhost:9090/updateContestStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contest_id: contestId, status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update contest status");
      }
      console.log(`Contest ${contestId} status updated to ${status}`);
    } catch (error) {
      console.error("Error updating contest status:", error);
    }
  };

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



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
        <p className="text-white text-xl">Loading contests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
        <p className="text-white text-xl">{`Error: ${error}`}</p>
      </div>
    );
  }

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

              {/* Display duration */}
              <p className="text-gray-200 mb-2">
                <strong>Duration:</strong>{" "}
                {calculateDuration(contest.start_time, contest.end_time)}
              </p>

              <strong>
                Status:{" "}
                <p
                  className={`mb-4 ${
                    contest.status === "upcoming"
                      ? "text-yellow-500"
                      : "text-lime-400"
                  }`}
                >
                  {contest.status}
                </p>
              </strong>

              <Link
                href={`contest/${contest.id}/register`}
                className="inline-block bg-teal-800 text-white py-2 px-4 rounded-md hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300"
              >
                Register
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
