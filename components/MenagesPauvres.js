import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import styles from '../styles/styles.module.css'; 

const MenagesPauvres = ({ structure }) => {
  const data = [
    { name: 'Ménages pauvres', value: structure.properties.men_pauv },
    { name: 'Autres', value: structure.properties.men - structure.properties.men_pauv },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            label={(entry) => `${entry.name}: ${((entry.value / structure.properties.men) * 100).toFixed(1)}%`}
          >
            <Cell fill="#023047" />
            <Cell fill="#8ECAE6" />
          </Pie>
          <Tooltip formatter={(value) => `${((value / structure.properties.men) * 100).toFixed(1)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div className={styles.infoBox}>
    <p className={styles.infoTitle}>Nombre de ménages</p>
    <p className={styles.infoValue}>{structure.properties.men}</p>
  </div>
  <div className={styles.infoBox}>
    <p className={styles.infoTitle}>Part des ménages pauvres</p>
    <p className={styles.infoValue}>
      {((structure.properties.men_pauv / structure.properties.men) * 100).toFixed(1)}%
    </p>
  </div>
</div>

    </div>
  );
};

export default MenagesPauvres;
