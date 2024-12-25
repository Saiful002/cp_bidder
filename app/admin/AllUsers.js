"use client";
import React, { useEffect, useState } from "react";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:9090/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <div className="p-8 rounded-lg shadow-lg bg-gray-800 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">All Users</h1>
        {loading && <p className="text-center">Loading users...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && (
          <table className="table-auto w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-4 py-2">ID</th>
                <th className="border border-gray-600 px-4 py-2">Full Name</th>
                <th className="border border-gray-600 px-4 py-2">Handle</th>
                <th className="border border-gray-600 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-600">
                  <td className="border border-gray-600 px-4 py-2 text-center">
                    {user.id}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {user.full_name}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {user.handle}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {user.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
