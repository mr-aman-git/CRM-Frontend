import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

const PerformanceChart = ({ data }) => {
  // Demo data structure - Backend se aane wale counts ko map karein
  const chartData = [
    { name: "Int.", value: data?.interested || 0, color: "#10b981" },
    { name: "Foll.", value: data?.followups || 0, color: "#f59e0b" },
    { name: "Pend.", value: data?.pendingLeads || 0, color: "#3b82f6" },
    { name: "Clos.", value: data?.closedLeads || 0, color: "#6366f1" },
  ];

  return (
    <div className="h-40 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fontWeight: 800, fill: "#94a3b8" }}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              borderRadius: "15px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={30}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
