const TeamsPage = ({ params }) => {
  const { contestId } = params;
  const teams = [
    { name: 'Team A', members: ['Alice', 'Bob'] },
    { name: 'Team B', members: ['Charlie', 'Dave'] },
    { name: 'Team C', members: ['Eve', 'Frank'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-teal-400 animate__animated animate__fadeInDown">
        Teams for Contest {contestId}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teams.map((team, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-teal-400 mb-2">{team.name}</h2>
            <p className="text-gray-300">Members: {team.members.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
