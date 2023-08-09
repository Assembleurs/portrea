import fs from 'fs';
import path from 'path';
import { getComCodes } from "./getComCodes"; 

export default async function handler(req, res) {
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

  // Extract the codeEpci from the query
  const { codeEpci } = req.query;

  if (!codeEpci) {
    res.status(400).json({ error: 'codeEpci parameter is required' });
    return;
  }

  // Fetch comcodes based on codeEpci
  const comcodes = await getComCodes(codeEpci);

  // Fetch and format data for each comcode
  const responseData = comcodes.map(comcode => {
    const data = dataByComCode[comcode];

    if (!data) {
      return { comcode, error: `No data found for comcode: ${comcode}` };
    }

    return data.map(feature => {
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
    
        console.log(`InseecafData added for iris_code: ${feature.properties.iris_code}`); // Add this line for debugging
        feature.properties.inseecafData = inseecafData; // Merge the inseecafData into the properties
      } else {
        console.log(`No inseecafData found for iris_code: ${feature.properties.iris_code}`); // Add this line for debugging
      }
    
      return feature;
    });
    
  }).flat();

  res.status(200).json(responseData);
}
