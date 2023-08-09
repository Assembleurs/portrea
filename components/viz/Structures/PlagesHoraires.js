import React, { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import Select from 'react-select';

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]; 
const DAYS_FR = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]; 

const PlagesHoraires = ({ code }) => {
  const [horaires, setHoraires] = useState([]);
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [nullScheduleStructures, setNullScheduleStructures] = useState([]); 
  const [isButtonHovered, setIsButtonHovered] = useState(false); 

  useEffect(() => {
    fetch(`/api/structures/structures-inclusion?irisCode=${code}`)
      .then((res) => res.json())
      .then((data) => {
        const counts = {};
        for (let i = 6; i < 22; i++) counts[i] = 0; 
        let nullScheduleStructuresTemp = []; 

        data.features.forEach((feature) => {
          const horaire = feature.properties.horaires_ouverture;
          if (horaire) {
            try {
              const days = horaire.split("; ");
              days.forEach((day) => {
                const dayParts = day.split(" ");
                let daysOfWeek = dayParts[0].split("-");
                if (daysOfWeek.length > 1) {
                  const start = WEEK.indexOf(daysOfWeek[0]);
                  const end = WEEK.indexOf(daysOfWeek[1]);
                  daysOfWeek = WEEK.slice(start, end + 1);
                }
                if (daysOfWeek.includes(selectedDay)) {
                  const timeRanges = dayParts[1].split(",");
                  timeRanges.forEach((timeRange) => {
                    if (timeRange.includes(":")) {
                      const [start, end] = timeRange.split("-");
                      const startHour = parseInt(start.split(":")[0], 10);
                      const endHour = parseInt(end.split(":")[0], 10);
                      for (let i = startHour; i < endHour; i++) {
                        counts[i]++;
                      }
                    }
                  });
                }
              });
            } catch (e) {
              console.error(e);
            }
          } else {
            nullScheduleStructuresTemp.push(feature.properties.nom);
          }
        });

        setNullScheduleStructures(nullScheduleStructuresTemp); 

        const horairesData = Object.keys(counts).map((heure) => ({
          heure: `${heure}:00`,
          count: counts[heure],
        }));
        setHoraires(horairesData);
      });
  }, [code, selectedDay]);

  const handleDayChange = ({ value }) => {
    setSelectedDay(value);
  };

  const dayOptions = DAYS.map((day, i) => ({ value: day, label: DAYS_FR[i] })); 

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '22px' }}>Nombre de structures avec des horaires non renseignés : {nullScheduleStructures.length}</p> 
        <a 
          href="https://solen1.enquetes.social.gouv.fr/cgi-9/HE/SF?P=76z14z2z-1z-1z2747C6FAAF" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <button 
            style={{  
              display: 'inline-block',
              padding: '10px 20px',
              margin: '20px 0',
              color: '#fff',
              background: isButtonHovered ? '#df7373' : '#13315c', 
              borderRadius: '5px',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
              fontSize: '24px' 
            }} 
            onMouseEnter={() => setIsButtonHovered(true)} 
            onMouseLeave={() => setIsButtonHovered(false)} 
          >
            Ajouter les horaires
          </button>
        </a>
        <details>
          <summary><b>Voir les structures</b></summary>
          <ul>
            {nullScheduleStructures.map((structure, index) => <li key={index}>{structure}</li>)} {/* Display the structures */}
          </ul>
        </details>
      </div>
    </div>
  );
};

export default PlagesHoraires;
