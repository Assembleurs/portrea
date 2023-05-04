import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const AgeBarChart = ({ structure }) => {
  const total = Object.keys(structure.properties)
  .filter((key) => /^ind_(?!snv)/.test(key))
    .reduce((acc, key) => acc + structure.properties[key], 0);

  const data = [
    { age: '0-3', value: (structure.properties.ind_0_3 / total) * 100 },
    { age: '4-5', value: (structure.properties.ind_4_5 / total) * 100 },
    { age: '6-10', value: (structure.properties.ind_6_10 / total) * 100 },
    { age: '11-17', value: (structure.properties.ind_11_17 / total) * 100 },
    { age: '18-24', value: (structure.properties.ind_18_24 / total) * 100 },
    { age: '25-39', value: (structure.properties.ind_25_39 / total) * 100 },
    { age: '40-54', value: (structure.properties.ind_40_54 / total) * 100 },
    { age: '55-64', value: (structure.properties.ind_55_64 / total) * 100 },
    { age: '65-79', value: (structure.properties.ind_65_79 / total) * 100 },
    { age: '80+', value: (structure.properties.ind_80p / total) * 100 },
  ];

  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="age" />
      <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
      <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
      <Legend />
      <Bar dataKey="value" fill="rgba(218, 98, 125, 0.2)" stroke="rgba(218, 98, 125, 1)" />
    </BarChart>
  );
};

export default AgeBarChart;
