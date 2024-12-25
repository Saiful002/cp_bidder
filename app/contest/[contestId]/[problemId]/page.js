"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const SingleProblemPage = () => {
  const { contestId, problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch single problem data
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/getSingleProblem?problem_id=${problemId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProblem(data);
        } else {
          setError("Failed to load problem data.");
        }
      } catch (err) {
        console.error("Error fetching problem data:", err);
        setError("An error occurred while fetching problem data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white text-xl">
        Loading problem data...
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-red-500 font-bold text-2xl">
        {error || "Problem not found!"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 mb-8 animate__animated animate__fadeInDown">
        {problem.name}
      </h1>

      <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Problem Description
        </h2>
        <p className="text-gray-300 mb-4">{problem.statement}</p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-2">Input</h3>
        <p className="text-gray-300 mb-4">{problem.sample_input}</p>

        <h3 className="text-xl font-semibold text-gray-200 mb-2">Output</h3>
        <p className="text-gray-300 mb-4">{problem.sample_output}</p>

        <h3 className="text-xl font-semibold text-gray-200 mb-2">
          Constraints
        </h3>
        <p className="text-gray-300 mb-4">{problem.constraints}</p>

        {/* {problem.examples &&
          problem.examples.map((example, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                Example {index + 1}
              </h3>
              <p className="text-gray-300 mb-2">
                <strong>Input:</strong> <br />
                {example.input}
              </p>
              <p className="text-gray-300">
                <strong>Output:</strong> <br />
                {example.output}
              </p>
            </div>
          ))} */}
      </div>

      <Link
        href={`/contests/${contestId}/${problemId}/submit`}
        className="bg-teal-500 text-white px-6 py-3 rounded-full mt-8 text-lg font-semibold shadow-lg hover:bg-teal-600 transition duration-300"
      >
        Submit Solution
      </Link>
    </div>
  );
};

export default SingleProblemPage;
