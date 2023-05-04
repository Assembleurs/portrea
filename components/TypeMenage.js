import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import styles from '../styles/styles.module.css';

const TypeMenage = ({ structure }) => {
  const data = [
    {
      name: '',
      '1 personne': ((structure.properties.men_1ind / structure.properties.men) * 100).toFixed(1),
      '5 personnes ou +': ((structure.properties.men_5ind / structure.properties.men) * 100).toFixed(1),
      'Monoparentaux': ((structure.properties.men_fmp / structure.properties.men) * 100).toFixed(1),
    },
  ];

  return (
    <div>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="1 personne" fill="#98C1D9" />
        <Bar dataKey="5 personnes ou +" fill="#293241" />
        <Bar dataKey="Monoparentaux" fill="#EE6C4D" />
      </BarChart>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>1 personne</p>
          <p className={styles.infoValue}>{((structure.properties.men_1ind / structure.properties.men) * 100).toFixed(1)}%</p>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>5 personnes ou +</p>
          <p className={styles.infoValue}>{((structure.properties.men_5ind / structure.properties.men) * 100).toFixed(1)}%</p>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>Monoparentaux</p>
          <p className={styles.infoValue}>{((structure.properties.men_fmp / structure.properties.men) * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default TypeMenage;
