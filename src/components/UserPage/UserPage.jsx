import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserMainData } from "../../dataManager/dataManager";

import UserGreeting from "../UserGreeting/UserGreeting";
import UserPieChart from "../Charts/ScoreChart/ScoreChart";
import CalorieCount from "../Energy/Calory";
import Proteins from "../Energy/Protein";
import PerformanceChart from "../Charts/PerformanceChart/PerformanceChart";

/**
 * UserPage component displays a user's dashboard, including greeting, charts, and nutritional information.
 * @returns {JSX.Element}
 */
function UserPage() {
  // Extract userId from the URL using useParams
  const { userId } = useParams();
  
  // Initialize state variable for user data
  const [userData, setUserData] = useState(null);

  // Fetch user data when the component mounts or when userId changes
  useEffect(() => {
    /**
     * Fetches user data and updates the state.
     * @async
     */
    async function fetchData() {
      // Get user main data from the data manager
      const data = await getUserMainData(userId);
      
      // Update the userData state with the fetched data
      setUserData(data);
    }
    
    // Call fetchData to fetch user data
    fetchData();
  }, [userId]);

  // If user data is not yet loaded, display a loading message
  if (!userData) {
    return <div>Loading...</div>;
  }

  // Render the user's dashboard components
  return (
    <div className="UserContainer" style={{ marginLeft: "200px" }}>
      <UserGreeting userId={userId} />
      <PerformanceChart></PerformanceChart>
      <UserPieChart></UserPieChart>
      <CalorieCount></CalorieCount>
      <Proteins></Proteins>
    </div>
  );
}

export default UserPage;
