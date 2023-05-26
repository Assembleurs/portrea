import fetch from 'node-fetch';
import { isPointInPolygon } from 'geolib';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end() 
  }

  const { lat, lon } = req.query

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing latitude or longitude query parameters' })
  }

  const locationPoint = { latitude: parseFloat(lat), longitude: parseFloat(lon) };

  const fetchGeoJson = async url => {
    const response = await fetch(url);
    return await response.json();
  };

  const iris_caf = await fetchGeoJson('https://raw.githubusercontent.com/etienne0101/portrea-js/main/data/iris-caf.geojson');
  const iris_emploi = await fetchGeoJson('https://raw.githubusercontent.com/etienne0101/portrea-js/main/data/iris-emploi.geojson');
  const iris_pop = await fetchGeoJson('https://raw.githubusercontent.com/etienne0101/portrea-js/main/data/iris-pop.geojson');

  const getData = (geojsonFile) => {
    return geojsonFile.features.find(feature => {
      if (!feature.geometry || !feature.geometry.coordinates) {
        return false;
      }

      let polygon;
      if (feature.geometry.type === 'Polygon') {
        polygon = feature.geometry.coordinates[0].map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
      } else if (feature.geometry.type === 'MultiPolygon') {
        polygon = feature.geometry.coordinates[0][0].map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
      } else {
        return false;
      }

      return isPointInPolygon(locationPoint, polygon);
    });
  }

  const cafData = getData(iris_caf);
  const emploiData = getData(iris_emploi);
  const popData = getData(iris_pop);

  const data = {
    caf: cafData,
    emploi: emploiData,
    pop: popData
  }

  res.status(200).json(data)
}
