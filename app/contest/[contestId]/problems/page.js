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
        const response = await fetch(
          `http://localhost:9090/getContestProblems?contest_id=${contestId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch problems");
        }
        const data = await response.json();
        setProblems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [contestId]); // Only re-run when contestId changes

  const difficultyColors = {
    Easy: "bg-green-600",
    Medium: "bg-sky-500",
    Hard: "bg-red-700",
  };

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
          {problems.map((problem) => (
            <li
              key={problem.id}
              className={`bg-teal-500  relative p-6 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300`}
            >
              <h2 className="text-2xl font-bold mb-2 text-white">
                {problem.name}
              </h2>
              <div className="bottom-4 right-4">
                <Link
                  href={`/contest/${contestId}/${problem.id}`}
                  className="px-4 py-2 text-sm font-semibold bg-gray-100 text-gray-900 rounded-full shadow hover:bg-yellow-500 transition"
                >
                  Solve Now
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProblemsPage;
