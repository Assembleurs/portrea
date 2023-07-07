import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import chroma from 'chroma-js';

const MapCaf = ({ code }) => {
  const [map, setMap] = useState(null);
  const [data, setData] = useState(null);
  const [selectedVariable, setSelectedVariable] = useState('a'); // Variable sélectionnée par défaut
  const [mode, setMode] = useState('absolute'); // Mode sélectionné : 'absolute' ou 'percentage'

  useEffect(() => {
    const L = require('leaflet');

    if (!map && document.getElementById('map')) {
      const newMap = L.map('map').setView([50.603354, 3.888334], 9);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      }).addTo(newMap);
      setMap(newMap);
    }
  }, [map]);

  useEffect(() => {
    if (code) {
      fetch('/api/iriscode?code=' + code)
        .then((res) => res.json())
        .then((data) => {
          const filteredData = data.features.filter(feature => feature.properties.codgeo.startsWith(code));
          setData({ ...data, features: filteredData });
        })
        .catch((error) => {
          console.error('Une erreur s\'est produite lors de la récupération des données:', error);
        });
    }
  }, [code]);

  useEffect(() => {
    if (map && data) {
      const bounds = L.latLngBounds();

      map.eachLayer(layer => {
        if (layer instanceof L.Polygon) {
          map.removeLayer(layer);
        }
      });

      const values = data.features.map(feature => feature.properties[selectedVariable]);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);

      const absoluteColorScale = chroma.scale(['yellow', 'violet']).domain([minValue, maxValue]);

      const percentageValues = data.features.map(feature => {
        const value = feature.properties[selectedVariable];
        const percValue = feature.properties['percou'];
        if (percValue > 0) {
          return (value / percValue) * 100;
        } else {
          return 0;
        }
      });
      const minPercentage = Math.min(...percentageValues);
      const maxPercentage = Math.max(...percentageValues);
      const percentageColorScale = chroma.scale(['yellow', 'violet']).domain([minPercentage, maxPercentage]);

      data.features.forEach((feature) => {
        const { coordinates } = feature.geometry;
        const invertedCoordinates = coordinates[0][0].map(([lon, lat]) => [lat, lon]);
      
        const value = feature.properties[selectedVariable];
        const percValue = feature.properties['percou'];
      
        let color;
        let popupContent;
        if (mode === 'absolute') {
          color = absoluteColorScale(value).hex();
          popupContent = `${selectedVariable}: ${value}`;
        }
      
        if (mode === 'percentage' && percValue > 0) {
          const percentage = (value / percValue) * 100;
          color = percentageColorScale(percentage).hex();
          popupContent = `${selectedVariable}: ${value} (${percentage.toFixed(2)}%)`;
        }
      
        const polygon = L.polygon(invertedCoordinates, { fillColor: color, color: 'black', weight: 0.5 }).addTo(map)
          .bindPopup(popupContent);
      
        bounds.extend(polygon.getBounds());
      });      

      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
    }
  }, [map, data, selectedVariable, mode]);

  const handleVariableChange = (event) => {
    setSelectedVariable(event.target.value);
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <div>
        <br></br>
      <select value={selectedVariable} onChange={handleVariableChange}>
        <option value="a">Nombre total d'allocataires</option>
        <option value="percou">Personnes couvertes</option>
        <option value="ai">Allocataires isolés sans enfant</option>
        <option value="am">Allocataires mono-parent</option>
        <option value="acssenf">Allocataires couples sans enfant</option>
        <option value="acavenf">Allocataires couples avec enfant(s)</option>
        <option value="ac3enf">Allocataires couples avec au moins 3 enfants à charge</option>
        <option value="enf">Enfants couverts par au moins une prestation CAF</option>
        <option value="enf_2">Enfants de moins de 3 ans</option>
        <option value="enf_3_5">Enfants de 3 à moins de 6 ans</option>
        <option value="enf_6_10">Enfants de 6 à moins de 11 ans</option>
        <option value="enf_11_14">Enfants de 11 à moins de 15 ans</option>
        <option value="enf_15_17">Enfants de 15 à moins de 18 ans</option>
        <option value="enf_18_24">Enfants de 18 à moins de 25 ans</option>
        <option value="a_etud">Allocataires étudiants</option>
        <option value="a_netud_24">Allocataires de moins de 25 ans non étudiants</option>
        <option value="aal">Allocataires percevant une aide au logement</option>
        <option value="aapl">Allocataires percevant l’Aide Personnalisée au Logement</option>
        <option value="aaah">Allocataires percevant l’Allocation Adulte Handicapé</option>
        <option value="appa">Allocataires percevant la prime d'activité</option>
        <option value="arsas">Allocataires percevant le RSA socle</option>
      </select>
      <label>
        Mode :
        <select value={mode} onChange={handleModeChange}>
          <option value="absolute">Absolu</option>
          <option value="percentage">Pourcentage</option>
        </select>
      </label>
      <br></br>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
};

export default MapCaf;
