import { useEffect, useState } from 'react';
import Switch from "react-switch";
import chroma from 'chroma-js';

const MapCaf = ({ code, id }) => {
  const [map, setMap] = useState(null);
  const [data, setData] = useState(null);
  const [selectedVariable, setSelectedVariable] = useState('a'); // Variable sélectionnée par défaut
  const [mode, setMode] = useState('absolute'); // Mode sélectionné : 'absolute' ou 'percentage'

  useEffect(() => {
    const L = require('leaflet');

    if (!map && document.getElementById(id)) {
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
      fetch('/api/iris/comcode2caf?comcode=' + code)
        .then((res) => res.json())
        .then((data) => {
          const adjustedData = {
            ...data,
            features: data.map(d => ({
              ...d,
              properties: d.inseecafData,
            }))
          };
          setData(adjustedData);
        })
        .catch((error) => {
          console.error('An error occurred while retrieving the data:', error);
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
        let invertedCoordinates;
        if (feature.geometry.type === 'MultiPolygon') {
          invertedCoordinates = feature.geometry.coordinates[0][0].map(([lon, lat]) => [lat, lon]);
        } else if (feature.geometry.type === 'Polygon') {
          invertedCoordinates = feature.geometry.coordinates[0].map(([lon, lat]) => [lat, lon]);
        } else {
          console.error('Unknown geometry type:', feature.geometry.type);
          return;
        }
      
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

  const handleModeChange = (checked) => {
    setMode(checked ? "percentage" : "absolute");
  };  

  return (
    <div id={id}>
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
      <label htmlFor="mode-switch">
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 10 }}>Valeur Absolue</span>
        <Switch 
            onChange={handleModeChange} 
            checked={mode === "percentage"} 
            id="mode-switch"
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
        />
        <span style={{ marginLeft: 10 }}>Pourcentage</span>
        </div>
      </label>
      <br></br>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
};

export default MapCaf;