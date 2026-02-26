import React from "react";
import Header from "@/components/common_components/Header";
import StatCards from "@/components/common_components/StatCards";
import GameActivityChart from "@/components/overview/GameActivityChart"; // Create a new component for recent activities
import GameMetricsChart from "@/components/overview/GameMetricsChart"; // Adjust this to show metrics relevant to your game

import { motion } from "framer-motion";
import { BarChart2, Users, Zap, Activity } from "lucide-react"; // Include Activity icon for recent activity

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-white">
      <Header title="Overview" />

      {/* STAT DATA */}
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCards
            name="Total Active Players"
            icon={Users}
            value="4,500" // Example value, you can dynamically fetch this
            color="#6366f1"
          />
          <StatCards
            name="Games Played"
            icon={BarChart2}
            value="12,000" // Example value, you can dynamically fetch this
            color="#8b5cf6"
          />
          <StatCards
            name="New Registrations"
            icon={Zap}
            value="1,200" // Example value, you can dynamically fetch this
            color="#ec4899"
          />
          <StatCards
            name="Revenue"
            icon={Zap}
            value="$13,459" // Example value, you can dynamically fetch this
            color="#10b981"
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Adjust these charts to reflect the game's data */}
          <GameMetricsChart />
          <GameActivityChart />
          {/* New chart to show recent activity, like room creation, games started, etc. */}
        </div>

        {/* Recent Activity Logs */}
        <div className="bg-gray-800 rounded-xl shadow-md p-5 mt-5">
          <h3 className="text-xl text-gray-100 mb-4">Recent Activity</h3>
          <ul className="text-gray-300">
            <li>Player JohnDoe started a new game room.</li>
            <li>Player JaneSmith made an in-app purchase of $15.</li>
            <li>New user Mark123 registered today.</li>
            <li>Game room #1001 is now active with 4 players.</li>
            {/* Add dynamically generated recent activity logs here */}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
