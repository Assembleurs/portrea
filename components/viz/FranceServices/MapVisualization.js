import { useEffect, useState } from 'react';
import L from 'leaflet';
import axios from 'axios';

export default function MapVisualization() {
  const [map, setMap] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
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
    const fetchFranceServices = async () => {
      try {
        const response = await axios.get('/api/searchfranceservices');
        const franceServices = response.data;
        setOptions(franceServices);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des noms de France Services :', error);
      }
    };
    
    fetchFranceServices();
  }, []);

  const handleChangeService = (event) => {
    setSelectedService(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!map || !selectedService) {
      return;
    }

    try {
      const response = await axios.get(`/api/franceservices?name=${encodeURIComponent(selectedService)}`);
      const data = response.data;

      map.eachLayer((layer) => {
        if (layer !== map) {
          map.removeLayer(layer);
        }
      });

      // Re-add the tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      }).addTo(map);

      data.forEach((item) => {
        const { communeUsager, coordonnees_gps, usagers } = item;
        const { lon, lat } = coordonnees_gps;

        if (lon && lat) {
          let radius = 0;
          let fillColor = '#FFFFFF';

          if (usagers >= 0 && usagers <= 1) {
            radius = 100;
            fillColor = '#FFFFCC';
          } else if (usagers >= 2 && usagers <= 4) {
            radius = 200;
            fillColor = '#FFFF99';
          } else if (usagers >= 5 && usagers <= 10) {
            radius = 300;
            fillColor = '#FFCC66';
          } else if (usagers >= 11 && usagers <= 50) {
            radius = 400;
            fillColor = '#FF9933';
          } else if (usagers >= 51 && usagers <= 100) {
            radius = 500;
            fillColor = '#FF6600';
          } else if (usagers >= 101 && usagers <= 300) {
            radius = 600;
            fillColor = '#FF3300';
          } else if (usagers >= 301 && usagers <= 600) {
            radius = 700;
            fillColor = '#CC0033';
          } else if (usagers >= 601 && usagers <= 1000) {
            radius = 800;
            fillColor = '#990033';
          } else if (usagers > 1000) {
            radius = 900;
            fillColor = '#660033';
          }

          const circle = L.circle([lat, lon], {
            radius: radius,
            fillColor: fillColor,
            fillOpacity: 0.6,
            color: '#000',
            weight: 0,
          }).addTo(map);
          circle.bindPopup(`Commune : ${communeUsager}<br>Nombre d'usagers : ${usagers}`);
        }
      });
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données :", error);
    }
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(selectedService.toLowerCase())
  );

  return (
    <div>
      <h1>Origine des usagers dans les France Services</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>
          Sélectionnez un France Services :
          <input
            type="text"
            value={selectedService}
            onChange={handleChangeService}
            list="france-services"
          />
          <datalist id="france-services">
            {filteredOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </datalist>
        </label>
        <button type="submit">Afficher sur la carte</button>
      </form>
      <br></br>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
}
