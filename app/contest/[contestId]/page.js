'use client'; // Required for using hooks like useParams in the app directory
import Timer from '@/components/Timer';
import { use } from 'react';
import Link from 'next/link';

const SingleContestPage = ({params}) => {
  const { contestId } = use(params);
  
    // Mock contest data
    const contests = [
      { id: 1, date: '2024-12-30T10:00:00Z' },
      { id: 2, date: '2024-12-23T15:00:00Z' },
    ];
  
    const contest = contests.find((contest) => contest.id === parseInt(contestId));
  
    if (!contest) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-red-500 font-bold text-2xl">
          Contest not found!
        </div>
      );
    }
  
    const startTime = new Date(contest.date).getTime();
    const isContestStarted = startTime <= new Date().getTime(); // Extract contestId

  return (
<>
{!isContestStarted ? (
  <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6">
    <h2 className="text-3xl sm:text-4xl font-semibold text-teal-400 mb-6 animate__animated animate__fadeIn animate__delay-1s">
      The contest has not started yet.
    </h2>
    <div className="text-lg sm:text-xl font-medium text-gray-300 mb-6 animate__animated animate__fadeIn animate__delay-1s">
      <p className="mb-4">The contest will start soon. Get ready!</p>
      <Timer startTime={startTime} />
    </div>
    <Link href={"../../contest"} className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-teal-600 transition duration-300">
      <p>Stay tuned for the contest start!</p>
    </Link>
  </div>
) : (
  <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 flex flex-col items-center justify-center overflow-hidden">

{/* Page Header */}
<div className="text-center mb-6 px-4">
  <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 animate__animated animate__fadeInDown mb-4">
    Contest {contestId}
  </h1>
  <p className="text-lg sm:text-xl text-gray-300 animate__animated animate__fadeIn animate__delay-1s">
    Welcome to Contest {contestId}. Explore the challenges and put your skills to the test!
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
