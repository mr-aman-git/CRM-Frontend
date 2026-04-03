import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const StatusDonut = ({ summary }) => {
  const data = [
    {
      name: "Interested",
      value: summary?.interested || 0,
      color: "#22c55e", // Pure Green
    },
    {
      name: "Follow Up",
      value: summary?.followUp || 0,
      color: "#f97316", // Bright Orange 
    },
    {
      name: "Close",
      value: summary?.closed || 0,
      color: "#06b6d4", // Cyan/Turquoise
    },
    {
      name: "Not Interested",
      value: summary?.notInterested || 0,
      color: "#f43f5e", // Rose/Pinkish-Red
    },
    {
      name: "Pending",
      value: summary?.pending || 0,
      color: "#eab308", // Bright Yellow
    },
    {
      name: "Leads",
      value: summary?.total || 0,
      color: "#1e293b", // Dark Charcoal 
    },
  ].filter((d) => d.value > 0);
  console.log("summary", summary);
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
      <h3 className="text-lg font-black text-gray-900 mb-2">
        Lead Status Distribution
      </h3>
      <p className="text-xs text-gray-400 mb-6 font-medium uppercase tracking-wider">
        Overall Pipeline Health
      </p>
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={110}
              paddingAngle={8}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatusDonut;
