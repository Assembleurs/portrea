import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CompareDataviz from '../nav/CompareDataviz';

const CompareAge = ({ postalCode }) => {
  const [data, setData] = useState([]);
  const [ageRange, setAgeRange] = useState("ind_25_39");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/inseedata-postal?code_postal=${postalCode}`);
      const responseData = await response.json();
      setData(responseData);
    };

    fetchData();
  }, [postalCode, ageRange]);

  if (!data || data.length === 0) {
    return <p>Aucune donnée disponible pour le code postal {postalCode}.</p>;
  }

  const barChartData = data.map(item => ({
    name: item.properties.nom,
    count: item.inseeData[ageRange],
  }));

  const sortedChartData = barChartData.sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...sortedChartData.map(item => item.count));

  const visualization = (
    <BarChart width={600} height={barChartData.length * 50} data={sortedChartData} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" domain={[0, maxCount]} />
      <YAxis dataKey="name" type="category" width={300} />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#526D82" />
    </BarChart>
  );

  return (
    <CompareDataviz
      title={`Nombre d'individus par tranche d'âge`}
      description={`Nombre d'individus dans chaque tranche d'âge pour chaque structure au code postal ${postalCode}`}
      visualization={
        <div>
          <div style={{background: '#DDE6ED', padding: '5px', marginBottom: '20px', fontSize: '18px'}}>
            Sélectionner une tranche d'âge :
            <select value={ageRange} onChange={e => setAgeRange(e.target.value)}>
              <option value="ind_0_3">0-3</option>
              <option value="ind_4_5">4-5</option>
              <option value="ind_6_10">6-10</option>
              <option value="ind_11_17">11-17</option>
              <option value="ind_18_24">18-24</option>
              <option value="ind_25_39">25-39</option>
              <option value="ind_40_54">40-54</option>
              <option value="ind_55_64">55-64</option>
              <option value="ind_65_79">65-79</option>
              <option value="ind_80p">80+</option>
            </select>
          </div>
          {visualization}
        </div>
      }
      maxHeight={400}
    />
  );
};

export default CompareAge;
