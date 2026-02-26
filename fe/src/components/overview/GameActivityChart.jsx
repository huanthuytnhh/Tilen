import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GameActivityChart = () => {
  const activityData = [
    { name: "Room Created", value: 10 },
    { name: "Games Started", value: 5 },
    { name: "Purchases Made", value: 8 },
    { name: "New Registrations", value: 12 },
  ];

  return (
    <div className=" rounded-xl shadow-md p-5 border ">
      <h3 className="text-lg text-black mb-4">Recent Activity Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={activityData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(31, 41, 55, 0.8)",
              borderColor: "#4b5563",
            }}
          />
          <Bar dataKey="value" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GameActivityChart;
