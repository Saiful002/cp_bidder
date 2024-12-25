"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AllProblems() {
  const [problems, setProblems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch("http://localhost:9090/getAllProblems");
        if (response.ok) {
          const data = await response.json();
          setProblems(data);
        } else {
          console.error("Failed to fetch problems:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const handleViewProblem = (problemId) => {
    router.push(`/admin/SingleProblemAdmin?problem_id=${problemId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">All Problems</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                Problem Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {problem.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleViewProblem(problem.id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    View Problem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
