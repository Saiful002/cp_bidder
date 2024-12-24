const VotePage = ({ params }) => {
  const { contestId } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-teal-400 animate__animated animate__fadeInDown">
        Vote for Contest {contestId}
      </h1>
      
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <p className="text-lg text-gray-300 mb-6">
          Welcome to the voting page for Contest {contestId}. Here you can vote for your favorite problem!
        </p>

        {/* Voting Options */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-teal-400">Vote for a Problem</h3>
            <div className="space-x-4">
              <label className="inline-flex items-center text-gray-300">
                <input type="radio" name="problem" className="form-radio text-teal-500" />
                <span className="ml-2">Problem 1: Easy Challenge</span>
              </label>
              <label className="inline-flex items-center text-gray-300">
                <input type="radio" name="problem" className="form-radio text-teal-500" />
                <span className="ml-2">Problem 2: Medium Challenge</span>
              </label>
              <label className="inline-flex items-center text-gray-300">
                <input type="radio" name="problem" className="form-radio text-teal-500" />
                <span className="ml-2">Problem 3: Hard Challenge</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-teal-600 transition duration-300">
            Cast Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotePage;
