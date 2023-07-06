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
      fetch('/api/iriscode?code=' + code) // Remplacez par le chemin correct vers votre API
        .then((res) => res.json())
        .then((data) => {
          // Filtrez les polygones en fonction du code
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
  
      // Supprimer les anciens polygones de la carte
      map.eachLayer(layer => {
        if (layer instanceof L.Polygon) {
          map.removeLayer(layer);
        }
      });
  
      // Calcul de la valeur minimale et maximale
      const values = data.features.map(feature => feature.properties[selectedVariable]);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
  
      // Nouvelle échelle de couleurs pour les valeurs absolues
      const absoluteColorScale = chroma.scale(['yellow', 'violet']).domain([minValue, maxValue]);
  
      // Nouvelle échelle de couleurs pour les valeurs en pourcentage
      const percentageColorScale = chroma.scale(['yellow', 'violet']).domain([0, 100]);
  
      data.features.forEach((feature) => {
 
        const { coordinates } = feature.geometry;
        const { codgeo } = feature.properties;

        // Inverser les coordonnées : [longitude, latitude] -> [latitude, longitude]
        const invertedCoordinates = coordinates[0][0].map(([lon, lat]) => [lat, lon]);

        const value = feature.properties[selectedVariable]; // Valeur de la variable sélectionnée

        // Mode absolu
        let color;
        if (mode === 'absolute') {
        color = absoluteColorScale(value).hex();
        }

        // Mode pourcentage
        if (mode === 'percentage') {
        const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
        color = percentageColorScale(percentage).hex();
        }

        // Création du polygone avec la couleur appropriée
        const polygon = L.polygon(invertedCoordinates, { fillColor: color, color: 'black', weight: 0.5 }).addTo(map)
          .bindPopup(`${selectedVariable}: ${value}`);

        // Ajouter les limites du polygone aux limites globales
        bounds.extend(polygon.getBounds());
      });

      // Ajuster la vue de la carte pour afficher les polygones
      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
    }
  }, [map, data, selectedVariable, mode]);

  // Fonction pour gérer le changement de la variable sélectionnée
  const handleVariableChange = (event) => {
    setSelectedVariable(event.target.value);
  };

  // Fonction pour gérer le changement du mode sélectionné
  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <div>
      <h1>Données socio-démographiques</h1>
      <div id="map" style={{ height: '400px' }}></div>
      <select value={selectedVariable} onChange={handleVariableChange}>
        <option value="a">a</option>
        <option value="percou">percou</option>
        <option value="ai">ai</option>
        <option value="am">am</option>
        <option value="acssenf">acssenf</option>
        <option value="acavenf">acavenf</option>
        <option value="ac3enf">ac3enf</option>
        <option value="enf">enf</option>
        <option value="enf_2">enf_2</option>
        <option value="enf_3_5">enf_3_5</option>
        <option value="enf_6_10">enf_6_10</option>
        <option value="enf_11_14">enf_11_14</option>
        <option value="enf_15_17">enf_15_17</option>
        <option value="enf_18_24">enf_18_24</option>
        <option value="a_etud">a_etud</option>
        <option value="a_netud_24">a_netud_24</option>
        <option value="aal">aal</option>
        <option value="aapl">aapl</option>
        <option value="aaah">aaah</option>
        <option value="appa">appa</option>
        <option value="arsas">arsas</option>
      </select>
      <label>
        Mode :
        <select value={mode} onChange={handleModeChange}>
          <option value="absolute">Absolu</option>
          <option value="percentage">Pourcentage</option>
        </select>
      </label>
    </div>
  );
};

export default MapCaf;
