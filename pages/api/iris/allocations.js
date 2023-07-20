import fs from 'fs';
import path from 'path';

// Chemin vers votre fichier CSV
const csvPath = path.resolve('./data', 'iris/inseecaf2021.csv');

export default function handler(req, res) {
  const irisCode = req.query.code;

  if (!irisCode) {
    res.status(400).json({ error: 'Missing code parameter' });
    return;
  }

  try {
    const data = fs.readFileSync(csvPath, 'utf8');
    
    // Convertir les données CSV en JSON
    const lines = data.split('\n');
    const headers = lines[0].split(';').map(header => header.replace(/"/g, ''));
    const json = lines.slice(1).map(line => {
        const values = line.split(';');
        return headers.reduce((obj, header, index) => {
          // Check that the value exists before trying to call replace()
          if (values[index] !== undefined) {
            obj[header] = values[index].replace(/"/g, ''); // Remove quotes
          } else {
            console.warn(`Missing value for header '${header}' in line: ${line}`);
          }
          return obj;
        }, {});
      });
          
      // Filtrer les données par iris_code
      const filteredData = json.filter(item => item.iris_code === irisCode);


    if (filteredData.length === 0) {
      res.status(404).json({ error: `Data not found for iris_code: ${irisCode}` });
      return;
    }

    res.status(200).json(filteredData);
  } 
  
  catch (err) {
    console.error(`Error reading file from disk: ${err}`);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }  
}
