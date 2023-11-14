import React, { useState, useEffect } from 'react'
import styles from '../styles/Compare.module.css'
import Layout from '../components/Layout'

function CommuneSearch({ onAdd, selectedCommunes }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (searchTerm.length > 1) {
      const url = `https://geo.api.gouv.fr/communes?nom=${searchTerm}&fields=nom,code&limit=6&format=json&geometry=centre`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const filteredSuggestions = data.filter(
            (d) => !selectedCommunes.some((commune) => commune.code === d.code)
          )
          setSuggestions(filteredSuggestions)
        })
        .catch((error) => {
          console.error(
            'Erreur lors de la récupération des suggestions :',
            error
          )
        })
    } else {
      setSuggestions([])
    }
  }, [searchTerm, selectedCommunes])

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Ajouter une commune"
        aria-label="Recherche de ville"
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((commune) => (
            <li
              key={commune.code}
              onClick={() => {
                onAdd(commune)
                setSearchTerm('')
                setSuggestions([])
              }}
              className={styles.suggestionItem}
            >
              {commune.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function CommuneCafPage() {
  const [selectedCommunes, setSelectedCommunes] = useState([])
  const [communeData, setCommuneData] = useState({})
  const [proportions, setProportions] = useState({})

  const handleAddCommune = (commune) => {
    if (!selectedCommunes.find((c) => c.code === commune.code)) {
      fetch(`/api/commune/caf?comcode=${commune.code}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedCommunes([...selectedCommunes, commune])
          setCommuneData((prevData) => ({
            ...prevData,
            [commune.code]: data
          }))
        })
        .catch((error) => {
          console.error(
            'Erreur lors de la récupération des données CAF :',
            error
          )
        })
    }
  }

  const handleRemoveCommune = (code) => {
    setSelectedCommunes(
      selectedCommunes.filter((commune) => commune.code !== code)
    )
    const newData = { ...communeData }
    delete newData[code]
    setCommuneData(newData)
  }

  useEffect(() => {
    let newProportions = calculateProportions(communeData)
    setProportions(newProportions)
  }, [communeData])

  function calculateProportions(data) {
    let proportions = {}
    for (const [code, values] of Object.entries(data)) {
      let personnesCouvertes = values['Personnes couvertes']
      proportions[code] = {}
      for (const [key, value] of Object.entries(values)) {
        if (key !== 'Personnes couvertes') {
          proportions[code][key] = value / personnesCouvertes
        }
      }
    }
    return proportions
  }

  function determineCellStyle(communeCode, indicator) {
    if (!proportions[communeCode] || !proportions[communeCode][indicator]) {
      return 'dataCell' // Classe par défaut pour les cellules sans données
    }

    let values = Object.values(proportions).map((p) => p[indicator])
    let max = Math.max(...values)
    let min = Math.min(...values)
    let communeValue = proportions[communeCode][indicator]

    if (communeValue === max) {
      return 'highValue' // Classe pour la valeur la plus élevée
    } else if (communeValue === min) {
      return 'lowValue' // Classe pour la valeur la plus faible
    }
    return 'dataCell' // Classe par défaut
  }

  return (
    <Layout>
      <div>
        <br></br>
        <div className={styles.pageTitle}>
          📊 Comparer les données des communes
        </div>
        <div className={styles.docText}>
          Ce comparateur permet d'obtenir le nombre de personnes concernées par
          un dispositif d'allocations. <br></br> <br></br>Les codes couleurs permettent de
          positionner les villes entre-elle (proportion parmis les personnes
          couvertes) : <br></br> <br></br> 🟢 La proportion la plus faible <br></br><br></br> 
          🔴 La proportion la plus haute
        </div>
        <CommuneSearch
          onAdd={handleAddCommune}
          selectedCommunes={selectedCommunes}
        />
        <div className={styles.container}>
          {Object.keys(communeData).length > 0 && (
            <table className={styles.compareTable}>
              <thead>
                <tr className={styles.tableRow}>
                  <th>Indicateur</th>
                  {selectedCommunes.map((commune) => (
                    <th key={commune.code} className={styles.communeHeader}>
                      {commune.nom}
                      <span
                        onClick={() => handleRemoveCommune(commune.code)}
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                      >
                        🆇
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(communeData[selectedCommunes[0]?.code] || {}).map(
                  (key) => (
                    <tr key={key} className={styles.indicatorRow}>
                      <td className={styles.indicatorCell}>{key}</td>
                      {selectedCommunes.map((commune) => (
                        <td className={styles.tableCell} key={commune.code}>
                          {communeData[commune.code] &&
                          proportions[commune.code] ? (
                            <span
                              className={
                                styles[determineCellStyle(commune.code, key)]
                              }
                            >
                              {communeData[commune.code][key]}
                              <span
                                style={{
                                  fontStyle: 'italic',
                                  color: '#343a40',
                                  fontSize: '12px',
                                  marginLeft: '10px'
                                }}
                              >
                                {`${(
                                  proportions[commune.code][key] * 100
                                ).toFixed(2)}%`}
                              </span>
                            </span>
                          ) : (
                            'Chargement...'
                          )}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CommuneCafPage
