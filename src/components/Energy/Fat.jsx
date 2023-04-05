/* create carbohydrate compoenent*/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserMainData } from "../../dataManager/dataManager";
import Carbo from "./fat-icon.png";
import "./Calory.css";

function Fat () {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserMainData(userId);
        setUser(userData);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }

    fetchData();
  }, [userId]);

  if (error) {
    return <div>Error: Failed to load user data carbohydrates.</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { lipidCount } = user.keyData;

  return (
    <div className="Calory_Container Fat">
      <div className="Calory_Button">
        <img src={Carbo} alt="Carbohydrate icon" />
      </div>
      <div className="Calory_Number">
        {lipidCount} g
        <br />
        Lipides
      </div>
    </div>
  );
}

export default Fat;