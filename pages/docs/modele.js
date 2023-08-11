import styles from '../../styles/Documentation.module.css';
import Layout from '../../components/Layout'

export default function Documentation() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Documentation de Mon Projet</h1>
                
                <h2 className={styles.subtitle}>Introduction</h2>
                <p className={styles.text}>Ceci est une introduction à la documentation de mon projet. Vous trouverez ici différents types de contenu pour vous aider à comprendre la structure.</p>

                <blockquote className={styles.quote}>
                    "Une citation inspirante ou pertinente relative à votre projet ou à la documentation."
                </blockquote>

                <h2 className={styles.subtitle}>Section 1</h2>
                <p className={styles.text}>Ceci est un exemple de texte pour la première section. Vous pouvez ajouter autant de sections que vous le souhaitez. Pour plus d'informations, consultez <a className={styles.link} href="https://www.example.com" target="_blank" rel="noopener noreferrer">ce lien</a>.</p>
                
                <div className={styles.hint}>
                    Astuce: N'oubliez pas de consulter la FAQ pour des solutions rapides à des problèmes courants.
                </div>

                <h2 className={styles.subtitle}>Section 2</h2>
                <p className={styles.text}>Un autre exemple de texte pour la deuxième section.</p>
                
                <ul className={styles.list}>
                    <li>Élément de liste 1</li>
                    <li>Élément de liste 2</li>
                    <li>Élément de liste 3</li>
                </ul>
                
                <h2 className={styles.subtitle}>Conclusion</h2>
                <p className={styles.text}>Ceci est la conclusion de notre documentation. Merci d'avoir pris le temps de la lire!</p>
            </div>
        </Layout>
    );
}
