import fs from 'fs';

export default async (req, res) => {
  try {
    const { search } = req.query;
    const keywords = search.split(' ');

    const filePath = 'data/locations.geojson'; // Chemin vers le fichier geojson

    // Charger les données depuis le fichier geojson
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);

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
