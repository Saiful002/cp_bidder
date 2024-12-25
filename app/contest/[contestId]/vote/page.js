"use client";
import { use, useEffect, useState } from "react";
import { redirect } from "next/navigation";

const VotePage = ({params}) => {
  const { contestId } = use(params);
  const [problems, setProblems] = useState([]);
  const [round, setRound] = useState(1);
  const [voteData, setVoteData] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [voteTime, setVoteTime] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/getContestProblems?contest_id=${contestId}`
        );
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error("Error fetching contest problems:", error);
      }
    };

    if (contestId) {
      fetchProblems();
    }
  }, [contestId]);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/getContests?contest_id=${contestId}`
        );
        const data = await response.json();
        const startTime = new Date(data.start_time).toISOString();
        const currentTime = new Date();
        const curr = currentTime.toISOString();
        console.log("Start time:", startTime);
        console.log("Current time:", curr)

        if (startTime < curr) {
          setVoteTime(true);
        }
      } catch (error) {
        console.error("Error fetching contest data:", error);
      }
    };

    if (contestId) {
      fetchContestData();
    }
  }, [contestId]);

  if(!voteTime) {
    redirect(`/contest/${contestId}/problems`);
  }

  const getVotedProblems = () => {
    const votedProblems =
      JSON.parse(localStorage.getItem("votedProblems")) || [];
    return votedProblems;
  };

  const handleVote = async () => {
    if (!selectedProblem) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    if (!userId) {
      alert("You must be logged in to vote!");
      return;
    }

    const votePoints = problems.length - round + 1;

    const votePayload = {
      user_id: userId,
      problem_id: selectedProblem.id,
      contest_id: contestId,
      bid_count: votePoints,
    };

    try {
      const response = await fetch("http://localhost:9090/takeVote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(votePayload),
      });

      if (response.ok) {
        const votedProblems = getVotedProblems();
        votedProblems.push(selectedProblem.id);
        localStorage.setItem("votedProblems", JSON.stringify(votedProblems));

        setVoteData([...voteData, votePayload]);
        setRound(round + 1);
        setSelectedProblem(null);
      } else {
        alert("Error casting vote!");
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const handleProblemSelection = (problem) => {
    setSelectedProblem(problem);
  };

  const remainingProblems = problems.filter((problem) => {
    const votedProblems = getVotedProblems();
    if (votedProblems.length === problems.length) {
      redirect(`/contest/${contestId}/problems`);
    }
    return !votedProblems.includes(problem.id);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100 p-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-teal-400 animate__animated animate__fadeInDown">
        Vote for Contest {contestId}
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <p className="text-lg text-gray-300 mb-6">
          Welcome to the voting page for Contest {contestId}. Here you can vote
          for your favorite problem!
        </p>

        <p className="text-lg text-gray-300 mb-6">
          Round {round}: Choose your vote! You will have{" "}
          {remainingProblems.length} problems to choose from.
        </p>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-teal-400">
              Vote for a Problem
            </h3>
            {remainingProblems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingProblems.map((problem) => (
                  <div
                    key={problem.id}
                    onClick={() => handleProblemSelection(problem)}
                    className="cursor-pointer p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-colors"
                  >
                    <h4 className="text-xl font-semibold text-teal-300">
                      {problem.name}
                    </h4>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xl text-red-400">No problems left to vote!</p>
            )}
          </div>

          {selectedProblem && (
            <button
              onClick={handleVote}
              className="bg-teal-500 hover:bg-teal-600 text-white text-lg py-2 px-4 rounded-full"
            >
              Submit Vote
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotePage;
