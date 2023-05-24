import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CompareDataviz from '../nav/CompareDataviz';

const CompareMenPauv = ({ postalCode }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/inseedata-postal?code_postal=${postalCode}`);
      const responseData = await response.json();
      setData(responseData);
    };

    fetchData();
  }, [postalCode]);

  if (!data || data.length === 0) {
    return <p>Aucune donnée disponible pour le code postal {postalCode}.</p>;
  }

  const barChartData = data.map(item => ({
    name: item.properties.nom,
    MenagesPauvres: Math.round((item.inseeData.men_pauv / item.inseeData.men) * 100 * 10) / 10,
  }));

  const sortedChartData = barChartData.sort((a, b) => b.MenagesPauvres - a.MenagesPauvres);

  const visualization = (
    <BarChart width={600} height={barChartData.length * 50} data={sortedChartData} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" domain={[0, 100]} />
      <YAxis dataKey="name" type="category" width={300} />
      <Tooltip formatter={(value) => `${value}%`} />
      <Legend />
      <Bar dataKey="MenagesPauvres" fill="#FFB03B" />
    </BarChart>
  );

  return (
    <CompareDataviz
      title="Part des ménages pauvres"
      description={`Pourcentage des ménages pauvres parmi les ménages, pour chaque structure au code postal ${postalCode}`}
      visualization={visualization}
      maxHeight={400}
    />
  );
};

export default CompareMenPauv;
