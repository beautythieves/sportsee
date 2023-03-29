import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserMainData } from "../../dataManager/dataManager";
import "./UserGreeting.css";

function UserGreeting() {
  const { userId } = useParams(); /* extract userId from the url */
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserMainData();
        const userData = data.find((u) => u.id === parseInt(userId, 10));
        console.log(userData);
        setUser(userData);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    fetchData();
  }, [userId]);

  if (error) {
    return <div className="error">Error: Failed to load user data.</div>;
  }

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <h1 className="hello">
        Bonjour <span className="firstName">{user.userInfos.firstName}</span>
      </h1>
      <h2> Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
    </div>
  );
}

export default UserGreeting;
