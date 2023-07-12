import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dataPath1 = path.join(process.cwd(), 'data/france-services/fs1.json');
  const dataPath2 = path.join(process.cwd(), 'data/france-services/fs2.json');
  const dataPath3 = path.join(process.cwd(), 'data/france-services/fs3.json');

  const data1 = JSON.parse(fs.readFileSync(dataPath1, 'utf8'));
  const data2 = JSON.parse(fs.readFileSync(dataPath2, 'utf8'));
  const data3 = JSON.parse(fs.readFileSync(dataPath3, 'utf8'));

  const allData = [...data1, ...data2, ...data3];

  const codeInseeUsager = req.query.code; // Récupère le paramètre de requête "code"

  // Filtrer les données en fonction du code.insee.usager
  const filteredData = allData.filter((item) => item['code.insee.usager'] === codeInseeUsager);

  // Agréger les données par nom.france.services
  const summaryData = filteredData.reduce((accumulator, item) => {
    const serviceName = item['nom.france.services'];

    // Vérifier si le service existe déjà dans l'accumulateur
    const existingService = accumulator.find((entry) => entry.serviceName === serviceName);

    if (existingService) {
      // Si le service existe, augmenter le compte d'usagers
      existingService.usagers += 1;
    } else {
      // Sinon, ajouter le service avec le compte d'usagers initialisé à 1
      accumulator.push({
        serviceName,
        usagers: 1,
      });
    }

    return accumulator;
  }, []);

  const responseData = summaryData.reduce((result, entry) => {
    result[entry.serviceName] = entry.usagers;
    return result;
  }, {});

  res.status(200).json(responseData); // Renvoie les données agrégées sous forme de réponse JSON
}
