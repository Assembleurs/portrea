import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CompareDataviz from '../nav/CompareDataviz';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const CpMap = ({ postalCode }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/inseedata-postal?code_postal=${postalCode}`);
      const responseData = await response.json();
      setData(responseData);
    };

    fetchData();
  }, [postalCode]);

  if (!data || data.length === 0) {
    return <p>Aucune donnée disponible pour le code postal {postalCode}.</p>;
  }

  // Default map center to the location of the first item
  const center = [data[0].geometry.coordinates[1], data[0].geometry.coordinates[0]];

  const CircleMarker = dynamic(
    () => import('react-leaflet').then((mod) => mod.CircleMarker),
    { ssr: false }
  );
  
  return (
    <CompareDataviz
      title={`Localisation`}
      description={`Voici une carte montrant la localisation des différentes structures pour le code postal ${postalCode}.`}
      visualization={
        <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map(item => (
  <CircleMarker
    key={item.properties.id}
    center={item.geometry.coordinates.reverse()}
    radius={10}  // adjust radius as you see fit
    pathOptions={{ color: 'red' }}  // adjust color as you see fit
  >
    <Popup>
      <strong>{item.properties.nom}</strong><br />
      {item.properties.adresse}<br />
      {item.properties.commune}<br />
      <a href={`http://localhost:3000/fiche/${item.properties.id}`} target="_blank" rel="noopener noreferrer">Voir les données complètes</a>
    </Popup>
  </CircleMarker>
))}


        </MapContainer>
      }
      maxHeight={400}
    />
  );
};

export default CpMap;
