import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserMainData } from "../../../dataManager/dataManager";
import { PieChart, Pie, Cell, Label } from "recharts";

/**
 * UserPieChart - A React component that displays a pie chart representing a user's score.
 * @component
 */
// Define a new React component called UserPieChart
function UserPieChart() {
  // Get the userId parameter from the URL using the useParams hook
  const { userId } = useParams();
  // Declare two state variables: user and error
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  // Use the useEffect hook to fetch data when the component mounts or when userId changes
  useEffect(() => {
    // Define an async function to fetch data
    async function fetchData() {
      try {
        // Call the getUserMainData function with the userId parameter to get the user's main data
        const data = await getUserMainData(userId);
        // Filter the data to find the user with matching id
        const userData = data.find((u) => u.id === parseInt(userId));
        // Update the user state variable with the found user data
        setUser(userData);
      } catch (err) {
        // If there is an error fetching the data, set the error state variable to true
        console.log(err);
        setError(true);
      }
    }
    // Call the fetchData function to fetch the data
    fetchData();
  }, [userId]);

  // If there is an error fetching data, return an error message
  if (error) {
    return <div>Error: Failed to load user data.</div>;
  }

  // If user data is not yet loaded, return a loading message
  if (!user) {
    return <div>Loading...</div>;
  }

  // Extract the todayScore property from the user data
  const { todayScore } = user;

  // Define an array of data for the pie chart
  const data = [
    { name: "Score", value: todayScore },
    { name: "Reste", value: 1 - todayScore },
  ];

  // Define an array of colors for the pie chart wedges
  const COLORS = ["#0088FE", "#FFBB28"];

  // Render the pie chart
  return (
    <div style={{ width: "100%", height: 300 }}>
      <PieChart width={300} height={300}>
        {/* Add a text label to the center of the pie chart */}
        <text
          x={50}
          y={50}
          fill="#8884d8"
          style={{ fontSize: 15, fontWeight: "bold" }}
        >
          Score
        </text>

        {/* Define the Pie element with the specified props */}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {/* For each item in the data array, add a corresponding Cell element using the COLORS array */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {/* Add a Label to the center of the pie chart with the todayScore percentage */}
          <Label
            value={`${Math.round(todayScore * 100)}%\n de votre\n objectif`}
            position="center"
            fill="#282D30"
            fontSize={20}
            fontWeight="bold"
            lineHeight={1.2}
            textAnchor="middle"
          />
        </Pie>
      </PieChart>
    </div>
  );
}

// Export the UserPieChart component as default
export default UserPieChart;
