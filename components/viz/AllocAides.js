import { useState, useEffect } from 'react';
import axios from 'axios';
import Dataviz from '../nav/Dataviz';
import styles from '../../styles/Table.module.css';

export default function AllocAides({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/iris-match?id=${id}`);
        const responseData = response.data;
        setData({...responseData.caf.properties, ...responseData.pop.properties});
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <p>Chargement des données... ⏱ Cela peut prendre 10 à 20 secondes</p>;
  }

  const totalPop = data.p18_pop;

  const rows = [
    { label: "Nombre total d'allocataires", value: data.a, percentage: data.a / totalPop },
    { label: "Allocataires couples avec enfant(s)", value: data.acavenf, percentage: data.acavenf / totalPop },
    { label: "Allocataires couples avec au moins 3 enfants à charge", value: data.ac3enf, percentage: data.ac3enf / totalPop },
    { label: "Enfants couverts par au moins une prestation CAF", value: data.enf, percentage: data.enf / totalPop },
    { label: "Allocataires étudiants", value: data.a_etud, percentage: data.a_etud / totalPop },
    { label: "Allocataires de moins de 25 ans non étudiants", value: data.a_netud_24, percentage: data.a_netud_24 / totalPop },
    { label: "Allocataires percevant une aide au logement", value: data.aal, percentage: data.aal / totalPop },
    { label: "Allocataires percevant l’Aide Personnalisée au Logement", value: data.aapl, percentage: data.aapl / totalPop },
    { label: "Allocataires percevant l’Allocation Adulte Handicapé", value: data.aaah, percentage: data.aaah / totalPop },
    { label: "Allocataires percevant la prime d'activité", value: data.appa, percentage: data.appa / totalPop },
    { label: "Allocataires percevant le RSA socle", value: data.arsas, percentage: data.arsas / totalPop }
  ];

  return (
    <Dataviz
      title="Allocations et Aides"
      description="Bénéficiaires d'aides et allocations au sein du périmètre IRIS (quartier)"
      visualization={
        <table className={styles.table}>
          <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td>{row.label}</td>
              <td>
                <span style={{fontWeight: 'bold'}}>{row.value}</span>
              </td>
              <td className={`${styles.numValue} ${getNumberValueClass(row.percentage)}`}>
                <span>{(row.percentage * 100).toFixed(2)}%</span>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      }
    />
);
}

function getNumberValueClass(value) {
  const percentage = value * 100;
  if (percentage < 1) {
    return styles.low;
  } else if (percentage < 5) {
    return styles.medium;
  } else {
    return styles.high;
  }
}

