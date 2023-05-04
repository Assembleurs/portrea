import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import styles from '../styles/styles.module.css';

const AgeBatiment = ({ structure }) => {
    const totalLogements = structure.properties.log_av45 +
      structure.properties.log_45_70 +
      structure.properties.log_70_90 +
      structure.properties.log_ap_90 +
      structure.properties.log_inc;
  
    const data = [
      {
        name: '',
        'Avant 1945': ((structure.properties.log_av45 / totalLogements) * 100).toFixed(1),
        '1945-1970': ((structure.properties.log_45_70 / totalLogements) * 100).toFixed(1),
        '1970-1990': ((structure.properties.log_70_90 / totalLogements) * 100).toFixed(1),
        'Après 1990': ((structure.properties.log_ap_90 / totalLogements) * 100).toFixed(1),
        'Inconnu': ((structure.properties.log_inc / totalLogements) * 100).toFixed(1),
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
          <Bar dataKey="Avant 1945" fill="#7F5539" />
          <Bar dataKey="1945-1970" fill="#B08968" />
          <Bar dataKey="1970-1990" fill="#DDB892" />
          <Bar dataKey="Après 1990" fill="#E6CCB2" />
          <Bar dataKey="Inconnu" fill="#d4d4d4" />
        </BarChart>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className={styles.infoBox}>
          <p className={styles.infoTitle}>Avant 1945</p>
          <p className={styles.infoValue}>{((structure.properties.log_av45 / totalLogements) * 100).toFixed(1)}%</p>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>1945-1970</p>
          <p className={styles.infoValue}>{((structure.properties.log_45_70 / totalLogements) * 100).toFixed(1)}%</p>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>1970-1990</p>
          <p className={styles.infoValue}>{((structure.properties.log_70_90 / totalLogements) * 100).toFixed(1)}%</p>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>Après 1990</p>
          <p className={styles.infoValue}>{((structure.properties.log_ap_90 / totalLogements) * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default AgeBatiment;
