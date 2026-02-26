import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const ActiveRoomData = [
  { time: "12 AM", ActiveRooms: 50 },
  { time: "1 AM", ActiveRooms: 40 },
  { time: "2 AM", ActiveRooms: 35 },
  { time: "3 AM", ActiveRooms: 30 },
  { time: "4 AM", ActiveRooms: 25 },
  { time: "5 AM", ActiveRooms: 20 },
  { time: "6 AM", ActiveRooms: 15 },
  { time: "7 AM", ActiveRooms: 10 },
  { time: "8 AM", ActiveRooms: 20 },
  { time: "9 AM", ActiveRooms: 30 },
  { time: "10 AM", ActiveRooms: 45 },
  { time: "11 AM", ActiveRooms: 55 },
];

const ActiveRoomChart = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl p-5 border border-gray-700"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Active Rooms</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ActiveRoomData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 45, 55, 0.8)",
                borderColor: "4b5563",
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Line
              type="monotone"
              dataKey="ActiveRooms"
              stroke="#f59e0b"
              strokeWidth={2}
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ActiveRoomChart;
