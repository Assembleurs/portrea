// pages/api/data.js
import fs from 'fs'
import path from 'path'

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end() 
  }

  const { iris } = req.query

  if (!iris) {
    return res.status(400).json({ error: 'Missing iris query parameter' })
  }

  // Lire les fichiers geojson
  const iris_caf = JSON.parse(fs.readFileSync(path.resolve('./data/iris-caf.geojson'), 'utf8'))
  const iris_emploi = JSON.parse(fs.readFileSync(path.resolve('./data/iris-emploi.geojson'), 'utf8'))
  const iris_pop = JSON.parse(fs.readFileSync(path.resolve('./data/iris-pop.geojson'), 'utf8'))

  // Chercher l'iris dans chaque fichier
  const cafData = iris_caf.features.find(feature => feature.properties.codgeo === iris)
  const emploiData = iris_emploi.features.find(feature => feature.properties.codgeo === iris)
  const popData = iris_pop.features.find(feature => feature.properties.iris === iris)

  // Jointure des données
  const data = {
    caf: cafData,
    emploi: emploiData,
    pop: popData
  }

  res.status(200).json(data)
}
