"use client";
import { useState, use } from "react";

const SubmitSolutionPage = ({ params }) => {
  const { contestId, problemId } = use(params);
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    if (code.trim() === "") {
      alert("Please write some code before submitting!");
      return;
    }
    // Handle the code submission logic (e.g., API call)
    alert(
      `Solution submitted for Problem ${problemId} of Contest ${contestId}!`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 mb-8 animate__animated animate__fadeInDown">
        Submit Solution for Problem {problemId}
      </h1>

      <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Write Your Code</h2>
        <textarea
          className="w-full h-64 p-4 bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Write your code here"
        />
      </div>

      <button
        className="bg-teal-500 text-white px-6 py-3 rounded-full mt-8 text-lg font-semibold shadow-lg hover:bg-teal-600 transition duration-300"
        onClick={handleSubmit}
      >
        Submit Code
      </button>
    </div>
  );
};

export default SubmitSolutionPage;
