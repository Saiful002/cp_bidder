import Link from "next/link";

const SingleProblemPage = ({ params }) => {
  const { contestId, problemId } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 mb-8 animate__animated animate__fadeInDown">
        Problem {problemId} for Contest {contestId}
      </h1>

      <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Problem Description
        </h2>
        <p className="text-gray-300 mb-4">
          This is the detailed description of Problem {problemId}. You will need
          to solve the problem by writing a program that adheres to the
          specifications below:
        </p>
        <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-2">Input</h3>
        <p className="text-gray-300 mb-4">
          You are given an input consisting of an integer N followed by a list
          of integers. Your task is to process the input and output the result.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mb-2">Output</h3>
        <p className="text-gray-300 mb-4">
          Output a single integer that represents the result of the computation.
        </p>

        <h3 className="text-xl font-semibold text-gray-200 mb-2">
          Constraints
        </h3>
        <p className="text-gray-300 mb-4">1 ≤ N ≤ 1000</p>

        <h3 className="text-xl font-semibold text-gray-200 mb-2">Example</h3>
        <p className="text-gray-300 mb-4">
          Input: <br />
          5<br />1 2 3 4 5
        </p>
        <p className="text-gray-300 mb-4">
          Output: <br />
          15
        </p>
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
