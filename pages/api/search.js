import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    const { search } = req.query;
    const keywords = search.split(' ');

    const url = 'https://raw.githubusercontent.com/etienne0101/portrea-js/main/data/locations.geojson'; // URL du fichier geojson

    // Charger les données depuis l'URL du fichier geojson
    const response = await fetch(url);
    const data = await response.json();

    // Filtrer les données en fonction des critères de recherche
    const results = data.features.filter(feature => {
      const properties = feature.properties;
      return keywords.every(keyword =>
        (properties.nom && properties.nom.toLowerCase().includes(keyword.toLowerCase()))
      );
    });

    // Extraire les propriétés souhaitées des résultats
    const extractedResults = results.map(feature => {
      const properties = feature.properties;
      return {
        nom: properties.nom,
        commune: properties.commune,
        id: properties.id
      };
    });

    res.status(200).json(extractedResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};
