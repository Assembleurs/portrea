import styles from '../../styles/Documentation.module.css'
import Layout from '../../components/Layout'

export default function PlanAction() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Un plan d'action pour adapter l'offre de médiation numérique
        </h1>
        <h2 className={styles.subtitle}>Plan d'action</h2>
        <h3 className={styles.thirdtitle}>Définition des objectifs</h3>
        <p className={styles.text}>
          Les objectifs doivent être clairs, mesurables et réalisables.
          <blockquote className={styles.quote}>
            Par exemple : augmenter le taux d'adoption des services en ligne de
            20% en un an.
          </blockquote>
        </p>
        <h3 className={styles.thirdtitle}>Identification des acteurs</h3>
        <p className={styles.text}>
          Qui sera impliqué dans la mise en œuvre ? Cela peut inclure les
          associations, les centres sociaux et des administrations présentes sur
          le territoire.
        </p>
        <div className={styles.hint}>
          Utilisez l'outil{' '}
          <a href="/" target="_blank" rel="noopener noreferrer">
            <b>Portrea</b>
          </a>{' '}
          pour identifier et contacter les structures pertinentes
        </div>
        <h3 className={styles.thirdtitle}>Élaboration des actions</h3>
        <p className={styles.text}>
          Listez les actions nécessaires pour atteindre vos objectifs, et
          priorisez-les en fonction de leur impact et de leur faisabilité.
          <br></br>
          <br></br>
          <a
            href="https://assembleurs.co/solutions"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.customButton}>
              👉 Voir les solutions des Assembleurs
            </button>
          </a>
          <br></br>
          <h3 className={styles.thirdtitle}>
            S'inspirer ou rejoindre des initiatives existantes
          </h3>
          <p className={styles.text}>
            L'ANCT propose une liste d'exemples et d'initiatives d'inclusion
            numérique menés dans les territoires.
            <br></br>
          </p>
          <a
            href="https://agence-cohesion-territoires.gouv.fr/la-projetotheque-15?field_program_term_m%5B143%5D=143&field_program_term_m%5B144%5D=144&field_program_term_m%5B174%5D=174&field_program_term_m%5B175%5D=175&field_program_term_m%5B189%5D=189&field_program_term_m%5B248%5D=248&field_program_term_m%5B170%5D=170&title=&op=Filtrer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.customButton}>
              💡 Accès vers la Projétothèque de l'ANCT
            </button>
          </a>
        </p>
        <h3 className={styles.thirdtitle}>Budget et financement</h3>
        <p className={styles.text}>
          Estimez le budget nécessaire pour chaque action et identifiez les
          sources potentielles de financement.
        </p>
        <a
          href="https://aides-territoires.beta.gouv.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.customButton}>
            💶 Trouver une aide financière pour votre projet
          </button>
        </a>
        <br></br>
        <br></br>
        <a
          href="https://aides-territoires.beta.gouv.fr/projets/projets-publics/?project_perimeter=&step=&contract_link=&project_types=86&organization=&action=search-filter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.customButton}>
            🔎 Voir les projets numériques financés dans d'autres territoires
          </button>
        </a>
        <h3 className={styles.thirdtitle}>Suivi et évaluation</h3>
        <p className={styles.text}>
          Mettez en place des indicateurs de suivi pour mesurer l'efficacité de
          votre plan et ajustez-le si nécessaire.
          <br></br>
          <br></br>
          <a
            href="/docs/mener-diagnostic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.customButton}>
              👉 Voir la section "Mener un diagnostic"
            </button>
          </a>
        </p>
      </div>
    </Layout>
  )
}
