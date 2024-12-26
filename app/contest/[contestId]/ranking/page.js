"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const RankingPage = () => {
  const params = useParams();
  const [contestId, setContestId] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contestData, setContestData] = useState(null);

  useEffect(() => {
    if (params?.contestId) {
      setContestId(params.contestId); // Dynamically resolve contestId from params.
    }
  }, [params]);

  useEffect(() => {
    if (contestId) {
      // Fetch rankings for the contest
      const fetchRankings = async () => {
        setLoading(true);
        try {
          // Fetch rankings data from the API
          const rankingResponse = await fetch(
            `http://localhost:4000/rankings/${contestId}`
          );
          const rankingData = await rankingResponse.json();
          setRankings(rankingData.rankings);

          // For each user in rankings, fetch their details (name) from the user info API
          const userInfoPromises = rankingData.rankings.map(async (rank) => {
            const userInfoResponse = await fetch(
              `http://localhost:4000/getUserInfo/${rank.user_id}`
            );
            const userInfoData = await userInfoResponse.json();
            return {
              ...rank,
              user_name: userInfoData.full_name, // Assuming the response includes 'full_name'
            };
          });

          const allUserDetails = await Promise.all(userInfoPromises);
          setUserDetails(allUserDetails);
        } catch (error) {
          console.error("Error fetching rankings or user info:", error);
        } finally {
          setLoading(false);
        }
      };

      const fetchContest = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/getContestById?contest_id=${contestId}`
          );
          if (!response.ok) {
            throw new Error("Contest not found");
          }
          const data = await response.json();
          setContestData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchContest();
      fetchRankings();
    }
  }, [contestId]);

  console.log(contestData);

  if (loading) {
    return <div className="text-center text-red-500 font-bold">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-400 mb-8 animate__animated animate__fadeInDown text-center">
        Rankings for {contestData?.name}
      </h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 py-2">Rank</th>
            <th className="border-b-2 py-2">User</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user, index) => (
            <tr key={index}>
              <td className="border-b py-2">{index + 1}</td>
              <td className="border-b py-2">{user.user_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingPage;
