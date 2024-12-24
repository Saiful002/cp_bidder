'use client';

import Link from 'next/link';
import { use } from 'react';

const ProblemsPage = ({ params }) => {
  const { contestId } = use(params);


  const problems = [
    { id: 1, title: 'Problem 1', difficulty: 'Easy' },
    { id: 2, title: 'Problem 2', difficulty: 'Medium' },
    { id: 3, title: 'Problem 3', difficulty: 'Hard' },
  ];

  const difficultyColors = {
    Easy: 'bg-green-600',
    Medium: 'bg-sky-500',
    Hard: 'bg-red-700',
  };

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
              className={`relative p-6 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ${difficultyColors[problem.difficulty]}`}
            >
              <h2 className="text-2xl font-bold mb-2 text-white">{problem.title}</h2>
              <p className="text-md font-medium text-white mb-2">
                <strong>Difficulty:</strong> {problem.difficulty}
              </p>
              <p className="text-sm text-gray-200 mb-4">
                Challenge yourself with this {problem.difficulty.toLowerCase()}-level problem and
                improve your skills.
              </p>
              <div className="absolute bottom-4 right-4">
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
