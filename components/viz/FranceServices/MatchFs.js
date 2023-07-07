import React, { useState, useEffect } from 'react';

const MatchFs = ({ communeCode }) => {
  const [map, setMap] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [options, setOptions] = useState([]);
  const [L, setL] = useState(null);
  

  useEffect(() => {
    import('leaflet').then(leaflet => {
      setL(leaflet);
    });
  }, []);

  useEffect(() => {
    let newMap = null;
  
    if (L && document.getElementById('map')) {
      if (!map) {
        newMap = L.map('map').setView([46.603354, 1.888334], 5);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }).addTo(newMap);
        setMap(newMap);
      } else {
        newMap = map;
      }
    }
  
    // Destroy map on unmount
    return () => {
      if (newMap) {
        newMap.remove();
      }
    };
  }, []);
  
  

  useEffect(() => {
    if (communeCode) {
      fetch(`/api/france-services?code=${communeCode}`)
        .then(response => response.json())
        .then(data => {
          setOptions(data);
        });
    }
  }, [communeCode]);

  const handleChangeService = (event) => {
    setSelectedService(event.target.value);
  };

  useEffect(() => {
    if (map && selectedService) {
      const selectedFs = options.find(fs => fs.lib_fs === selectedService);
      if (selectedFs) {
        map.eachLayer((layer) => {
          if (layer !== map) {
            map.removeLayer(layer);
          }
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }).addTo(map);

        const marker = L.marker([selectedFs.latitude, selectedFs.longitude]).addTo(map);
        marker.bindPopup(`<b>${selectedFs.lib_fs}</b><br>${selectedFs.adresse}<br>${selectedFs.mail}<br>${selectedFs.telephone}`);
        map.setView([selectedFs.latitude, selectedFs.longitude], 14);
      }
    }
  }, [map, selectedService, options]);

  return (
    <div>
      <label>
        Sélectionnez un France Services :
        <select value={selectedService} onChange={handleChangeService}>
          <option value="">Sélectionner un service</option>
          {options.map((option, index) => (
            <option key={index} value={option.lib_fs}>
              {option.lib_fs}
            </option>
          ))}
        </select>
      </label>
      <div id="map" style={{ height: '400px', marginTop: '10px' }}></div>
    </div>
  );
};

export default MatchFs;
