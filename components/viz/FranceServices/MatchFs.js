import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';

const MatchFs = ({ code }) => {
  const mapRef = useRef(null);
  const [L, setL] = useState(null);
  const [map, setMap] = useState(null);
  const [franceServices, setFranceServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [usagersData, setUsagersData] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then(leaflet => {
        setL(leaflet);
      });
    }
  }, []);

  useEffect(() => {
    if (L && !map && mapRef.current) {
      const newMap = L.map(mapRef.current).setView([50.603354, 2.888334], 9);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      }).addTo(newMap);
      setMap(newMap);
    }
  }, [L, map]);

  useEffect(() => {
    const fetchFranceServices = async () => {
      try {
        const response = await axios.get(`/api/searchfranceservices?code=${code}`);
        setFranceServices(response.data);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des France Services :", error);
      }
    };
    fetchFranceServices();
  }, [code]);

  useEffect(() => {
    if (selectedService) {
      const fetchUsagersData = async () => {
        try {
          const encodedServiceName = encodeURIComponent(selectedService);
          const response = await axios.get(`/api/franceservices?name=${encodedServiceName}`);
          setUsagersData(response.data);
        } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération des données d'usagers :", error);
        }
      };
      fetchUsagersData();
    }
  }, [selectedService]);

  useEffect(() => {
    if (map && L && usagersData.length > 0) {
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

      usagersData.forEach((item) => {
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
    }
  }, [map, L, usagersData]);

  const handleChangeService = (event) => {
    setSelectedService(event.target.value);
  };

  return (
    <div>
      <label>
        Sélectionnez un France Services :
        <select value={selectedService} onChange={handleChangeService}>
          <option value="">Sélectionner un service</option>
          {franceServices.map((service) => (
            <option key={service.id_fs} value={service.lib_fs}>
              {service.lib_fs}
            </option>
          ))}
        </select>
      </label>
      <div id="map" ref={mapRef} style={{ height: '400px', marginTop: '10px' }}></div>
    </div>
  );
};

export default MatchFs;
