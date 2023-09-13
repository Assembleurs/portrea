// components/ifn.js
import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/Ifn.module.css';

const IfnButton = ({ code }) => {
  if (!code) return null; // or you could render a disabled button or some placeholder
  
  const linkUrl = `https://www.fragilite-numerique.fr/comparaison?selected_territories=${code}-epci&indicators=no_thd_coverage_rate,no_4g_coverage_rate,poverty_rate,older_65_rate,nscol15p_rate,library_distance,public_service_distance,menseul_rate,fammono_rate,obstacle_to_mobility_rate,unemployement_rate,foreigners_rate,social_assistance_rate,aah_rate&variation=all&comparative_value_displayed=score`;

  return (
    <div className={styles.container}>
      <img src="/images/ifn.png" alt="Description for Image" className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>Consulter l'indice de fragilité numérique de l'EPCI</h2>
        <p className={styles.text}>Créé par la Mednum, cet outil permet d'accéder à différents scores pour mesurer la fragilité numérique des populations.</p>
        <Link href={linkUrl}>
          <a target="_blank" rel="noopener noreferrer" className={styles.button}>
            👉 Accéder à l'indice de fragilité numérique
          </a>
        </Link>
      </div>
    </div>
  );
};

export default IfnButton;
