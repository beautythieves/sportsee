import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserMainData } from '../../dataManager/dataManager';
import UserGreeting from '../UserGreeting/UserGreeting';

function UserPage() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserMainData(userId);
      setUserData(data);
    }
    fetchData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserGreeting userId={userId} />
      {/* Afficher d'autres informations utilisateur ici */}
    </div>
  );
}

export default UserPage;

