import { useEffect, useRef, useState } from 'react'
import chroma from 'chroma-js'
import styles from '../../../styles/Dataviz.module.css'

const MapPop = ({ code, id }) => {
  const mapRef = useRef(null)
  const [data, setData] = useState(null)
  const [selectedVariable, setSelectedVariable] = useState('p19_pop')
  const [mode, setMode] = useState('absolute')
  const [showStructures, setShowStructures] = useState(false)

  const [structureData, setStructureData] = useState(null)

  useEffect(() => {
    if (code && showStructures) {
      fetch(`/api/structures/structures-inclusion?irisCode=${code}`)
        .then((res) => res.json())
        .then(setStructureData)
        .catch((error) => {
          console.error(
            'An error occurred while retrieving the structure data:',
            error
          )
        })
    } else {
      setStructureData(null)
    }
  }, [code, showStructures])

  useEffect(() => {
    const L = require('leaflet')

    if (!mapRef.current && document.getElementById(id)) {
      const newMap = L.map(id).setView([50.603354, 3.888334], 9)
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        }
      ).addTo(newMap)
      mapRef.current = newMap
    }
  }, [id])

  useEffect(() => {
    if (code) {
      fetch('/api/iris/comcode2pop?comcode=' + code)
        .then((res) => res.json())
        .then((data) => {
          const adjustedData = {
            ...data,
            features: data.map((d) => {
              console.log('inseepopData', d.inseepopData) // Check the content of inseecafData
              return {
                ...d,
                properties: d.inseepopData
              }
            })
          }
          setData(adjustedData)
        })
        .catch((error) => {
          console.error('An error occurred while retrieving the data:', error)
        })
    }
  }, [code])

  useEffect(() => {
    const L = require('leaflet')
    if (mapRef.current && data) {
      const bounds = L.latLngBounds()

      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polygon) {
          mapRef.current.removeLayer(layer)
        }
      })

      const values = data.features.map(
        (feature) => feature.properties[selectedVariable]
      )
      const minValue = Math.min(...values)
      const maxValue = Math.max(...values)

      const absoluteColorScale = chroma
        .scale(['yellow', 'violet'])
        .domain([minValue, maxValue])

      const percentageValues = data.features.map((feature) => {
        const value = feature.properties[selectedVariable]
        const percValue = feature.properties['p19_pop']
        if (percValue > 0) {
          return (value / percValue) * 100
        } else {
          return 0
        }
      })
      const minPercentage = Math.min(...percentageValues)
      const maxPercentage = Math.max(...percentageValues)
      const percentageColorScale = chroma
        .scale(['yellow', 'violet'])
        .domain([minPercentage, maxPercentage])

      data.features.forEach((feature) => {
        let invertedCoordinates
        if (feature.geometry.type === 'MultiPolygon') {
          invertedCoordinates = feature.geometry.coordinates[0][0].map(
            ([lon, lat]) => [lat, lon]
          )
        } else if (feature.geometry.type === 'Polygon') {
          invertedCoordinates = feature.geometry.coordinates[0].map(
            ([lon, lat]) => [lat, lon]
          )
        } else {
          console.error('Unknown geometry type:', feature.geometry.type)
          return
        }

        const value = feature.properties[selectedVariable]
        const percValue = feature.properties['p19_pop']

        let color
        let popupContent
        if (mode === 'absolute') {
          color = absoluteColorScale(value).hex()
          popupContent = `${value}`
        }

        if (mode === 'percentage' && percValue > 0) {
          const percentage = (value / percValue) * 100
          color = percentageColorScale(percentage).hex()
          popupContent = `${value} (${percentage.toFixed(2)}%)`
        }

        const polygon = L.polygon(invertedCoordinates, {
          fillColor: color,
          color: 'black',
          weight: 0.5
        })
          .addTo(mapRef.current)
          .bindPopup(popupContent)

        bounds.extend(polygon.getBounds())
      })

      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds)
      }
    }
  }, [id, data, selectedVariable, mode])

  useEffect(() => {
    const L = require('leaflet')

    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          mapRef.current.removeLayer(layer)
        }
      })

      if (showStructures && structureData) {
        for (let feature of structureData.features) {
          L.circleMarker(feature.geometry.coordinates.reverse(), {
            color: 'black',
            radius: 2,
            fillOpacity: 1
          })
            .addTo(mapRef.current)
            .bindPopup(`${feature.properties.nom}`)
        }
      }
    }
  }, [showStructures, structureData])

  const handleShowStructuresChange = (checked) => {
    setShowStructures(checked)
  }

  const handleVariableChange = (event) => {
    setSelectedVariable(event.target.value)
  }

  const handleModeChange = (checked) => {
    setMode(checked ? 'percentage' : 'absolute')
  }

  return (
    <div>
      <div style={{ zIndex: 1 }}>
        <select
          value={selectedVariable}
          onChange={handleVariableChange}
          className={styles.customSelector}
        >
          <option value="p19_pop">Population</option>
          <option value="p19_poph">Nombre d'hommes</option>
          <option value="p19_popf">Nombre de femmes</option>
          <option value="c19_pop15p">Population de 15 ans ou plus</option>
          <option value="p19_pop65p">
            Nombre de personnes de 65 ans ou plus
          </option>
          <option value="p19_pop6579">
            Nombre de personnes de 65 à 79 ans
          </option>
          <option value="p19_pop80p">
            nombre de personnes de 80 ans ou plus
          </option>
          <option value="c19_pop15p_cs1">
            Population de 15 ans ou plus : Agriculteurs exploitants
          </option>
          <option value="c19_pop15p_cs2">
            Population de 15 ans ou plus : Artisans, commerçants et chefs
            d'entreprise
          </option>
          <option value="c19_pop15p_cs3">
            Population de 15 ans ou plus : Cadres et professions intellectuelles
            supérieures
          </option>
          <option value="c19_pop15p_cs4">
            Population de 15 ans ou plus : Professions intermédiaires
          </option>
          <option value="c19_pop15p_cs5">
            Population de 15 ans ou plus : Employés
          </option>
          <option value="c19_pop15p_cs6">
            Population de 15 ans ou plus : Ouvriers
          </option>
          <option value="c19_pop15p_cs7">
            Population de 15 ans ou plus : Retraités
          </option>
          <option value="c19_pop15p_cs8">
            Population de 15 ans ou plus : Personnes sans activité
            professionnelle
          </option>
          <option value="p19_pop_fr">
            Population de nationalité française
          </option>
          <option value="p19_pop_etr">
            Population de nationalité étrangère
          </option>
          <option value="p19_pop_imm">Population immigrée</option>
        </select>
        <label htmlFor="mode-switch">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              style={{
                marginRight: '10px',
                color: 'white',
                backgroundColor: mode === 'absolute' ? '#d3d3d3' : '#252d80',
                borderRadius: '10px',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}
              onClick={() =>
                setMode(mode === 'absolute' ? 'percentage' : 'absolute')
              }
            >
              {mode === 'absolute' ? 'Afficher en pourcentage' : 'Afficher en valeur absolue'}
            </button>
            <button
              style={{
                color: 'white',
                backgroundColor: showStructures ? '#d3d3d3' : '#252d80',
                borderRadius: '10px',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}
              onClick={() => setShowStructures(!showStructures)}
            >
              {showStructures
                ? '🆇 Cacher les structures'
                : 'Afficher les structures'}
            </button>
          </div>
        </label>
      </div>
      <div style={{ height: '400px', marginTop: '20px' }}>
        <div id={id} style={{ position: 'relative', height: '100%' }}></div>
      </div>
    </div>
  )
}

export default MapPop
