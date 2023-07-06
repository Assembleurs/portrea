import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    // fetch the data from the URL
    const response = await fetch('https://raw.githubusercontent.com/etienne0101/portrea-js/main/data/locations.geojson');

    // parse the response as JSON
    const data = await response.json();

    const location = data.features.find(feature => feature.properties.id === id);

    if (!location) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }

    // prepare the coordinates for the external API request
    const { coordinates } = location.geometry;
    const coordString = `POINT (${coordinates[0]} ${coordinates[1]})`;

    // fetch the data from the external API
    const apiData = await fetch(`https://public.opendatasoft.com/api/explore/v2.0/catalog/datasets/demographyref-france-donnees-carroyees-200m-millesime/records?&where=distance(geo_point_2d,%20GEOM'${encodeURIComponent(coordString)}',%20260m)&limit=12&offset=0&timezone=UTC`)
      .then(response => response.json());

    // calculate distance between point of interest and each record
    function calculateDistance(point1, point2) {
        const dx = point1[0] - point2[0];  // différence en longitude
        const dy = point1[1] - point2[1];  // différence en latitude
      
        // retourner la distance euclidienne
        return Math.sqrt(dx * dx + dy * dy);
    }
  
    apiData.records.forEach(record => {
      if (record.fields && record.fields.geo_point_2d) {
        const recordPoint = [record.fields.geo_point_2d.lon, record.fields.geo_point_2d.lat];
        record.distance = calculateDistance(coordinates, recordPoint);  
      }
    });

    // sort records by distance
    apiData.records.sort((a, b) => a.distance - b.distance);

    // take the first 9 records
    const nearestRecords = apiData.records.slice(0, 30);

    res.status(200).json(nearestRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
