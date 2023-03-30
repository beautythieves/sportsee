import React, { useState, useEffect } from "react";
import { getUserPerformance } from "../../../dataManager/dataManager";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";

function DailyActivityChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const performanceData = await getUserPerformance();
      setData(performanceData);
    }
    fetchData();
  }, []);

  return (
    <RadarChart cx={300} cy={250} outerRadius={200} width={600} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <Radar name="Performance" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  );
}

export default DailyActivityChart;
