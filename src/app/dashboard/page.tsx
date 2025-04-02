"use client";

import { logout } from "@/futures/users/server/actions/VerificationAction";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div>
              <button onClick={() => logout()}>Logout</button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Welcome to your dashboard
          </h2>
          <p className="text-gray-600">Your dashboard 2content goes here.</p>

          {/* Quick Links */}
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-900 mb-2">
              Quick Links
            </h3>
          </div>
        </div>
      </main>
    </div>
  );
}
