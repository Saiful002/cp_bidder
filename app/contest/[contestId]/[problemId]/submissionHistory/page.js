"use client";
import { useState, useEffect, use } from "react";

const SubmissionHistoryPage = ({ params }) => {
  const { contestId, problemId } = use(params);
  const [submissions, setSubmissions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
    const userID = user?.userId;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/getSubmissionsByProblem?contest_id=${contestId}&problem_id=${problemId}&user_id=${userID}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }

        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, [contestId, problemId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 mb-8 animate__animated animate__fadeInDown">
        Submission History for Problem {problemId}
      </h1>

      {submissions.length === 0 ? (
        <p className="text-gray-300 text-lg animate__animated animate__fadeIn">
          No submissions found for this problem.
        </p>
      ) : (
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-teal-400 font-semibold">ID</th>
                <th className="px-4 py-3 text-teal-400 font-semibold">Code</th>
                <th className="px-4 py-3 text-teal-400 font-semibold">
                  Verdict
                </th>
                <th className="px-4 py-3 text-teal-400 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
                >
                  <td className="px-4 py-3">{submission.id}</td>
                  <td className="px-4 py-3 truncate max-w-sm">
                    <code className="bg-gray-900 px-2 py-1 rounded text-sm text-gray-200">
                      {submission.code.slice(0, 50)}...
                    </code>
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      submission.verdict === "Accepted"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {submission.verdict}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(submission.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistoryPage;
