"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SingleProblemAdmin() {
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  const problemId = searchParams.get("problem_id");

  useEffect(() => {
    if (!problemId) {
      setError("Invalid problem ID.");
      return;
    }

    const fetchProblem = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/getSingleProblem?problem_id=${problemId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProblem(data);
        } else {
          setError("Failed to fetch the problem.");
        }
      } catch (error) {
        setError("Error fetching the problem: " + error.message);
      }
    };

    fetchProblem();
  }, [problemId]);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">
        {problem.name}
      </h1>
      <div className="mb-4">
        <h2 className="text-xl font-medium text-gray-800">Problem Statement</h2>
        <p className="text-gray-700">{problem.statement}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-medium text-gray-800">Sample Input</h2>
        <pre className="bg-gray-100 p-2 rounded">{problem.sample_input}</pre>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-medium text-gray-800">Sample Output</h2>
        <pre className="bg-gray-100 p-2 rounded">{problem.sample_output}</pre>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-medium text-gray-800">Constraints</h2>
        <p className="text-gray-700">{problem.constraints}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-medium text-gray-800">Expected Result</h2>
        <p className="text-gray-700">{problem.result}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-medium text-gray-800">Contest ID</h2>
        <p className="text-gray-700">{problem.contest_id}</p>
      </div>
    </div>
  );
}
