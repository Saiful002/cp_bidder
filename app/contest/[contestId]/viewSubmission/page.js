const ViewSubmissionPage = ({ params }) => {
    const { contestId, submissionId } = params;
  
    // Mock submission data
    const submission = {
      problem: 'Problem 1: Easy Challenge',
      submittedBy: 'Alice',
      score: 95,
      time: '2024-12-24 14:35:00',
      status: 'Accepted',
      solutionLink: 'https://example.com/solution-link',
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-teal-400 animate__animated animate__fadeInDown">
          Submission Details for Contest {contestId}
        </h1>
  
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">Submission #{submissionId}</h2>
  
          <div className="space-y-4 text-gray-300">
            <div>
              <strong>Problem:</strong> {submission.problem}
            </div>
            <div>
              <strong>Submitted by:</strong> {submission.submittedBy}
            </div>
            <div>
              <strong>Score:</strong> {submission.score} / 100
            </div>
            <div>
              <strong>Submission Time:</strong> {submission.time}
            </div>
            <div>
              <strong>Status:</strong> <span className="text-green-500">{submission.status}</span>
            </div>
            <div className="mt-6 flex justify-center">
              <a
                href={submission.solutionLink}
                className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-teal-600 transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Solution
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ViewSubmissionPage;
  