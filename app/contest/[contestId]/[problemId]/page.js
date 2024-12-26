'use client';

import React, { useState, useEffect, use } from "react";

const SingleProblemPage = ({ params }) => {
  const { contestId, problemId } = use(params);
  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/getSingleProblem?problem_id=${problemId}`
        );
        if (!response.ok) {
          throw new Error("Problem not found");
        }
        const data = await response.json();
        setProblemData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemData();
  }, [problemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleClick = () => {
    // Redirect to the submit solution page
    window.location.href = `/contest/${contestId}/${problemId}/submit`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 mb-8 animate__animated animate__fadeInDown">
        {problemData.name}
      </h1>

      <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Problem Description
        </h2>
        <p className="text-gray-300 mb-4">{problemData.statement}</p>

        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-2">Constraints</h3>
        <p className="text-gray-300 mb-4">{problemData.constraints}</p>

        <h3 className="text-xl font-semibold text-gray-200 mb-2">Sample Input</h3>
        <p className="text-gray-300 mb-4">{problemData.sample_input}</p>

        <h3 className="text-xl font-semibold text-gray-200 mb-2">
          Sample Output
        </h3>
        <p className="text-gray-300 mb-4">{problemData.sample_output}</p>

        
      </div>

      <button className="bg-teal-500 text-white px-6 py-3 rounded-full mt-8 text-lg font-semibold shadow-lg hover:bg-teal-600 transition duration-300" onClick={handleClick}>
        Submit Solution
      </button>
    </div>
  );
};

export default SingleProblemPage;
