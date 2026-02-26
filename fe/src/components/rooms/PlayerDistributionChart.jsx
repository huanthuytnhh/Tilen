import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const PlayerDistributionData = [
  { category: "Beginner", Players: 120 },
  { category: "Intermediate", Players: 250 },
  { category: "Advanced", Players: 180 },
  { category: "Expert", Players: 90 },
  { category: "Casual", Players: 300 },
  { category: "Competitive", Players: 200 },
];

const PlayerDistributionChart = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-700"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Player Distribution
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PlayerDistributionData} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="category" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 45, 55, 0.8)",
                borderColor: "#4b5563",
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Bar dataKey="Players" fill="#3b82f6" radius={[10, 10, 0, 0]} />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PlayerDistributionChart;
