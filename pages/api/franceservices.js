import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dataPath1 = path.join(process.cwd(), 'data/fs1.json');
  const dataPath2 = path.join(process.cwd(), 'data/fs2.json');
  const dataPath3 = path.join(process.cwd(), 'data/fs3.json');

  const data1 = JSON.parse(fs.readFileSync(dataPath1, 'utf8'));
  const data2 = JSON.parse(fs.readFileSync(dataPath2, 'utf8'));
  const data3 = JSON.parse(fs.readFileSync(dataPath3, 'utf8'));

  const allData = [...data1, ...data2, ...data3];

  const serviceName = req.query.name; // Récupère le paramètre de requête "name"

  // Filtrer les données en fonction du nom de service
  const filteredData = allData.filter((item) => item['nom.france.services'] === serviceName);

  // Agréger les données par commune
  const summaryData = filteredData.reduce((accumulator, item) => {
    const communeUsager = item['commune.usager'];
    const codeInseeUsager = item['code.insee.usager'];
    const { lon, lat } = item.coordonnees_gps;

    // Vérifier si la commune existe déjà dans l'accumulateur
    const existingCommune = accumulator.find(
      (entry) => entry.communeUsager === communeUsager && entry.codeInseeUsager === codeInseeUsager
    );

    if (existingCommune) {
      // Si la commune existe, augmenter le nombre d'usagers
      existingCommune.usagers += 1;
    } else {
      // Sinon, ajouter la commune avec les coordonnées et le nombre d'usagers initialisé à 1
      accumulator.push({
        communeUsager,
        codeInseeUsager,
        coordonnees_gps: { lon, lat },
        usagers: 1,
      });
    }

    return accumulator;
  }, []);

  res.status(200).json(summaryData); // Renvoie les données résumées sous forme de réponse JSON
}
