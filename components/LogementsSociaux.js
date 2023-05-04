import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import styles from '../styles/styles.module.css';

const LogementsSociaux = ({ structure }) => {
  const data = [
    {
      name: '',
      menages: structure.properties.men,
      logements: structure.properties.log_soc,
    },
  ];

  return (
    <div>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="menages" fill="#8D99AE" name="Nombre de ménages" />
        <Bar dataKey="logements" fill="#2B2D42" name="Nombre de logements sociaux" />
      </BarChart>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>Nombre de ménages</p>
          <p className={styles.infoValue}>{structure.properties.men}</p>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>Logements sociaux pour 100 ménages</p>
          <p className={styles.infoValue}>{((structure.properties.log_soc / structure.properties.men) * 100).toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default LogementsSociaux;
