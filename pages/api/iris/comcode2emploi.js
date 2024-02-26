// pages/api/iris/comcode2emploi.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Load the datasets
  const contourIrisData = JSON.parse(fs.readFileSync(path.join(process.cwd(), './data/iris/contour-iris.geojson')));
  const inseeemploiData = JSON.parse(fs.readFileSync(path.join(process.cwd(), './data/iris/inseeemploi.json')));

  // Group data by com_code
  const dataByComCode = contourIrisData.features.reduce((acc, feature) => {
    const comCode = feature.properties.com_code;
    if (!acc[comCode]) {
      acc[comCode] = [];
    }
    acc[comCode].push(feature);
    return acc;
  }, {});

  // Index inseeemploiData by iris_code for easy lookup
  const inseeemploiDataByIrisCode = inseeemploiData.reduce((acc, data) => {
    // Ensure iris_code is treated as a string, then check if it starts with '2' and prepend '0' if true
    const irisCodeStr = String(data.iris_code); // Convert to string to ensure .startsWith works
    const irisCode = irisCodeStr.startsWith('2') ? `0${irisCodeStr}` : irisCodeStr;
    acc[irisCode] = data;
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
    // Adjust the iris_code here before looking it up
    const irisCodeStr = String(feature.properties.iris_code); // Ensure iris_code is treated as a string
    const adjustedIrisCode = irisCodeStr.startsWith('2') ? `0${irisCodeStr}` : irisCodeStr;
    let inseeemploiData = inseeemploiDataByIrisCode[adjustedIrisCode];
    
    if (inseeemploiData) {
      inseeemploiData = Object.entries(inseeemploiData).reduce((acc, [key, value]) => {
        if (typeof value === 'number') {
          acc[key] = Math.round(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
    }
    // Ensure the adjusted iris_code is used in the final response
    return { ...feature, properties: { ...feature.properties, iris_code: adjustedIrisCode }, inseeemploiData };
  });

  res.status(200).json(responseData);
}
