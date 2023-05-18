import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ips = ({ location }) => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await axios.get('data/ips-france.json');
      setSchools(response.data);
    };

    fetchSchools();
  }, []);

  const calculateDistance = (location1, location2) => {
    // Implémentez ici une fonction pour calculer la distance entre deux points.
    // Vous pouvez utiliser la formule de Haversine pour calculer la distance entre deux points sur la surface de la Terre.
  };

  const nearbySchools = schools.filter(school => 
    calculateDistance(location, { latitude: school.latitude, longitude: school.longitude }) <= 0.5
  );

  const averageIps = nearbySchools.reduce((sum, school) => sum + school.ips, 0) / (nearbySchools.length || 1);

  return (
    <div>
      <p>Nombre d'écoles à moins de 500 mètres : {nearbySchools.length}</p>
      <p>Indice de position sociale moyen : {averageIps.toFixed(2)}</p>
    </div>
  );
};

export default Ips;
