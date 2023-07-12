import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import MapCaf from '../../components/viz/Iris/MapCaf';
import MapPop from '../../components/viz/Iris/MapPop';
import Layout from '../../components/Layout';
import ComponentContainer from '../../components/nav/ComponentContainer';
import dynamic from 'next/dynamic';
import DestinationsFs from '../../components/viz/FranceServices/DestinationsFs';
import styles from '../../styles/Territoire.module.css';

const MatchFs = dynamic(
  () => import('../../components/viz/FranceServices/MatchFs'),
  { ssr: false }
);

const Territoire = () => {
  const router = useRouter();
  const { codes } = router.query;

  const [communes, setCommunes] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  useEffect(() => {
    if (codes) {
      fetch(`https://geo.api.gouv.fr/epcis/${codes}/communes?fields=code&format=json&geometry=centre`)
        .then((res) => res.json())
        .then((data) => {
          const communeCodes = data.map((commune) => commune.codes);
          setCommunes(communeCodes);
        });
    }
  }, [codes]);

  useEffect(() => {
    if (communes.length > 0) {
      setSelectedService("");
    }
  }, [communes]);

  return (
    <Layout>
      <div>
        {communes.length > 0 ? (
          <>
            <h1>🏘 Données socio-démographiques</h1>
            <div className={styles.grid}>
              <ComponentContainer
                title="Données sur les allocataires (CAF)"
                description="Données provenant de l'INSEE sur les allocataires. Sélectionnez une variable à afficher, en valeur absolue ou en pourcentage au regard du nombre de personnes couvertes"
              >
                <MapCaf codes={communes} id="mapCaf" />
              </ComponentContainer>
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
