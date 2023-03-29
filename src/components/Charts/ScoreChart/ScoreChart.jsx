import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserMainData } from '../../../dataManager/dataManager';
import { PieChart, Pie, Cell } from 'recharts';

function UserPieChart() {
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

  const { todayScore } = user;

  const data = [
    { name: 'Score', value: todayScore },
    { name: 'Reste', value: 1 - todayScore }
  ];

  const COLORS = ['#0088FE', '#FFBB28'];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <PieChart width={300} height={300}>
              <text x={0} y={20} fill="#8884d8" style={{ fontSize: 18, fontWeight: 'bold' }}>Score</text>

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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default UserPieChart;
