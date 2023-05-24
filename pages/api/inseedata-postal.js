import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    const { code_postal } = req.query;

    // fetch the data from the URL
    const response = await fetch('https://raw.githubusercontent.com/etienne0101/portrea-js/main/data/locations.geojson');

    // parse the response as JSON
    const data = await response.json();

    // filter locations by postal code
    const matchingLocations = data.features.filter(feature => feature.properties.code_postal === code_postal);

    // for each matching location, fetch INSEE data
    const inseeDataPromises = matchingLocations.map(async location => {
      const inseeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inseedata?id=${location.properties.id}`);
      const inseeData = await inseeResponse.json();
      return {
        ...location,
        inseeData
      };
    });

    const locationsWithInseeData = await Promise.all(inseeDataPromises);

    res.status(200).json(locationsWithInseeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};
