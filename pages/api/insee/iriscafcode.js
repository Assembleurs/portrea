import fs from 'fs';
import path from 'path';

// Chemin vers votre fichier GeoJSON
const geojsonPath = path.resolve('./data', 'iris-caf.geojson');

export default function handler(req, res) {
  const codes = req.query.code.split(',');

  if (!codes || codes.length === 0) {
    res.status(400).json({ error: 'Missing code parameter' });
    return;
  }

  try {
    const data = fs.readFileSync(geojsonPath, 'utf8');
    const geojsonData = JSON.parse(data);
    
    // Filtrez les polygones en fonction des codes de commune
    const filteredFeatures = geojsonData.features.filter((feature) => {
      return codes.some((code) => feature.properties.codgeo.startsWith(code));
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
