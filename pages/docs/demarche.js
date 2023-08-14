import styles from '../../styles/Documentation.module.css';
import Layout from '../../components/Layout';

export default function Portrea() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>DÉMARCHE</h1>
                <h2 className={styles.subtitle}>Portrea : c'est quoi ?</h2>
                <p className={styles.text}>
                
                Portrea (Portrait territorialisé de la relation e-administrative) est un projet initié par le TiLab en Bretagne, et expérimenté par la suite dans les Hauts de France.
                <br></br>
                <b>4 territoires pilotes ont participé :</b> Les communes de Seclin, Liévin, Lens et la Communauté d'Agglomération Maubeuge-Val de Sambre.
                <div className={styles.quote}>
                    L'outil disponible sur ce site est accessible à toute collectivité désirant réaliser un pré-diagnostic à partir des données disponibles au niveau national ou régional.
                </div>
                <div className={styles.hint}>
                    À ce jour, l'outil est développé pour les communes de la Région Hauts-de-France, bien que certaines données soient également disponibles pour le reste des communes françaises (lieux de médiation numérique notammment). 
                </div>
                <a href="/" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                        👉 Accéder à l'outil de pré-diagnostic
                    </button>
                </a>
                
                <h2 className={styles.subtitle}>À quoi ça sert, concrètement ?</h2>

                <ul className={styles.list}>
                        <li>🙋🏽‍♀️ Mieux connaître les <b>besoins des habitants</b> et leurs vulnérabilités dans le cadre de leurs démarches administratives</li>
                        <br></br>
                        <li>🏘 Mettre en cohérence les <b>acteurs du territoire</b> autour de la médiation numérique</li>
                        <br></br>
                        <li>🖥 Préparer ou orienter une <b>stratégie numérique</b> adaptée à des publics spécifiques.</li>
                        <br></br>
                        <li>📈 Demander / monter un <b>dossier de financement</b> grâce à des chiffres précis sur les besoins des habitants</li>
                    </ul>
                </p>

                <h2 className={styles.subtitle}>Ressources complémentaires</h2>
                <a href="/docs" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                    💬 Documentation complète de l'outil
                    </button>
                </a>
                <br></br>
                <br></br>
                <a href="https://lesassembleurs.gitbook.io/portrea/" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                    📖 Voir le guide complet à destination des territoires pilotes
                    </button>
                </a>
                <br></br>
                <br></br>
                <a href="http://www.labacces.fr/?Rapport/download&file=LabAcces_Note_methodo_Portrait_juillet2020_DIF.pdf" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                    🔎 Voir la restitution du projet en Bretagne
                    </button>
                </a>
            </div>
        </Layout>
    );
}
