import styles from '../../styles/Documentation.module.css';
import Layout from '../../components/Layout'
import hdf from '../../data/doc/indicateurs/indic-hdf.json';
import bretagne from '../../data/doc/indicateurs/indic-bretagne.json'
import assembleurs from '../../data/doc/indicateurs/indic-assembleurs.json'


function TableauIndicateurs({ data }) {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key, idx) => (
                            <th key={idx}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.entries(row).map(([key, value], idx) => (
                                <td key={idx}>
                                    {key === "Pour quel indicateur ?" ? 
                                        <span className={styles.indicatorTag} style={{ backgroundColor: getColorForIndicator(value) }}>
                                            {value}
                                        </span>
                                        :
                                        key === "Url source de la donnée" ? 
                                            <a className={styles.link} href={value} target="_blank" rel="noopener noreferrer">Lien vers les données</a>
                                            :
                                            value
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function getColorForIndicator(indicator) {
    const colors = {
        "Score de fragilité socio numérique": "#fabc2a",  
        "Score d’exposition aux exigences numériques": "#f38d68", 
        "Accès aux interfaces numériques": "#f76f8e",
        "Accès à l’information et aux services publics": "#7fd8be",
        "Taux d'illectronisme": "#519872",
        "Données spécifiques": "#e0aaff",
    };

    return colors[indicator] || "#FFFFFF"; // couleur par défaut si l'indicateur n'est pas dans la liste
}

export default function Indicateurs() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>INDICATEURS CHOISIS</h1>
                
                <h2 id="demarche" className={styles.subtitle}>Démarche</h2>
                <p className={styles.text}>
                L'objectif du projet Portrea en Hauts-de-France est (entre autres) de proposer un ensemble d'indicateurs pour définir la vulnérabilité des populations face aux démarches administratives en ligne.
                <br></br>
                <br></br>
                Pour cela, nous sommes partis de deux initiatives existantes : <a className={styles.link} href="https://portrea.fr/" target="_blank" rel="noopener noreferrer">Portrea mené par le TiLab en Bretagne</a>, et <a className={styles.link} href="https://2040.hautsdefrance.fr/un-indice-de-fragilite-numerique/" target="_blank" rel="noopener noreferrer">l'indice de fragilité numérique (Région Hauts-de-France)</a>
                </p>

                <h2 id="hdf" className={styles.subtitle}>Données utilisées en Région Hauts-de-France</h2>

                <TableauIndicateurs data={hdf} />

                <div className={styles.hint}>
                Le choix du revenu des ménéages comme donnée pour évaluer l'équipement est justifié de la manière suivante :
                <blockquote className={styles.quote}>
                "Les revenus ont une forte influence sur le taux d’équipement en ordinateur 2: en 2019, parmi les 10 % des ménages les plus modestes, 68 % disposent d’un ordinateur et 75 % d’un accès à Internet, contre respectivement 95 % et 96 % des 10 % des ménages les plus aisés."
                </blockquote>
                </div>

                <a href="https://2040.hautsdefrance.fr/un-indice-de-fragilite-numerique/" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                        📖 En savoir plus sur la méthode employée en Hauts-de-France
                    </button>
                </a>

                <h2 id="bretagne" className={styles.subtitle}>Données utilisées par le TiLab (Bretagne)</h2>

                <TableauIndicateurs data={bretagne} />

                <div className={styles.hint}>
                Le choix de l'âge et du diplôme pour évaluer la non-connexion est justifié de la manière suivante :
                <blockquote className={styles.quote}>
                "L’âge et le niveau de diplôme constituent les deux variables les plus fortement corrélées à la non connexion – bien que ce soit surtout à partir de 75 ans que la courbe de la connexion s’effondre"
                </blockquote>
                </div>

                <a href="https://portrea.fr/" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                        📖 En savoir plus sur la méthode employée par le TiLab
                    </button>
                </a>

                <h2 id="donnees-assembleurs" className={styles.subtitle}>Données utilisées par Les Assembleurs</h2>
                <br></br>

                <p>Le choix des Assembleurs pour l'expérimentation Portrea en Hauts-de-France se porte sur deux types d'indicateurs : </p>

                <br></br>

                <ul className={styles.list}>
                    <li>Indicateurs stratégiques</li>
                    <li>Indicateurs opérationnels</li>
                </ul>

                <h3 id="indicateurs-strategiques" className={styles.thirdtitle}>Indicateurs stratégiques</h3>
                 <p>
                    Ils reprennent les indicateurs utilisés en Bretagne par le TiLab : <b>score d’exposition aux exigences numériques, et score de fragilité socio numérique. </b>
                    Leur calcul est identique, mais à ce jour il est réalisé à partir de la somme des individus de chaque IRIS (en cours de modification, pour prendre le chiffre à l'échelle de la commune directement).
                 <br></br>

                 <div className={styles.equation}>
                    Score de fragilité socio numérique = Nombre de personnes + de 65 ans + Nombre de personnes sans diplôme ou CEP de moins de 65 ans
                </div>

                <div className={styles.equation}>
                    Score d’exposition aux exigences numériques = somme des bénéficiaires de minima sociaux (RSA, PPA, AAH) et des demandeur·euse·s d’emploi.
                </div>

                 <br></br>
                    À cela s'ajoute les taux et nombre de personnes en situation d'illectronisme par EPCI dans les Hauts-de-France. Celui-ci est calculé sur une estimation de l'INSEE, réalisée en 2019.
                    <div className={styles.hint}>
                        Bien que le <b>taux d'illectronisme</b> soit une estimation, comme le note à juste titre l'équipe du Tilab, nous avons jugé pertinent de l'ajouter à titre indicatif.
                    </div>
                 </p>

                 <h3 id="indicateurs-operationnels" className={styles.thirdtitle}>Indicateurs opérationnels</h3>
                    
                    <p>Il s'agit de données précises à la fois sur les populations (allocations, emploi, formation, CSP), sur les structures de médiation numérique et sur les flux d'usagers France Services.</p>
                    <br></br>
                    <br></br>
                    <p>Ces données n'ont pas vocation à apprécier une variable sur l'ensemble d'un territoire, mais plutôt à apporter une information précise ou un contexte sur une zone spécifique.</p>
                    <br></br>

                    <blockquote className={styles.quote}>
                    Grâce à l'affichage des structures sur la même cartographie, on peut observer par exemple le nombre de personnes percevant l'allocation adulte handicapé, ou bien le nombre de personnes immigrées. 
                    <b> L'objectif : permettre aux structures d'adapter leur offre grâce à une meilleure connaissance des publics environnants.</b>
                    </blockquote>
                    <br></br>
                    <p>
                    <div className={styles.hint}>
                        À ce jour, certaines données sont <b>en cours d'acquisition</b>, elles sont intégrées progressivement à l'outil de diagnostic.
                    </div>
                
                <TableauIndicateurs data={assembleurs} />
                </p>
            </div>
        </Layout>
    );
}
