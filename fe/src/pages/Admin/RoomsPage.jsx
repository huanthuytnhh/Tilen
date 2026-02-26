import React from "react";
import { motion } from "framer-motion";
import { Users, Activity, AlertTriangle, Settings } from "lucide-react";

import Header from "@/components/common_components/Header";
import StatCards from "@/components/common_components/StatCards";
import RoomTable from "@/components/rooms/RoomTable"; // Assume this is a table displaying room details
import ActiveRoomsChart from "@/components/rooms/ActiveRoomsChart"; // Assume this is a chart for room activity
import PlayerDistributionChart from "@/components/rooms/PlayerDistributionChart"; // Assume this is a chart for player distribution

const RoomsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-white">
      <Header title="Rooms" />

      {/* STAT DATA */}
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCards
            name="Total Rooms"
            icon={Users}
            value="125"
            color="#6366f1"
          />
          <StatCards
            name="Active Rooms"
            icon={Activity}
            value="37"
            color="#10b981"
          />
          <StatCards
            name="Inactive Rooms"
            icon={AlertTriangle}
            value="12"
            color="#f59e0b"
          />
          <StatCards
            name="Max Players"
            icon={Settings}
            value="300"
            color="#ef4444"
          />
        </motion.div>

        {/* ROOM TABLE */}
        <RoomTable />

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ActiveRoomsChart />
          <PlayerDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default RoomsPage;
