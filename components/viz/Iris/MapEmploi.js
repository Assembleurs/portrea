import { useEffect, useRef, useState } from 'react';
import chroma from 'chroma-js';
import Switch from "react-switch";

const MapEmploi = ({ code, id }) => {
  const mapRef = useRef(null);
  const [data, setData] = useState(null);
  const [selectedVariable, setSelectedVariable] = useState('ABCDE');
  const [mode, setMode] = useState('absolute'); 
  const [showStructures, setShowStructures] = useState(false);

  const [structureData, setStructureData] = useState(null);

  useEffect(() => {
    if (code && showStructures) {
      fetch(`/api/structures/structures-inclusion?irisCode=${code}`)
        .then((res) => res.json())
        .then(setStructureData)
        .catch((error) => {
          console.error('An error occurred while retrieving the structure data:', error);
        });
    } else {
      setStructureData(null);
    }
  }, [code, showStructures]);

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
      fetch('/api/iris/comcode2emploi?comcode=' + code)
        .then((res) => res.json())
        .then((data) => {
          const adjustedData = {
            ...data,
            features: data.map(d => {
              console.log('inseeemploiData', d.inseeemploiData);  
              return {
                ...d,
                properties: d.inseeemploiData,
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

      const values = data.features.filter(feature => feature.properties && feature.properties[selectedVariable])
      .map(feature => feature.properties[selectedVariable]);

      if (values.length === 0) {
      return;
      }     const minValue = Math.min(...values);
            const maxValue = Math.max(...values);

      const absoluteColorScale = chroma.scale(['yellow', 'violet']).domain([minValue, maxValue]);

      const percentageValues = data.features.map(feature => {
        const value = feature.properties[selectedVariable];
        const percValue = feature.properties['ABCDE'];
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
        const percValue = feature.properties['ABCDE'];
      
        let color;
        let popupContent;
        if (!feature.properties || !feature.properties[selectedVariable]) {
          color = 'grey';  // Set to a color indicating missing data
          popupContent = 'Données manquantes';
        } else if (mode === 'absolute') {
          color = absoluteColorScale(value).hex();
          popupContent = `${selectedVariable}: ${value}`;
        } else if (mode === 'percentage' && percValue > 0) {
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

  useEffect(() => {
    const L = require('leaflet');

    if (mapRef.current) {
        mapRef.current.eachLayer(layer => {
            if (layer instanceof L.CircleMarker) {
            mapRef.current.removeLayer(layer);
            }
        });
        
        if (showStructures && structureData) {
            for (let feature of structureData.features) {
              L.circleMarker(feature.geometry.coordinates.reverse(), { color: 'black', radius: 2, fillOpacity: 1 }).addTo(mapRef.current)
              .bindPopup(`${feature.properties.nom}`);
            }
        }
    }
}, [showStructures, structureData]);

const handleShowStructuresChange = (checked) => {
  setShowStructures(checked);
};

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
        <option value="ABCDE">Nombre total de demandeurs d'emploi</option>
        <option value="ABC">Nombre total de demandeurs d'emploi de catégorie A, B ou C</option>
        <option value="A">Nombre total de demandeurs d'emploi de catégorie A</option>
        <option value="ABC_25">Nombre de demandeurs d'emploi de catégorie A, B ou C de moins de 26 ans</option>
        <option value="ABC_50">Nombre de demandeurs d'emploi de catégorie A, B ou C de 50 ans et plus</option>
        <option value="ABC_E">Nombre de demandeurs d'emploi de catégorie A, B ou C de nationalité étrangère</option>
        <option value="ABC_INFCAPBEP">Nombre de demandeurs d'emploi A, B ou C de niveau de formation inférieur au CAP-BEP</option>
        <option value="ABC_Dur4">Nombre de demandeurs d'emploi A, B ou C d'ancienneté au chômage d'au moins 2 ans</option>
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
            handleDiameter={15}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={15}
            width={30}
            className="react-switch"
        />
        <span style={{ marginLeft: 10 }}>Pourcentage</span>
        </div>
      </label>
      <label htmlFor="show-structures-switch">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: 10 }}>Cacher les structures</span>
    <Switch 
      onChange={handleShowStructuresChange} 
      checked={showStructures} 
      id="show-structures-switch"
      onColor="#86d3ff"
      onHandleColor="#2693e6"
      handleDiameter={15}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={15}
      width={30}
      className="react-switch"
    />
    <span style={{ marginLeft: 10 }}>Afficher les structures</span>
  </div>
</label>
      </div>
      <div style={{ height: '400px', marginTop: '20px' }}>
        <div id={id} style={{ position: 'relative', height: '100%' }}></div>
      </div>
    </div>
  );
};

export default MapEmploi;