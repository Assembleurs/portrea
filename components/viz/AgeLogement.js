import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import Dataviz from '../nav/Dataviz';

const AgeLogement = ({ id }) => {
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

  const ageData = [
    {
      name: '',
      'Avant 1945': data?.log_av45 || 0,
      '1945-1970': data?.log_45_70 || 0,
      '1970-1990': data?.log_70_90 || 0,
      'Après 1990': data?.log_ap_90 || 0,
      'Inconnu': data?.log_inc || 0,
    },
  ];

  return (
    <Dataviz
      title="Âge des logements"
      description="Visualisation de la répartition des logements par période de construction"
      visualization={
        <div>
          <BarChart width={500} height={300} data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Avant 1945" fill="#7F5539" />
            <Bar dataKey="1945-1970" fill="#B08968" />
            <Bar dataKey="1970-1990" fill="#DDB892" />
            <Bar dataKey="Après 1990" fill="#E6CCB2" />
            <Bar dataKey="Inconnu" fill="#d4d4d4" />
          </BarChart>
        </div>
      }
    />
  );
};

export default AgeLogement;
