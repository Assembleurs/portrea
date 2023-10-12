import styles from '../../styles/Documentation.module.css';
import Layout from '../../components/Layout';

export default function FormationAgents() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Comment former les agents et personnels des structures de médiation ?</h1>

                <h2 className={styles.subtitle}>Ressources produites par les Assembleurs</h2>
                
                <p className={styles.text}>
                Nos ateliers sont à destination des "professionnels de l'inclusion numérique" : aidants professionnels, agents de collectivités, agents France Services, travailleurs sociaux, acteurs associatifs, … Ils ont vocation à être utilisés et animés localement sur les territoires.
                <br></br>
                    <br></br>
                    <a href="https://assembleurs.co/nos-communs/" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                        👉 Voir les ressources
                    </button>
                </a>
                </p>
            </div>
        </Layout>
    );
}
