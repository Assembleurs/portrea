import React, { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';

const FranceServiceOrigin = () => {
  const [map, setMap] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!map) {
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
    axios.get('/api/searchfranceservices')
      .then(response => {
        setOptions(response.data.map(service => service.lib_fs));
      })
      .catch(error => {
        console.error('Erreur de récupération des noms de France Services :', error);
      });
  }, []);

  const handleChangeService = (event) => {
    setSelectedService(event.target.value);
  };

  useEffect(() => {
    if (selectedService) {
      axios.get(`/api/franceservices?name=${encodeURIComponent(selectedService)}`)
        .then(response => {
          const data = response.data;

          map.eachLayer((layer) => {
            if (layer !== map) {
              map.removeLayer(layer);
            }
          });

          // Ré-ajouter la couche de tuiles
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          }).addTo(map);

          data.forEach((item) => {
            const marker = L.marker([item.latitude, item.longitude]).addTo(map);
            marker.bindPopup(`<b>${item.lib_fs}</b><br>${item.adresse}<br>${item.mail}<br>${item.telephone}`);
            map.setView([item.latitude, item.longitude], 14);
          });
        })
        .catch(error => {
          console.error("Erreur de récupération des données :", error);
        });
    }
  }, [selectedService]);

  return (
    <div>
      <h1>Origine des usagers dans les France Services</h1>
      <br></br>
      <label>
        Sélectionnez un France Services :
        <select value={selectedService} onChange={handleChangeService}>
          <option value="">Sélectionner un service</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <br></br>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
};

export default FranceServiceOrigin;
