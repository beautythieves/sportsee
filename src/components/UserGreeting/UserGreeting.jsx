import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserMainData } from '../../dataManager/dataManager';
import './UserGreeting.css';

function UserGreeting() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserMainData();
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
    return <div className="error">Error: Failed to load user data.</div>;
  }

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <h1 className="hello">Bonjour {user.userInfos.firstName}!</h1>
    </div>
  );
}

export default UserGreeting;
