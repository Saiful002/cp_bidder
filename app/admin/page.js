"use client"
import { useState } from 'react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('allUsers');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'allUsers':
        return <p className="text-gray-700">Displaying all users.</p>;
      case 'allContests':
        return <p className="text-gray-700">Displaying all contests.</p>;
      case 'allProblems':
        return <p className="text-gray-700">Displaying all problems.</p>;
      case 'addContest':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Add Contest</h2>
            <form>
              <div className="mb-4">
                <label className="block text-black mb-2 font-medium">Contest Name</label>
                <input
                  type="text"
                  className="border-black text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter contest name"
                />
              </div>
              <div className="mb-4 text-black ">
                <label className="block mb-2 font-medium">Date</label>
                <input
                  type="date"
                  className="border-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Add Contest
              </button>
            </form>
          </div>
        );
      case 'addProblems':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Add Problem</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Problem Title</label>
                <input
                  type="text"
                  className="border text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter problem title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Difficulty</label>
                <select className="border text-black rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Add Problem
              </button>
            </form>
          </div>
        );
      case 'formTeams':
        return <p className="text-gray-700">Forming teams functionality here.</p>;
      default:
        return <p className="text-gray-700">Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 via-white to-indigo-50">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-10 p-2 bg-indigo-600 text-white rounded shadow-lg hover:bg-indigo-700"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-10 inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 w-64 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg`}
      >
        <div className="p-6 border-b border-indigo-400">
          <h1 className="text-xl font-bold text-center">Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { id: 'allUsers', label: 'All Users' },
              { id: 'allContests', label: 'All Contests' },
              { id: 'allProblems', label: 'All Problems' },
              { id: 'addContest', label: 'Add Contest' },
              { id: 'addProblems', label: 'Add Problems' },
              { id: 'formTeams', label: 'Form Teams' },
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false); // Close sidebar on mobile after selection
                  }}
                  className={`w-full text-left px-4 py-2 rounded font-medium hover:bg-indigo-400 ${
                    activeTab === tab.id ? 'bg-indigo-400' : ''
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded shadow-lg border border-indigo-100">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
