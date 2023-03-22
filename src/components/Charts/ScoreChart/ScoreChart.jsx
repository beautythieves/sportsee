import { PieChart, Pie, Cell, Legend } from 'recharts';
import React, {useEffect} from 'react';
import { getUserMainData } from '../../../dataManager/dataManager';
/* create a variable to store the data from the API */
const ScoreChart = () => {

    useEffect(() => {
      const fetchData = async () => {
        const userId = 18;
        const rawdata = await getUserMainData(userId);

        console.log(rawdata);
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h2>Score Chart</h2>
      </div>
    );
  };
  
  export default ScoreChart;