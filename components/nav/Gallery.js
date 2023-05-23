import Card from './Card';
import styles from '../../styles/styles.module.css';

export default function Gallery({ objects }) {
  return (
    <div className={styles.gallery}>
      {objects.map(object => (
        <Card key={object.id} object={object} />
      ))}
    </div>
  );
}
