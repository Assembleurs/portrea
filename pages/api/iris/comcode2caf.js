// pages/api/iris/comcode2caf.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Load the datasets
  const contourIrisData = JSON.parse(fs.readFileSync(path.join(process.cwd(), './data/iris/contour-iris.geojson')));
  const inseecafData = JSON.parse(fs.readFileSync(path.join(process.cwd(), './data/iris/inseecaf.json')));

  // Group data by com_code
  const dataByComCode = contourIrisData.features.reduce((acc, feature) => {
    const comCode = feature.properties.com_code;
    if (!acc[comCode]) {
      acc[comCode] = [];
    }
    acc[comCode].push(feature);
    return acc;
  }, {});

  // Index inseecafData by iris_code for easy lookup
  const inseecafDataByIrisCode = inseecafData.reduce((acc, data) => {
    acc[data.iris_code] = data;
    return acc;
  }, {});

  // Extract the comcode from the query
  const { comcode } = req.query;

  if (!comcode) {
    res.status(400).json({ error: 'comcode parameter is required' });
    return;
  }

  const data = dataByComCode[comcode];

  if (!data) {
    res.status(404).json({ error: `No data found for comcode: ${comcode}` });
    return;
  }

  const responseData = data.map(feature => {
    let inseecafData = inseecafDataByIrisCode[feature.properties.iris_code];
    if (inseecafData) {
      inseecafData = Object.entries(inseecafData).reduce((acc, [key, value]) => {
        if (typeof value === 'number') {
          acc[key] = Math.round(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
    }
    return { ...feature, inseecafData };
  });
  

  res.status(200).json(responseData);
}
