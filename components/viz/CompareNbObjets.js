import { useState, useEffect } from 'react';

const NbObjets = ({ postalCode }) => {
  const [objectCount, setObjectCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/inseedata-postal?code_postal=${postalCode}`);
      const responseData = await response.json();
      setObjectCount(responseData.length);
    };

    fetchData();
  }, [postalCode]);

  return <p>Nombre d'entités : {objectCount}</p>;
};

export default NbObjets;
