"use client";
import React, { useState, useEffect, use } from "react";
import { useParams, redirect } from "next/navigation";
import Link from "next/link";

export default function RegisterPage({ params }) {
  const { contestId } = use(params); // Extract contestId from the URL params
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const checkRegistration = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // Get user object from localStorage
      const userId = user?.userId;

      if (!userId) {
        setMessage("User not logged in. Please log in to register.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:4000/checkRegistration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, contestId }),
          }
        );

        const result = await response.json();
        if (result.status === "error") {
          setMessage(result.message); // Show the registration error message
          window.location.href = `/contest/${contestId}/vote` // Redirect to the contest page
        }
      } catch (err) {
        console.error("Error checking registration:", err);
        setMessage("An error occurred while checking registration.");
      }
    };

    checkRegistration();
  }, [contestId]);

  const handleRegister = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // Get user object from localStorage
    const userId = user?.userId;

    if (!userId) {
      setMessage("User not logged in. Please log in to register.");
      return;
    }

    setLoading(true);
    setMessage(null);

    console.log(userId);
    console.log(contestId);

    try {
      const response = await fetch("http://localhost:4000/registerContest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          contest_id: contestId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(
          result.message || "Successfully registered for the contest!"
        );
        // Redirect to the voting page after successful registration
        window.location.href = `/contest/${contestId}/vote`;
        
      } else {
        // const error = await response.json();
        // setMessage(error.message || "Failed to register for the contest.");
        // redirect(`/contest/${contestId}/vote`);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setMessage(err.message);
      // redirect(`/contest/${contestId}/vote`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Register for Contest
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Are you sure you want to register for the contest? Click the button
        below to confirm.
      </p>

      {message && (
        <div
          className={`mb-4 p-4 rounded ${
            message.includes("Successfully")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <button
        onClick={handleRegister}
        disabled={loading}
        className={`bg-rose-600 hover:bg-rose-700 text-white py-3 px-8 rounded-lg shadow-md text-lg font-semibold transition-all duration-300 transform ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-2"
        }`}
      >
        {loading ? "Registering..." : "Register for Contest"}
      </button>

      <Link href={`/contest`} className="mt-6 text-rose-600 hover:underline">
        Go back to contest page
      </Link>
    </div>
  );
}
