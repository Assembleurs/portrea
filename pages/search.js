import { useState, useEffect } from 'react';
import SearchBar from '../components/nav/SearchBar';
import Gallery from '../components/nav/Gallery';

export default function App() {
  const [objects, setObjects] = useState([]);

  const handleSearch = async search => {
    const response = await fetch(`/api/search?search=${search}`);
    const data = await response.json();
    setObjects(data);
  };

  useEffect(() => {
    handleSearch('');  // envoi d'une requête d'API sans paramètres de recherche pour obtenir toutes les données
  }, []);  // le tableau vide en deuxième argument garantit que l'effet n'est déclenché qu'au montage du composant

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Gallery objects={objects} />
    </div>
  );
}
