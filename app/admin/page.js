"use client"
import { useEffect, useState } from 'react';
import AllUsers from './AllUsers';
import AddContest from './AddContest';
import AllContests from './AllContests';
import AddProblem from './AddProblem';
import AllProblems from './AllProblems';
import EditContest from './EditContest/page';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('allUsers');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Load the active tab from localStorage when the component mounts
useEffect(() => {
  const savedTab = localStorage.getItem("activeTab");
  if (savedTab) {
    setActiveTab(savedTab);
  }
}, []);

// Save the active tab to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem("activeTab", activeTab);
}, [activeTab]);


  const renderContent = () => {
    switch (activeTab) {
      case 'allUsers':
        return <AllUsers />;
      case 'allContests':
        return <AllContests />;
      case 'allProblems':
        return <AllProblems />
      case 'addContest':
        return <AddContest />
      case 'addProblems':
        return <AddProblem />;
      case 'editContest':
        return <EditContest />;
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
