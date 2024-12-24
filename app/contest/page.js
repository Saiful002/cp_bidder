import Link from "next/link";

const ContestPage = () => {
  const contests = [
    { id: 1, name: "Contest 1", date: "2024-12-30T10:00:00Z", status: "Upcoming" },
    { id: 2, name: "Contest 2", date: "2024-12-23T15:00:00Z", status: "Ongoing" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      {/* Page Header */}
      <div className="py-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Contests</h1>
        <p className="text-gray-300 text-lg">
          Browse through the upcoming and ongoing contests. Join and showcase your skills!
        </p>
      </div>

      {/* Contest Cards */}
      <div className="container mx-auto px-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="bg-gradient-to-br from-cyan-700 to-cyan-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-2">{contest.name}</h2>
            <p className="text-gray-200 mb-2">
              <strong>Date:</strong> {new Date(contest.date).toLocaleString()}
            </p>
            
            <strong>Status: <p className={`mb-4 ${contest.status === "Upcoming" ? "text-yellow-500" : "text-lime-400"}`}>{contest.status}</p></strong> 

            <Link
              href={`/contest/${contest.id}`}
              className="inline-block bg-teal-800 text-white py-2 px-4 rounded-md hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300"
            >
              View Contest
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestPage;
