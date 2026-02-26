import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

// Replace this data with your actual Tiến Lên admin metrics
const GameMetricsData = [
  { name: "Active Players", Value: 4500 },
  { name: "Games Played", Value: 12000 },
  { name: "In-App Purchases", Value: 3200 },
  { name: "Invitations Sent", Value: 7800 },
  { name: "Friends Added", Value: 5400 },
  { name: "Chat Messages", Value: 8900 },
];

const COLORS = [
  "#4CAF50",
  "#FF9800",
  "#F44336",
  "#2196F3",
  "#9C27B0",
  "#FFC107",
];

const GameMetricsChart = () => {
  return (
    <motion.div
      className=" bg-opacity-100 shadow-lg backdrop-blur-md rounded-xl p-5 lg:col-span-2 border "
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h2 className="text-lg font-medium mb-4 text-black">
        Tiến Lên Game Metrics
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={GameMetricsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4b5563",
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Legend />
            <Bar dataKey={"Value"} fill="#8884d8">
              {GameMetricsData.map((item, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GameMetricsChart;
