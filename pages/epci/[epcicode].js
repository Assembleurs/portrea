import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout'
import Illectronisme from '../../components/viz/Epci/Illectronisme';
import ComponentContainer from '../../components/nav/ComponentContainer';
import styles from '../../styles/Territoire.module.css';
import EquipementStructures from '../../components/viz/Epci/EquipementStructures';

const EpciPage = () => {
  const router = useRouter();
  const { epcicode } = router.query;

  const [epci, setEpci] = useState({nom: null, code: null});

  useEffect(() => {
    if (epcicode) {
      console.log('EPCI code:', epcicode); // Add this line to debug
      fetch(`https://geo.api.gouv.fr/epcis?code=${epcicode}&fields=nom,code&format=json`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setEpci({nom: data[0].nom, code: data[0].code});
          }
        });
    }
  }, [epcicode]);
  

  return (
    <Layout>
      <div>
        {epci.nom ? (
          <>
            <h1 className="commune-title">{epci.nom}</h1>
            <div className={styles.grid}>
            <ComponentContainer
             title="🖥 Personnes en situation d'illectronisme" 
             description="Données provenant de l'INSEE, estimation réalisée en 2019"
             dataInfo="https://www.insee.fr/fr/statistiques/4986976#documentation">
            <Illectronisme codeEPCI={epci.code} />
            </ComponentContainer>
            <ComponentContainer
             title="⌨️ Accès à l'équipement" 
             description="Données collectées par la collectivité"
             dataInfo="">
            <EquipementStructures codeEPCI={epci.code} />
            </ComponentContainer>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
};

export default EpciPage;
