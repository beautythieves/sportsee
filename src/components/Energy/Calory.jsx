import React, { useState, useEffect } from "react";
import { getUserMainData } from "../../dataManager/dataManager";
import { useParams } from "react-router-dom";
import Calory from "./Calory.png";
import "./Calory.css";

function UserCalories() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserMainData(userId);
        console.log("Fetched user data for UserCalories:", userData);
        setUser(userData);
      } catch (err) {
        console.log("Error fetching user data for UserCalories:", err);
        setError(true);
      }
    }
    

    fetchData();
  }, [userId]);

  if (error) {
    return <div>Error: Failed to load user data calory.</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { calorieCount } = user.keyData;
  const kcalCount = calorieCount / 1000;

  return (
    <div className="Calory_Container" >
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
