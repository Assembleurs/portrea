import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import MapCaf from '../../components/viz/Iris/MapCaf';
import Layout from '../../components/Layout';
import ComponentContainer from '../../components/nav/ComponentContainer';
import dynamic from 'next/dynamic';


const MatchFs = dynamic(
  () => import('../../components/viz/FranceServices/MatchFs'),
  { ssr: false }
);

const Territoire = () => {
  const router = useRouter();
  const { code } = router.query;

  const [commune, setCommune] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelection = (service) => {
    setSelectedService(service); 
  };

  useEffect(() => {
    if (code) {
      fetch(`https://geo.api.gouv.fr/communes?code=${code}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setCommune(data[0]);
          }
        });
    }
  }, [code]);

  useEffect(() => {
    if (commune) {
      setSelectedService(""); // Réinitialiser le service sélectionné lorsque la commune change
    }
  }, [commune]);

  return (
    <Layout>
      <div>
        {commune ? (
          <>
            <h1 className="commune-title">{commune.nom}</h1>
            <h1>Données socio-démographiques</h1>
            <ComponentContainer title="Données sur les allocataires (CAF)" description="Données provenant de l'INSEE sur les allocataires. Sélectionnez une variable à afficher, en valeur absolue ou en pourcentage au regard du nombre de personnes couvertes">
              <MapCaf code={code} />
            </ComponentContainer>
            <br></br>
            <h1>Fréquentation des structures France Services</h1>
            <ComponentContainer title="France Services correspondants" description="Liste des structures France Services correspondant à la commune">
            <MatchFs code={code} />
            </ComponentContainer>
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </Layout>
  );
};

export default Territoire;
