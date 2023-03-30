import React, { useState, useEffect } from "react";
import { getUserMainData } from "../../dataManager/dataManager";
import { useParams } from "react-router-dom";
import Protein from "./Protein.png";
import "./Calory.css";
function Proteins() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserMainData(userId);
        const userData = data.find((u) => u.id === parseInt(userId));
        setUser(userData);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    fetchData();
  }, [userId]);

  if (error) {
    return <div>Error: Failed to load user data.</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { proteinCount } = user.keyData;

  return (
    <div className="Calory_Container">
      <div className="Calory_Button">
        <img src={Protein} alt="icone de Calorie" />
      </div>
      <div className="Calory_Number">
      {proteinCount} g
      <br />
      Protéines
      </div>
    </div>
  );
}

export default Proteins;
