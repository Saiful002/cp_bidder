"use client";
import React, { useState,use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage({ params }) {
  const router = useRouter();
  const { contestId } = use(params); // Extract contestId from the URL params
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRegister = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // Get user object from localStorage
    const userId = user?.userId; // Extract userId

    if (!userId) {
      setMessage("User not logged in. Please log in to register.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:9090/registerContest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contestId,
          userId,
        }),
      });

      

      if (response.ok) {
        const result = await response.json();
        setMessage(
          result.message || "Successfully registered for the contest!"
        );
        // Redirect or perform additional actions if needed
        router.push(`/contest/${contestId}`);
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to register for the contest.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setMessage("An error occurred while trying to register.");
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

      <Link
        href={`/contest/${contestId}`}
        className="mt-6 text-rose-600 hover:underline"
      >
        Go back to contest page
      </Link>
    </div>
  );
}
