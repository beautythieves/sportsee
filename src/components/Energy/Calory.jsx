import React, { useState, useEffect } from "react";
import { getUserMainData } from "../../dataManager/dataManager";
import { useParams } from "react-router-dom";
import Calory from "./Calory.png";
import "./Calory.css";

/**
 * UserCalories component displays the user's calorie count.
 * @returns {JSX.Element}
 */
function UserCalories() {
  // Get the userId from URL parameters
  const { userId } = useParams();
  
  // Initialize state variables for user data and error status
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  // Fetch user data when the component mounts or when userId changes
  useEffect(() => {
    /**
     * Fetches user data and updates the state.
     * @async
     */
    async function fetchData() {
      try {
        // Get user main data from the data manager
        const data = await getUserMainData(userId);
        
        // Find the user with the matching userId
        const userData = data.find((u) => u.id === parseInt(userId));
        
        // Update the user state with the found user data
        setUser(userData);
      } catch (err) {
        // If there's an error fetching data, set the error state to true
        console.log(err);
        setError(true);
      }
    }
    
    // Call fetchData to fetch user data
    fetchData();
  }, [userId]);

  // If there's an error, display an error message
  if (error) {
    return <div>Error: Failed to load user data.</div>;
  }

  // If user data is not yet loaded, display a loading message
  if (!user) {
    return <div>Loading...</div>;
  }

  // Extract calorieCount from the user's keyData
  const { calorieCount } = user.keyData;
  
  // Convert calorieCount to kilocalories
  const kcalCount = calorieCount / 1000;

  // Render the calorie count information
  return (
    <div className="Calory_Container">
      <div className="Calory_Button">
        <img src={Calory} alt="Calorie icon" />
      </div>
      <div className="Calory_Number">
        {kcalCount} Kcal
        <br />
        Calories
      </div>
    </div>
  );
}

export default UserCalories;
