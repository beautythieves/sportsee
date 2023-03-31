import React, { useState, useEffect } from "react";
import { getUserPerformance } from "../../../dataManager/dataManager";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import { useParams } from "react-router-dom";

/**
 * French names for the different kinds of performance.
 * @type {{energy: string, cardio: string, intensity: string, speed: string, strength: string, endurance: string}}
 */
const kindNamesInFrench = {
  energy: "Énergie",
  cardio: "Cardio",
  intensity: "Intensité",
  speed: "Vitesse",
  strength: "Force",
  endurance: "Endurance",
};

/**
 * The desired order of the kinds for display on the chart.
 * @type {{intensity: number, speed: number, strength: number, endurance: number, energy: number, cardio: number}}
 */
const kindOrder = {
  intensity: 1,
  speed: 2,
  strength: 3,
  endurance: 4,
  energy: 5,
  cardio: 6,
};

/**
 * PerformanceChart component renders a radar chart showing the user's daily activity performance.
 * @returns {JSX.Element}
 */
function PerformanceChart() {
  const { userId } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    /**
     * Fetches user performance data and updates the state.
     * @async
     */
    async function fetchData() {
      const userPerformanceData = await getUserPerformance(userId);
      console.log(userPerformanceData);
      const updatedData = userPerformanceData.data.map((item) => ({
        ...item,
        name: kindNamesInFrench[userPerformanceData.kind[item.kind]],
      })).sort((a, b) => kindOrder[userPerformanceData.kind[a.kind]] - kindOrder[userPerformanceData.kind[b.kind]]);

      setData(updatedData);
    }

    fetchData();
  }, [userId]);

  return (
    <div className="radar-chart-container">
      <RadarChart cx={300} cy={250} outerRadius={200} width={600} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <Radar name="Performance" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </div>
  );
}

export default PerformanceChart;
