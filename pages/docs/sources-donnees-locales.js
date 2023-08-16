import styles from '../../styles/Documentation.module.css';
import Layout from '../../components/Layout';
import { useState } from 'react';

function copyToClipboard(element) {
    if (!element) return;
    const text = element.innerText;
        if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('JSON copié dans le presse-papiers!');
        });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('JSON copié dans le presse-papiers!');
    }
}

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedEpci, setSelectedEpci] = useState('');  // Nouvel état pour le code EPCI sélectionné
  
    // Call API when query changes
    const onSearchChange = async (e) => {
      setQuery(e.target.value);
  
      if (e.target.value) {
        const response = await fetch(`https://geo.api.gouv.fr/epcis?nom=${e.target.value}&fields=code,departement&boost=population&limit=5`);
        const data = await response.json();
        setResults(data);
      } else {
        setResults([]);
      }
    };

    // Fonction pour gérer le clic sur un élément de la liste
    const handleItemClick = (code) => {
        setSelectedEpci(code);
    }
    
    return (
        <div className={styles.searchContainer}>
          <input type="text" value={query} onChange={onSearchChange} placeholder="Rechercher..." className={styles.searchInput} />
          {results.length > 0 && (
            <ul className={styles.resultsList}>
              {results.map((result) => (
                <li key={result.code} className={styles.resultItem} onClick={() => handleItemClick(result.code)}>{result.nom}</li>
              ))}
            </ul>
          )}
            {selectedEpci && <p className={styles.selectedEpci}>Code de l'EPCI : {selectedEpci}</p>} 
        </div>
      );
}


export default function Documentation() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Sources des données locales</h1>
                
                <h2 id="equipement-structures" className={styles.subtitle}>Equipement des structures de médiation</h2>
                <p className={styles.text}>
                    Les données des équipements des structures indiquent :
                    <br></br>
                    <br></br>
                    <ul className={styles.list}>
                        <li>🖥 le nombre de structures proposant un accès libre à de l'équipement ou une connexion</li>
                        <li>📱 le nombre de structures qui proposent de la vente solidaire / don ou prêt de matériel numérique</li>
                    </ul>
                </p>

                <blockquote className={styles.quote}>
                    "Les données peuvent provenir d'un diagnostic réalisé par une organisation tierce, ou bien grâce au suivi en continu par la collectivité."
                </blockquote>

                <h2 className={styles.thirdtitle}>Comment ajouter les données de votre collectivité ?</h2>

                <div className={styles.hint}>
                    Les données sur l'équipement des structures sont contenues dans un fichier JSON, et (à ce jour) ajoutées ou mises à jour sur demande des collectivités.
                </div>
                <a href="https://github.com/etienne0101/portrea-js/edit/main/data/epci/equipement-structures.json" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                        ✚ Ajouter ou mettre à jour vos données
                    </button>
                </a>
                <br></br>
                <br></br>
                <b>Exemple de données provenant de la Communauté d'Agglomération Maubeuge-Val de Sambre :</b>
                <br></br>
                <br></br>
                <div className={`${styles.jsonSnippetContainer} jsonSnippetContainerForJs`} onClick={() => {copyToClipboard(document.querySelector(".jsonSnippetContainerForJs code"));}}>
                   <code className={styles.code}>
{
`{
    "code-epci": 200043396,
    "nombre-structures": "66",
    "nombre-structures-acces-equipement":"28",
    "nombre-structures-vente-solidaire":"10",
    "source-enquête":"We Tech Care",
    "annee-enquête":"2021"
 }`
}
                   </code>
                </div>
                <p>
                <blockquote className={styles.quote}>
                Vous avez réalisé un diagnostic ou bien vous connaissez le nombre de structures équipées ou proposant du matériel dans votre EPCI ? <b>Ajoutez les données pour qu'elles s'affichent dans votre diagnostic</b>
                </blockquote>

                <h3 className={styles.fourthtitle}>Code EPCI</h3>
                Il s'agit de l'identifiant de votre communauté de communes, d'agglomération, métropole, etc...
                <br></br>
                  <b>Recherchez le code de votre EPCI :</b>
          
                <br></br>
                <SearchBar />
                </p>

                <h3 className={styles.fourthtitle}>Nombre de structures</h3>
                Il s'agit du nombre total de structures de médiation numérique au sein de l'EPCI.

                <h3 className={styles.fourthtitle}>Nombre de structures - accès équipement</h3>
                Il s'agit du nombre de structures proposant un accès à des ordinateurs ou bien proposant une connexion internet pour réaliser ses démarches.

                <h3 className={styles.fourthtitle}>Nombre de structures - vente solidaire</h3>
                Il s'agit du nombre de strucrures proposant de la vente de téléphones mobiles ou PC reconditionnés à des tarifs solidaires, ou gratuitement sous conditions de revenus.

                <h3 className={styles.fourthtitle}>Source de l'enquête</h3>
                D'où proviennent les données ? D'une enquête réalisée par un tiers ? Ou du suivi régulier réalisé par la collectivité ?

                <h3 className={styles.fourthtitle}>Année de l'enquête</h3>
                Indiquer l'année lors de laquelle ces chiffres ont été mesurés.
                <p>
                <br></br>
                <br></br>
                <a href="https://github.com/etienne0101/portrea-js/edit/main/data/epci/equipement-structures.json" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                        ✚ Ajouter ou mettre à jour vos données
                    </button>
                </a>
                </p>
            </div>
        </Layout>
    );
}
