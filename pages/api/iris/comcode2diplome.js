// pages/api/iris/comcode2emploi.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  
  // Load the datasets
  const contourIrisData = JSON.parse(fs.readFileSync(path.join(process.cwd(), './data/iris/contour-iris.geojson')));
  const inseediplomeData = JSON.parse(fs.readFileSync(path.join(process.cwd(), './data/iris/inseediplome.json')));

  // Group data by com_code
  const dataByComCode = contourIrisData.features.reduce((acc, feature) => {
    const comCode = feature.properties.com_code;
    if (!acc[comCode]) {
      acc[comCode] = [];
    }
    acc[comCode].push(feature);
    return acc;
  }, {});

  const inseediplomeDataByIrisCode = inseediplomeData.reduce((acc, data) => {
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
    // Adjust iris_code in feature properties if it starts with '2'
    const adjustedIrisCode = feature.properties.iris_code.startsWith('2') ? `0${feature.properties.iris_code}` : feature.properties.iris_code;
    let inseediplomeData = inseediplomeDataByIrisCode[adjustedIrisCode];
    if (inseediplomeData) {
      inseediplomeData = Object.entries(inseediplomeData).reduce((acc, [key, value]) => {
        if (typeof value === 'number') {
          acc[key] = Math.round(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
    }
    return { ...feature, properties: {...feature.properties, iris_code: adjustedIrisCode}, inseediplomeData };
  });

  res.status(200).json(responseData);
}
