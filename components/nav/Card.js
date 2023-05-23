import Link from 'next/link';
import styles from '../../styles/styles.module.css';

export default function Card({ object }) {
  return (
    <Link href={`/fiche/${object.id}`} passHref>
      <div className={styles.card}>
        <a style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2>{object.nom}</h2>
          <p>{object.commune}</p>
        </a>
      </div>
    </Link>
  );
}
