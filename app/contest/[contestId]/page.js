"use client";
import React, { useState, useEffect } from "react";
import Timer from "@/components/Timer";
import Link from "next/link";
import { useParams } from "next/navigation";

const SingleContestPage = () => {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch single contest data
  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/getSingleContest?contest_id=${contestId}`
        );
        if (response.ok) {
          const data = await response.json();
          setContest(data);
        } else {
          setError("Failed to load contest data.");
        }
      } catch (err) {
        console.error("Error fetching contest data:", err);
        setError("An error occurred while fetching contest data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContest();
  }, [contestId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white text-xl">
        Loading contest data...
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-red-500 font-bold text-2xl">
        {error || "Contest not found!"}
      </div>
    );
  }

  const startTime = new Date(contest.start_time).getTime();
  const isContestStarted = startTime <= new Date().getTime();

  return (
    <>
      {!isContestStarted ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6">
          <h2 className="text-3xl sm:text-4xl font-semibold text-teal-400 mb-6">
            The contest has not started yet.
          </h2>
          <div className="text-lg sm:text-xl font-medium text-gray-300 mb-6">
            <p className="mb-4">The contest will start soon. Get ready!</p>
            <Timer startTime={startTime} />
          </div>
          <Link
            href="/contest"
            className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-teal-600 transition duration-300"
          >
            Stay tuned for the contest start!
          </Link>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 flex flex-col items-center justify-center overflow-hidden">
          {/* Page Header */}
          <div className="text-center mb-6 px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 mb-4">
              {contest.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300">
              Welcome to {contest.name}. Explore the challenges and put
              your skills to the test!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-4">
            <Link
              href={`/contest/${contestId}/problems`}
              className="bg-rose-600 hover:bg-rose-700 text-white py-4 px-6 rounded-lg shadow-md text-center font-semibold text-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              View Problems
            </Link>
            <Link
              href={`/contest/${contestId}/leaderboard`}
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-4 px-6 rounded-lg shadow-md text-center font-semibold text-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              View Leaderboard
            </Link>
            <Link
              href={`/contest/${contestId}/viewSubmission`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg shadow-md text-center font-semibold text-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              View Submissions
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleContestPage;
