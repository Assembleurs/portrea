import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export default async function handler(req, res) {
  const comCode = req.query.code;

  if (!comCode) {
    res.status(400).json({ error: 'Missing code parameter' });
    return;
  }

  try {
    const geoResponse = await axios.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=georef-france-iris-millesime%40public&q=&rows=1000&sort=year&facet=epci_name&facet=com_name&facet=iris_name&facet=iris_area_code&facet=com_code&refine.year=2022&refine.com_code=${comCode}`);

    const records = geoResponse.data.records;
    
    const promises = records.map(async (record) => {
      const irisCode = record.fields.iris_code;
      const allocResponse = await axios.get(`${API_BASE_URL}/api/iris/allocations?code=${irisCode}`);
      
      // Vérifiez que nous avons obtenu une réponse valide
      if (allocResponse.status === 200 && allocResponse.data.length > 0) {
        // Fusionnez les données
        return {
          ...record,
          fields: {
            ...record.fields,
            allocations: allocResponse.data[0]
          }
        };
      } else {
        return record;
      }
    });

    const mergedData = await Promise.all(promises);

    res.status(200).json(mergedData);
  } 
  catch (err) {
    console.error(`Error fetching data: ${err}`);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }  
}
