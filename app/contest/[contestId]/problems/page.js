"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";

const ProblemsPage = ({ params }) => {
  const { contestId } = use(params); // Directly destructure contestId from params

  // State to store the problems data
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch problems data on component mount
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        // Fetch the problems with bid counts
        const response = await fetch(
          `http://localhost:4000/getProblemBidCounts?contest_id=${contestId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch problems");
        }
        const data = await response.json();

        // Sort problems by bid count in descending order
        data.sort((a, b) => b.total_bids - a.total_bids);

        // Fetch contest duration (start_time and end_time)
        const contestResponse = await fetch(
          `http://localhost:4000/getContestDuration?contest_id=${contestId}`
        );
        const contestData = await contestResponse.json();

        const { start_time, end_time } = contestData;
        const duration = new Date(end_time) - new Date(start_time); // Duration in milliseconds

        // Calculate the time slot for each problem
        const problemDuration = duration / data.length;

        // Assign time slots to each problem
        const problemsWithSlots = data.map((problem, index) => {
          const startTime =
            new Date(start_time).getTime() + index * problemDuration;
          const endTime = startTime + problemDuration;
          return {
            ...problem,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
          };
        });

        setProblems(problemsWithSlots);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [contestId]); // Only re-run when contestId changes

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6 flex items-center justify-center">
        <p>Loading problems...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6 flex flex-col items-center">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 animate__animated animate__fadeInDown mb-4">
          Problems for Contest {contestId}
        </h1>
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {problems.map((problem) =>
            // Check if current time is within the time slot of the problem
            new Date(problem.start_time).getTime() < Date.now() &&
            Date.now() < new Date(problem.end_time).getTime() ? (
              <li
                key={problem.id}
                className={`bg-teal-500 relative p-6 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300`}
              >
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {problem.name}
                </h2>
                <p className="text-sm text-gray-300 mb-4">
                  Total Bids: {problem.total_bids}
                </p>
                <p className="text-sm text-gray-300 mb-4">
                  Time Slot: {new Date(problem.start_time).toLocaleTimeString()}{" "}
                  - {new Date(problem.end_time).toLocaleTimeString()}
                </p>
                <div className="bottom-4 right-4">
                  <Link
                    href={`/contest/${contestId}/${problem.id}`}
                    className="px-4 py-2 text-sm font-semibold bg-gray-100 text-gray-900 rounded-full shadow hover:bg-yellow-500 transition"
                  >
                    Solve Now
                  </Link>
                </div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProblemsPage;
