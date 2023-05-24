import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import Dataviz from '../nav/Dataviz';

const AgeBarChart = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/inseedata?id=${id}`);
      const responseData = await response.json();
      setData(responseData);
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <p>Chargement des données...</p>;
  }

  const ageData = [
    { age: '0-3', value: (data?.ind_0_3 / data?.pop_carr) * 100 || 0 },
    { age: '4-5', value: (data?.ind_4_5 / data?.pop_carr) * 100 || 0 },
    { age: '6-10', value: (data?.ind_6_10 / data?.pop_carr) * 100 || 0 },
    { age: '11-17', value: (data?.ind_11_17 / data?.pop_carr) * 100 || 0 },
    { age: '18-24', value: (data?.ind_18_24 / data?.pop_carr) * 100 || 0 },
    { age: '25-39', value: (data?.ind_25_39 / data?.pop_carr) * 100 || 0 },
    { age: '40-54', value: (data?.ind_40_54 / data?.pop_carr) * 100 || 0 },
    { age: '55-64', value: (data?.ind_55_64 / data?.pop_carr) * 100 || 0 },
    { age: '65-79', value: (data?.ind_65_79 / data?.pop_carr) * 100 || 0 },
    { age: '80+', value: (data?.ind_80p / data?.pop_carr) * 100 || 0 },
  ];

  return (
    <Dataviz
      title="Répartition par âge"
      description="Visualisation de la répartition de la population par tranche d'âge"
      visualization={
        <BarChart width={500} height={400} data={ageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          <Legend />
          <Bar dataKey="value" fill="rgba(218, 98, 125, 0.2)" stroke="rgba(218, 98, 125, 1)" />
        </BarChart>
      }
    />
  );
};

export default AgeBarChart;
