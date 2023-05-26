import fs from 'fs';
import path from 'path';
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

  const iris_caf = JSON.parse(fs.readFileSync(path.resolve('./data/iris-caf.geojson'), 'utf8'));
  const iris_emploi = JSON.parse(fs.readFileSync(path.resolve('./data/iris-emploi.geojson'), 'utf8'));
  const iris_pop = JSON.parse(fs.readFileSync(path.resolve('./data/iris-pop.geojson'), 'utf8')); // use iris-pop.geojson

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
