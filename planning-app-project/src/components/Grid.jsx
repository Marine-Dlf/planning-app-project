import React, { useEffect, useState } from 'react'
import '../styles/components/grid.scss'
import Day from './Day';


function Grid({ currentMonth, currentYear, displayPopup }) {

  const [grid, setGrid] = useState([]);      // Génère un tableau des jours du mois
  const [events, setEvents] = useState([])   // État pour stocker les événements


  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()


  const getFirstDayInMonth = (year, month) => {
    let today = new Date(year, month, 1).getDay()
    return today === 0 ? 6 : today - 1
  }


  // Fetch pour ensuite pouvoir afficher les données
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events/');
        if (!response.ok) {
          // Vérifier si la réponse est OK (status 200-299) (si ce n'est pas le cas, il lève une erreur)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();         // Si la réponse est correcte, on extrait les données JSON de la réponse.
        setEvents(data);                            // Stocker les événements dans l'état
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    }
    fetchEvents()
}, [currentMonth, currentYear]);                    // Appel de l'API à chaque changement de mois ou d'année


  // Calcule et met à jour la grille des jours du mois actuel à chaque fois que l'année (currentYear) ou le mois (currentMonth) change
  // Génère un tableau contenant ts les jours du mois et met à jour l'état "grid" avec ce tableau => permet de re-rendre l'interface avec le bon nombre de jours
  useEffect(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    let firstDay = getFirstDayInMonth(currentYear, currentMonth)
    let newGrid = []

    // Ajoute des cases vides au début pour aligner le premier jour du mois
    for (let j = 0; j < firstDay; j++) {
      newGrid.push("")
    }

    // Ajoute les jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      newGrid.push(i)
    }

    setGrid(newGrid)

  }, [currentYear, currentMonth])   // [currentYear, currentMonth], indique que cet effet doit se ré-exécuter à chaque fois que currentYear ou currentMonth change


  // Parcours du tableau
  const browseGrid = () => grid.map((day, index) => {

    const dayEvents = events.filter(                            // Filtre les events pr obtenir uniquement ceux qui correspondent au jour en cours
      (event) =>                                                // puis, event.date est converti en Date
        new Date(event.date).getFullYear() === currentYear &&   // et on vérifie si l'année,   
        new Date(event.date).getMonth() === currentMonth &&     // le mois 
        new Date(event.date).getDate() === day                  // et le jour de cet événement correspondent à currentYear, currentMonth et day
    );

    return (
    <Day
      key = {index}
      day = {day}             // Passe le jour ou la case vide au composant Day
      events = {dayEvents}    // Passe les évènements de ce jour au composant Day
      onClick = {day ? () => displayPopup('day', day) : undefined}     // Passe l'action de clic au composant Day
    />
    )
  })

  
  return (
    <div className='grid'>

      {browseGrid()}
      
    </div>
  )
}


export default Grid
