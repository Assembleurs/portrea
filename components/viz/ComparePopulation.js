import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CompareDataviz from '../nav/CompareDataviz';

const ComparePopulation = ({ postalCode }) => {
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
    population: item.inseeData.pop_carr,
  }));

  const sortedChartData = barChartData.sort((a, b) => b.population - a.population);

  const maxPopulation = Math.max(...sortedChartData.map(item => item.population));

  const visualization = (
    <BarChart width={600} height={barChartData.length * 50} data={sortedChartData} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" domain={[0, maxPopulation]} />
      <YAxis dataKey="name" type="category" width={300} />
      <Tooltip />
      <Legend />
      <Bar dataKey="population" fill="#93B7D5" />
    </BarChart>
  );

  return (
    <CompareDataviz
      title="Population du secteur"
      description={`Nombre d'habitants dans le secteur, pour chaque structure au code postal ${postalCode}`}
      visualization={visualization}
      maxHeight={400}
    />
  );
};

export default ComparePopulation;
