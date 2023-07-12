import fs from 'fs';
import path from 'path';

// Chemin vers votre fichier GeoJSON
const geojsonPath = path.resolve('./data/structures', 'structures-inclusion.geojson');

export default function handler(req, res) {
  const irisCode = req.query.irisCode;

  if (!irisCode) {
    res.status(400).json({ error: 'Missing irisCode parameter' });
    return;
  }

  try {
    const data = fs.readFileSync(geojsonPath, 'utf8');
    const geojsonData = JSON.parse(data);

    // Filtrez les structures en fonction de l'iris-code
    const filteredFeatures = geojsonData.features.filter((feature) => {
      const structureIrisCode = feature.properties.iris_code;
      return structureIrisCode && structureIrisCode.startsWith(irisCode);
    });

    // Créez un nouvel objet GeoJSON avec les entités filtrées
    const filteredData = {
      type: 'FeatureCollection',
      features: filteredFeatures,
    };

    res.status(200).json(filteredData);
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
    res.status(500).json({ error: 'Server error' });
  }
}
