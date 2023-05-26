import fs from 'fs';
import path from 'path';
import axios from 'axios';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Missing id query parameter' })
  }

  const locations = JSON.parse(fs.readFileSync(path.resolve('./data/locations.geojson'), 'utf8'));

  const locationData = locations.features.find(feature => feature.properties.id === id);

  if (!locationData) {
    return res.status(404).json({ error: 'Location not found' })
  }

  const { latitude, longitude } = locationData.properties;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(`${baseUrl}/api/geo-iris?lat=${latitude}&lon=${longitude}&radius=50000`); // Recherche limitée à 10 km
    const data = response.data;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
