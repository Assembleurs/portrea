import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import MapCaf from '../../components/viz/Iris/MapCaf';
import MapPop from '../../components/viz/Iris/MapPop';
import MapEmploi from '../../components/viz/Iris/MapEmploi';
import Layout from '../../components/Layout';
import ComponentContainer from '../../components/nav/ComponentContainer';
import dynamic from 'next/dynamic';
import DestinationsFs from '../../components/viz/FranceServices/DestinationsFs';
import PlagesHoraires from '../../components/viz/Structures/PlagesHoraires';
import styles from '../../styles/Territoire.module.css';
import MapDiplome from '../../components/viz/Iris/MapDiplome';
import ScoreContainer from '../../components/nav/ScoreContainer';
import StructuresCategories from '../../components/viz/Structures/StructuresCategories';
import IfnButton from '../../components/viz/Scores/Ifn';
import Cnum from '../../components/viz/FranceServices/Cnum';
import Link from 'next/link';
import CourrielBox from '../../components/viz/Structures/CourrielBox';

const MatchFs = dynamic(
  () => import('../../components/viz/FranceServices/MatchFs'),
  { ssr: false }
);

const Territoire = () => {
  const router = useRouter();
  const { code } = router.query;

  const [commune, setCommune] = useState({nom: null, epci: null});
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelection = (service) => {
    setSelectedService(service); 
  };

  useEffect(() => {
    if (code) {
      fetch(`https://geo.api.gouv.fr/communes?code=${code}&fields=nom,code,codesPostaux,siren,codeEpci,epci,codeDepartement,codeRegion,population&format=json&geometry=centre`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setCommune({nom: data[0].nom, epci: data[0].epci.nom, codeEpci: data[0].codeEpci, code: data[0].code});
          }
        });
    }
  }, [code]);  

  useEffect(() => {
    if (commune) {
      setSelectedService("");
    }
  }, [commune]);

  return (
    <Layout>
      <div>       
         {commune ? (
          <>
            <h1 className="commune-title">{commune.nom}</h1>
            <h2 className="epci-name">
              <Link href={`/epci/${commune.codeEpci}`}>
                <a>{commune.epci}</a>
              </Link>
            </h2>  
            <IfnButton code={commune.code} />
            <details>
            <summary className='subtitle'>📊 Chiffres clés</summary>
            <div className={styles.dataInfoBox}>
            💬 Ces scores représentent le nombre de personnes potentiellement vulnérables, et / ou concernées en matière de démarches en ligne.
             <a href="/docs/indicateurs#indicateurs-strategiques" target="_blank" rel="noopener noreferrer">
                En savoir plus
              </a>
             </div>
            <ScoreContainer comcode={commune.code}/>
            </details>
            <details>
            <summary className='subtitle'>🏘 Données socio-démographiques détaillées</summary>
            <div className={styles.dataInfoBox}>
             💬 Pourquoi ces données ?
              <a href="/docs/indicateurs#indicateurs-operationnels" target="_blank" rel="noopener noreferrer">
                Consulter la documentation
              </a>
            </div>
            <div className={styles.grid}>
            <ComponentContainer 
              title="📊 Données démographiques et CSP" 
              description="Données provenant de l'INSEE sur les catégories socio-professionnelles, et les populations immigrées ou étrangères Sélectionnez une variable à afficher, en valeur absolue ou en pourcentage au regard de la population"
              dataInfo="https://www.insee.fr/fr/statistiques/6543200#documentation">
                <MapPop code={code} id="mapPop" />
              </ComponentContainer>
              <ComponentContainer 
                title="📄 Données sur les allocataires (CAF)" 
                description="Données provenant de l'INSEE sur les allocataires. Sélectionnez une variable à afficher, en valeur absolue ou en pourcentage au regard du nombre de personnes couvertes"
                dataInfo="https://www.insee.fr/fr/statistiques/6679585#documentation">
                <MapCaf code={code} id="mapCaf" />
              </ComponentContainer>
              <ComponentContainer 
              title="💼 Données sur l'emploi" 
              description="Données provenant de l'INSEE sur les catégories de demandeurs d'emploi"
              dataInfo="https://www.insee.fr/fr/statistiques/6473526#documentation">
                <MapEmploi code={code} id="mapEmploi" />
              </ComponentContainer>
              <ComponentContainer 
              title="👩‍🎓 Données sur les diplômes" 
              description="Données provenant de l'INSEE sur les formations et diplômes"
              dataInfo="https://www.insee.fr/fr/statistiques/6543298#documentation">
                <MapDiplome code={code} id="mapDiplome" />
              </ComponentContainer>
            </div>
            </details>
            <details>
            <summary className='subtitle'>🇫🇷 Fréquentation des structures France Services</summary>
            <div className={styles.grid}>
              <ComponentContainer 
              title="🗺 Origine des usagers France Services" 
              description="De quelles communes proviennent les usagers des structures France Services ?"
              dataInfo="https://www.france-services.caissedesdepots.fr/">
              <MatchFs code={code} />
              </ComponentContainer>
              <ComponentContainer 
              title="📍 Destinations des usagers France Services" 
              description="Structures France Services dans lesquelles se rendent les habitants de la commune."
              dataInfo="https://www.france-services.caissedesdepots.fr/">
              <DestinationsFs code={code} />
              </ComponentContainer>
              </div>
              <br></br>
              </details>
              <div>
              <details>
              <summary className='subtitle'>👩🏽‍💻 Données sur l'offre en médiation numérique</summary>
            <div className={styles.grid}>
              <ComponentContainer 
              title="📍 Localisation des structures" 
              description="Présence des structures selon les accompagnements proposés"
              dataInfo="https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-data-inclusion-1/">
              <StructuresCategories irisCode={code} id="StructuresCategories" />
              </ComponentContainer>
              <ComponentContainer 
              title="🕐 Plages horaires des structures" 
              description="Nombre de structures ouvertes dans la commune selon les jours et les heures."
              dataInfo="https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-data-inclusion-1/">
              <PlagesHoraires code={code} />
              </ComponentContainer>
              <ComponentContainer
               title="Conseillers numériques"
               description="Nombre de conseillers numériques dans la commune (septembre 2023)"
               dataInfo="https://metabase.conseiller-numerique.gouv.fr/public/dashboard/446208c4-cae2-4c0c-be19-44cb14ce7d06?en_date_du___=2023-07-25">
              <Cnum code={commune.code} />
              </ComponentContainer>
              <ComponentContainer
               title="Contacter les structures de la commune"
               description="Liste des adresses mail (renseignées) des structures de la commune"
               dataInfo="https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-data-inclusion-1/">
               <CourrielBox code={code} />
              </ComponentContainer>
              </div>
              </details>
            </div>
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </Layout>
  );
};

export default Territoire;
