"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";

const SubmitSolutionPage = ({ params }) => {
  const { contestId, problemId } = use(params);
  const [code, setCode] = useState("");
  const [verdict, setVerdict] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVerdict("");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    try {
      const response = await fetch("http://localhost:4000/addSubmission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId, // Adjust based on your authentication logic
          contestId,
          problemId,
          code,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setVerdict(data.verdict);
        console.log(data);
      } else {
        const data = await response.json();
        setError(data.error || "Submission failed.");
      }
    } catch (err) {
      console.error("Error submitting solution:", err);
      setError("An error occurred while submitting your solution.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-teal-400 mb-4">Submit Solution</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900 p-6 rounded-lg shadow-lg"
      >
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-gray-800 text-gray-300 p-4 rounded-lg mb-4"
          placeholder="Enter your solution code here..."
          rows="6"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-lg font-semibold"
        >
          Submit
        </button>
      </form>

      {verdict && (verdict === "Wrong" || verdict==="Compilation Error") && (
        <p className="mt-4 text-2xl font-bold text-red-500">
          Verdict: {verdict}
        </p>
      )}

      {verdict === "Accepted" && (
        <p className="mt-4 text-2xl font-bold text-green-500">
          Verdict: {verdict}
        </p>
      )}

      {error && (
        <p className="mt-4 text-xl font-bold text-red-500">Error: {error}</p>
      )}
    </div>
  );
};

export default SubmitSolutionPage;
