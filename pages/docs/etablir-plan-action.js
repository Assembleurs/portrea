import styles from '../../styles/Documentation.module.css';
import Layout from '../../components/Layout';

export default function PlanAction() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Un plan d'action pour adapter l'offre de médiation numérique</h1>

                <h2 className={styles.subtitle}>Plan d'action</h2>
                
                <h3 className={styles.thirdtitle}>Définition des objectifs</h3>
                <p className={styles.text}>
                    Les objectifs doivent être clairs, mesurables et réalisables. 
                    <blockquote className={styles.quote}>
                    Par exemple : augmenter le taux d'adoption des services en ligne de 20% en un an.
                </blockquote>
                </p>
                
                <h3 className={styles.thirdtitle}>Identification des acteurs</h3>
                <p className={styles.text}>
                    Qui sera impliqué dans la mise en œuvre ? Cela peut inclure les associations, les centres sociaux et des administrations présentes sur le territoire.
                </p>
                <div className={styles.hint}>
                    Utilisez l'outil <a href="/" target="_blank" rel="noopener noreferrer"><b>Portrea</b></a> pour identifier et contacter les structures pertinentes
                </div>

                <h3 className={styles.thirdtitle}>Élaboration des actions</h3>
                <p className={styles.text}>
                    Listez les actions nécessaires pour atteindre vos objectifs, et priorisez-les en fonction de leur impact et de leur faisabilité. 
                    <br></br>
                    <br></br>
                    <a href="https://assembleurs.co/solutions" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                        👉 Voir les solutions des Assembleurs
                    </button>
                    </a>
                </p>

                <h3 className={styles.thirdtitle}>Budget et financement</h3>
                <p className={styles.text}>
                    Estimez le budget nécessaire pour chaque action et identifiez les sources potentielles de financement.
                </p>
                <h3 className={styles.thirdtitle}>Suivi et évaluation</h3>
                <p className={styles.text}>
                    Mettez en place des indicateurs de suivi pour mesurer l'efficacité de votre plan et ajustez-le si nécessaire.
                    <br></br>
                    <br></br>
                    <a href="/docs/mener-diagnostic" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                        👉 Voir la section "Mener un diagnostic"
                    </button>
                </a>
                </p>
            </div>
        </Layout>
    );
}
