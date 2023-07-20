import { useEffect, useRef, useState } from 'react';
import chroma from 'chroma-js';
import Switch from "react-switch";

const MapPop = ({ code, id }) => {
  const mapRef = useRef(null);
  const [data, setData] = useState(null);
  const [selectedVariable, setSelectedVariable] = useState('p19_pop');
  const [mode, setMode] = useState('absolute'); 

  useEffect(() => {
    const L = require('leaflet');

    if (!mapRef.current && document.getElementById(id)) {
      const newMap = L.map(id).setView([50.603354, 3.888334], 9);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      }).addTo(newMap);
      mapRef.current = newMap;
    }
  }, [id]);

  useEffect(() => {
    if (code) {
      fetch('/api/iris/comcode2pop?comcode=' + code)
        .then((res) => res.json())
        .then((data) => {
          const adjustedData = {
            ...data,
            features: data.map(d => {
              console.log('inseepopData', d.inseepopData);  // Check the content of inseecafData
              return {
                ...d,
                properties: d.inseepopData,
              };
            })
          };
          setData(adjustedData);
        })
        .catch((error) => {
          console.error('An error occurred while retrieving the data:', error);
        });
    }
  }, [code]);
  

  useEffect(() => {
    const L = require('leaflet');
    if (mapRef.current && data) {
      const bounds = L.latLngBounds();

      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.Polygon) {
          mapRef.current.removeLayer(layer);
        }
      });

      const values = data.features.map(feature => feature.properties[selectedVariable]);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);

      const absoluteColorScale = chroma.scale(['yellow', 'violet']).domain([minValue, maxValue]);

      const percentageValues = data.features.map(feature => {
        const value = feature.properties[selectedVariable];
        const percValue = feature.properties['p19_pop'];
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
        const percValue = feature.properties['p19_pop'];
      
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
      
        const polygon = L.polygon(invertedCoordinates, { fillColor: color, color: 'black', weight: 0.5 }).addTo(mapRef.current)
        .bindPopup(popupContent);
            
        bounds.extend(polygon.getBounds());
      });      

      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds);
      }      
    }
  }, [id, data, selectedVariable, mode]);

  const handleVariableChange = (event) => {
    setSelectedVariable(event.target.value);
  };

  const handleModeChange = (checked) => {
    setMode(checked ? "percentage" : "absolute");
  };  

  return (
    <div>
    <br></br>
<div style={{ zIndex: 1 }}>
  <select value={selectedVariable} onChange={handleVariableChange}>
        <option value="p19_pop">Population</option>
        <option value="p19_poph">Nombre d'hommes</option>
        <option value="p19_popf">Nombre de femmes</option>
        <option value="c19_pop15p">Population de 15 ans ou plus</option>
        <option value="c19_pop15p_cs1">Population de 15 ans ou plus : Agriculteurs exploitants</option>
        <option value="c19_pop15p_cs2">Population de 15 ans ou plus : Artisans, commerçants et chefs d'entreprise</option>
        <option value="c19_pop15p_cs3">Population de 15 ans ou plus : Cadres et professions intellectuelles supérieures</option>
        <option value="c19_pop15p_cs4">Population de 15 ans ou plus : Professions intermédiaires</option>
        <option value="c19_pop15p_cs5">Population de 15 ans ou plus : Employés</option>
        <option value="c19_pop15p_cs6">Population de 15 ans ou plus : Ouvriers</option>
        <option value="c19_pop15p_cs7">Population de 15 ans ou plus : Retraités</option>
        <option value="c19_pop15p_cs8">Population de 15 ans ou plus : Personnes sans activité professionnelle</option>
        <option value="p19_pop_fr">Population de nationalité française</option>
        <option value="p19_pop_etr">Population de nationalité étrangère</option>
        <option value="p19_pop_imm">Population immigrée</option>
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
      </div>
      <div style={{ height: '400px', marginTop: '20px' }}>
        <div id={id} style={{ position: 'relative', height: '100%' }}></div>
      </div>
    </div>
  );
};

export default MapPop;