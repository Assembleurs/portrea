// pages/api/data.js
import fs from 'fs'
import path from 'path'

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end() 
  }

  // Lire les fichiers geojson
  const iris_caf = JSON.parse(fs.readFileSync(path.resolve('./data/iris-caf.geojson'), 'utf8'))
  const iris_emploi = JSON.parse(fs.readFileSync(path.resolve('./data/iris-emploi.geojson'), 'utf8'))
  const iris_pop = JSON.parse(fs.readFileSync(path.resolve('./data/iris-pop.geojson'), 'utf8'))

  // Jointure des données
  const data = {
    caf: iris_caf.features,
    emploi: iris_emploi.features,
    pop: iris_pop.features
  }

  res.status(200).json(data)
}
