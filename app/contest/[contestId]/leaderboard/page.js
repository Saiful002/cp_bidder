const LeaderboardPage = ({ params }) => {
    const { contestId } = params;
    
    // Mock leaderboard data
    const leaderboard = [
      { rank: 1, name: 'Alice', score: 95 },
      { rank: 2, name: 'Bob', score: 92 },
      { rank: 3, name: 'Charlie', score: 89 },
      { rank: 4, name: 'Dave', score: 85 },
      { rank: 5, name: 'Eve', score: 80 },
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-teal-400 animate__animated animate__fadeInDown">
          Leaderboard for Contest {contestId}
        </h1>
  
        <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <table className="w-full table-auto text-center text-gray-300">
            <thead className="border-b-2 border-teal-500">
              <tr>
                <th className="py-3 px-6 text-lg">Rank</th>
                <th className="py-3 px-6 text-lg">Name</th>
                <th className="py-3 px-6 text-lg">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="hover:bg-gray-700 transition duration-200">
                  <td className="py-4">{entry.rank}</td>
                  <td className="py-4">{entry.name}</td>
                  <td className="py-4">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default LeaderboardPage;
  