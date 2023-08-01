import { useEffect, useState } from 'react';
import useSWR from 'swr';
import DropdownStructures from '../../nav/DropdownStructures';


async function fetcher(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data.features;
}

const allPossibleThematiques = [
    'numerique--acceder-a-du-materiel',
    'numerique--acceder-a-une-connexion-internet',
    'numerique--accompagner-les-demarches-de-sante',
    'numerique--approfondir-ma-culture-numerique',
    'numerique--creer-avec-le-numerique',
    'numerique--creer-et-developper-mon-entreprise',
    'numerique--devenir-autonome-dans-les-demarches-administratives',
    'numerique--favoriser-mon-insertion-professionnelle',
    'numerique--prendre-en-main-un-ordinateur',
    'numerique--prendre-en-main-un-smartphone-ou-une-tablette',
    'numerique--promouvoir-la-citoyennete-numerique',
    'numerique--realiser-des-demarches-administratives-avec-un-accompagnement',
    'numerique--s-equiper-en-materiel-informatique',
    'numerique--soutenir-la-parentalite-et-l-education-avec-le-numerique',
    'numerique--utiliser-le-numerique-au-quotidien'
  ];
  
  const thematiqueDisplayNames = {
    'numerique--acceder-a-du-materiel': 'Accéder à du matériel',
    'numerique--acceder-a-une-connexion-internet': 'Accéder à une connexion internet',
    'numerique--accompagner-les-demarches-de-sante': 'Accompagner les démarches de santé',
    'numerique--approfondir-ma-culture-numerique': 'Approfondir ma culture numérique',
    'numerique--creer-avec-le-numerique': 'Créer avec le numérique',
    'numerique--creer-et-developper-mon-entreprise': 'Créer et développer mon entreprise',
    'numerique--devenir-autonome-dans-les-demarches-administratives': 'Devenir autonome dans les démarches administratives',
    'numerique--favoriser-mon-insertion-professionnelle': 'Favoriser mon insertion professionnelle',
    'numerique--prendre-en-main-un-ordinateur': 'Prendre en main un ordinateur',
    'numerique--prendre-en-main-un-smartphone-ou-une-tablette': 'Prendre en main un smartphone ou une tablette',
    'numerique--promouvoir-la-citoyennete-numerique': 'Promouvoir la citoyenneté numérique',
    'numerique--realiser-des-demarches-administratives-avec-un-accompagnement': 'Réaliser des démarches administratives avec un accompagnement',
    'numerique--s-equiper-en-materiel-informatique': 'S\'équiper en matériel informatique',
    'numerique--soutenir-la-parentalite-et-l-education-avec-le-numerique': 'Soutenir la parentalité et l\'éducation avec le numérique',
    'numerique--utiliser-le-numerique-au-quotidien': 'Utiliser le numérique au quotidien'
  };

  const StructuresCategories = ({ irisCode, id }) => {
    const { data, error } = useSWR(`/api/structures/structures-inclusion?irisCode=${irisCode}`, fetcher);
    const [selectedThematique, setSelectedThematique] = useState("");
    
    if (error) return <div>Failed to load data</div>;
    if (!data) return <div>Loading...</div>;
    
    const allThematiques = data.flatMap(feature => 
      feature.properties.thematiques.split(';').map(thema => thema.trim())
    );
  
    const thematiqueCounts = allPossibleThematiques.reduce((acc, thematique) => {
      acc[thematique] = data.filter(feature => feature.properties.thematiques.includes(thematique)).length;
      return acc;
    }, {});
  
  const items = allPossibleThematiques.map(thematique => ({
    id: thematique,
    displayName: thematiqueDisplayNames[thematique],
    count: thematiqueCounts[thematique]
  }));

  return (
    <>
      <DropdownStructures
        items={items}
        selectedItem={selectedThematique}
        selectItem={setSelectedThematique}
      />
      <Map data={data} id={id} selectedThematique={selectedThematique} />
    </>
  );
};
  

const Map = ({ data, id, selectedThematique }) => {
    const [map, setMap] = useState(null);
    const [group, setGroup] = useState(null);
    const circleRadius = 20;
  
    useEffect(() => {
      const initializeMap = async () => {
        const L = (await import('leaflet')).default;
  
        if (!map && typeof window !== 'undefined') {
          const newMap = L.map(id).setView([50.603354, 3.888334], 9);
  
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          }).addTo(newMap);
  
          setMap(newMap);
          setGroup(L.featureGroup().addTo(newMap));
        }
      };
  
      initializeMap();
    }, [map, id]);
  
    useEffect(() => {
      const addCircles = async () => {
        const L = (await import('leaflet')).default;
  
        if (data && map && group) {
          group.clearLayers();
  
          data
            .filter(feature => selectedThematique ? 
              feature.properties.thematiques.includes(selectedThematique) : true)
            .forEach(feature => {
              const { coordinates } = feature.geometry;
              const circle = L.circle([coordinates[1], coordinates[0]], circleRadius);
  
              // Here, we assume that feature.properties.nom holds the name of the structure
              circle.bindPopup(feature.properties.nom);
  
              circle.addTo(group);
            });
  
          map.fitBounds(group.getBounds());
        }
      };
  
      addCircles();
    }, [map, data, selectedThematique, group]);
  
    return <div id={id} style={{ height: "500px", width: "100%" }}></div>;
  };
  

export default StructuresCategories;
