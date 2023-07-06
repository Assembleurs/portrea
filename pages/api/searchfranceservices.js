import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export default function handler(req, res) {
  const csvFilePath = path.resolve('./data/france-services/liste-fs.csv');
  const csvFileContent = fs.readFileSync(csvFilePath, 'utf8');

  Papa.parse(csvFileContent, {
    header: true,
    complete: function (results) {
      const franceServices = results.data.map((row) => row.lib_fs);

      // Vérifiez s'il existe un paramètre de requête `q` et, le cas échéant, filtrez les services.
      const { q } = req.query;
      if (q) {
        const lowerCaseQ = q.toLowerCase();
        const filteredFranceServices = franceServices.filter(service => service.toLowerCase().includes(lowerCaseQ));
        res.status(200).json(filteredFranceServices);
      } else {
        res.status(200).json(franceServices);
      }
    },
    error: function (err) {
      console.error('Une erreur s\'est produite lors de la lecture du fichier CSV :', err);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la lecture du fichier CSV.' });
    }
  });
}
