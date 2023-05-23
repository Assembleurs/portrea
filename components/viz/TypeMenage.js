import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import Dataviz from '../nav/Dataviz';

const TypeMenage = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/inseedata?id=${id}`);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <p>Chargement des données...</p>;
  }

  const menageData = [
    {
      name: '',
      '1 personne': ((data.men_1ind / data.men) * 100).toFixed(1),
      '5 personnes ou +': ((data.men_5ind / data.men) * 100).toFixed(1),
      'Monoparentaux': ((data.men_fmp / data.men) * 100).toFixed(1),
    },
  ];

  return (
    <Dataviz
      title="Type de Ménages"
      description="Visualisation de la répartition des types de ménages"
      visualization={
        <div>
          <BarChart width={500} height={300} data={menageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="1 personne" fill="#98C1D9" />
            <Bar dataKey="5 personnes ou +" fill="#293241" />
            <Bar dataKey="Monoparentaux" fill="#EE6C4D" />
          </BarChart>
        </div>
      }
    />
  );
};

export default TypeMenage;
