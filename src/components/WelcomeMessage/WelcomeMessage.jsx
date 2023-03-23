import React from 'react';
/* create a function component called WelcomeMessage  in order to display the firstname*/
import { useState, useEffect } from 'react';
import { getUserMainData } from '../../dataManager/dataManager';

function WelcomeMessage({ userId }) {
  const [userMainData, setUserMainData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserMainData(userId);
      setUserMainData(data);
    }
    fetchData();
  }, [userId]);

  if (!userMainData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello {userMainData.firstName}</h1>
    </div>
  );
}

export default WelcomeMessage;
