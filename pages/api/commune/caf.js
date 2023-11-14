// pages/api/iris/comcode2caf.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Chargement des datasets
  const contourIrisData = JSON.parse(fs.readFileSync(path.join(process.cwd(), './data/iris/contour-iris.geojson')));
  const inseecafData = JSON.parse(fs.readFileSync(path.join(process.cwd(), './data/iris/inseecaf.json')));

  // Grouper les données par com_code
  const dataByComCode = contourIrisData.features.reduce((acc, feature) => {
    const comCode = feature.properties.com_code;
    if (!acc[comCode]) {
      acc[comCode] = [];
    }
    acc[comCode].push(feature.properties.iris_code); // On stocke les iris_code correspondant au com_code
    return acc;
  }, {});

  // Indexer inseecafData par iris_code pour une recherche facile
  const inseecafDataByIrisCode = inseecafData.reduce((acc, data) => {
    acc[data.iris_code] = data;
    return acc;
  }, {});

  // Extraire le comcode de la requête
  const { comcode } = req.query;

  if (!comcode) {
    res.status(400).json({ error: 'comcode parameter is required' });
    return;
  }

  const irisCodes = dataByComCode[comcode];

  if (!irisCodes) {
    res.status(404).json({ error: `No data found for comcode: ${comcode}` });
    return;
  }

  const fieldNames = {
    "a": "Nombre total d'allocataires",
    "percou": "Personnes couvertes",
    "ai": "Allocataires isolés sans enfant",
    "am": "Allocataires mono-parent",
    "acssenf": "Allocataires couples sans enfant",
    "acavenf": "Allocataires couples avec enfant(s)",
    "ac3enf": "Allocataires couples avec au moins 3 enfants à charge",
    "enf": "Enfants couverts par au moins une prestation CAF",
    "enf_2": "Enfants de moins de 3 ans",
    "enf_3_5": "Enfants de 3 à moins de 6 ans",
    "enf_6_10": "Enfants de 6 à moins de 11 ans",
    "enf_11_14": "Enfants de 11 à moins de 15 ans",
    "enf_15_17": "Enfants de 15 à moins de 18 ans",
    "enf_18_24": "Enfants de 18 à moins de 25 ans",
    "a_etud": "Allocataires étudiants",
    "a_netud_24": "Allocataires de moins de 25 ans non étudiants",
    "aal": "Allocataires percevant une aide au logement",
    "aapl": "Allocataires percevant l’Aide Personnalisée au Logement",
    "aaah": "Allocataires percevant l’Allocation Adulte Handicapé",
    "appa": "Allocataires percevant la prime d'activité",
    "arsas": "Allocataires percevant le RSA socle"
  };
  
  // Initialisation de l'objet pour la somme
  const sumData = {};

  // Somme des valeurs pour chaque champ des données inseecaf correspondant aux iris_codes
  irisCodes.forEach(iris_code => {
    const data = inseecafDataByIrisCode[iris_code];
    if (data) {
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'number') {
          const fullKeyName = fieldNames[key] || key; // Utilisez le nom complet si disponible
          sumData[fullKeyName] = (sumData[fullKeyName] || 0) + data[key];
        }
      });
    }
  });
  // On retire la clé 'iris_code' et 'note' car elles ne doivent pas être sommées
  delete sumData.iris_code;
  delete sumData.note;

  res.status(200).json(sumData);
}
