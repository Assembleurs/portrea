import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Importez Leaflet CSS
import 'leaflet/dist/leaflet.css';
import MapCaf from '../../components/viz/Iris/MapCaf';


const Territoire = () => {
  const router = useRouter();
  const { code } = router.query;

  const [commune, setCommune] = useState(null);

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

  return (
    <div>
      {commune ? (
        <>
          <h1>{commune.nom}</h1>
          <MapCaf code={code} />
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Territoire;
