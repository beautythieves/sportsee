import React, { useState, useEffect } from "react";
import { getUserActivity } from "../../../dataManager/dataManager";
import { useParams } from "react-router-dom";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

/**
 * DailyActivityChart component displays a bar chart showing daily activity for a user.
 * @returns {JSX.Element}
 */
function DailyActivityChart() {
  // Extract userId from the URL using useParams
  const { userId } = useParams();

  // Initialize state variables for user activity and error status
  const [userActivity, setUserActivity] = useState(null);
  const [error, setError] = useState(false);

  // Fetch user activity data when the component mounts or when userId changes
  useEffect(() => {
    /**
     * Fetches user activity data and updates the state.
     * @async
     */
    async function fetchData() {
      try {
        // Get user activity data from the data manager
        const chartData = await getUserActivity(userId);

        // Update the userActivity state with the fetched data
        setUserActivity(chartData);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }

    // Call fetchData to fetch user activity data
    fetchData();
  }, [userId]);

  // If there was an error while fetching data, display an error message
  if (error) {
    return <div>Error: Failed to load user data for activity chart.</div>;
  }

  // If user activity data is not yet loaded, display a loading message
  if (!userActivity) {
    return <div>Loading...</div>;
  }

  // Render the user's activity chart
  return (
    <div className="Daily">
      <h3>Activité quotidienne</h3>
      <BarChart width={835} height={320} data={userActivity}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="calories" fill="#8884d8" />
        <Bar dataKey="kilograms" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default DailyActivityChart;
