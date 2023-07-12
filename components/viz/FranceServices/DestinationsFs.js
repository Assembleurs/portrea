import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DestinationsFs = ({ code }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (code) {
      fetch(`/api/destinationusersfranceservices?code=${code}`)
        .then((res) => res.json())
        .then((responseData) => {
          if (Object.keys(responseData).length > 0) {
            const transformedData = Object.entries(responseData)
              .map(([name, count]) => ({ name, count }))
              .sort((a, b) => b.count - a.count) // tri par ordre décroissant
              .slice(0, 10); // ne conserve que les 10 premiers éléments
            setData(transformedData);
          }
        });
    }
  }, [code]);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart layout="vertical" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={300} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DestinationsFs;
