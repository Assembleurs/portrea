// components/ifn.js
import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/Ifn.module.css';

const IfnButton = ({ code }) => {
  if (!code) return null; // or you could render a disabled button or some placeholder
  
  const linkUrl = `https://www.fragilite-numerique.fr/comparaison?selected_territories=${code}-city&open_sharing=false&indicators=no_thd_coverage_rate,no_4g_coverage_rate,poverty_rate_30_minus,neet_16_25_year_rate,nscol15p_rate_15_25_year,library_distance_and_mjc,public_service_distance_and_ml,menseul_rate_50_plus,fammono_rate_25_minus,obstacle_to_mobility_rate,unemployement_rate_25_minus,foreigners_rate_25_minus,social_assistance_rate,aah_rate&variation=junior`;

  return (
    <div className={styles.container}>
      <img src="/images/ifn.png" alt="Description for Image" className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>Consulter l'indice de fragilité numérique de la commune</h2>
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
