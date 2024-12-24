'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const RankingPage = () => {
  const params = useParams(); // Always use hooks like this inside components.

  const [contestId, setContestId] = useState(null);

  useEffect(() => {
    if (params?.contestId) {
      setContestId(params.contestId); // Dynamically resolve contestId from params.
    }
  }, [params]);

  if (!contestId) {
    return <div className="text-center text-red-500 font-bold">Loading...</div>; // Handle undefined contestId gracefully.
  }

  const rankings = [
    { rank: 1, user: 'Alice', points: 100 },
    { rank: 2, user: 'Bob', points: 80 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 mb-8 animate__animated animate__fadeInDown text-center">Rankings for Contest {contestId}</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 py-2">Rank</th>
            <th className="border-b-2 py-2">User</th>
            <th className="border-b-2 py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((rank, index) => (
            <tr key={index}>
              <td className="border-b py-2">{rank.rank}</td>
              <td className="border-b py-2">{rank.user}</td>
              <td className="border-b py-2">{rank.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingPage;
