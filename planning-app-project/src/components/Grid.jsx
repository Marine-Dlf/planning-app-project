import React, { useEffect, useState } from 'react'
// import Popup from './Popup'
import '../styles/components/grid.scss'
import Day from './Day';



function Grid({ currentMonth, currentYear }) {

  const [grid, setGrid] = useState([]);      // Génère un tableau des jours du mois

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

  const getFirstDayInMonth = (year, month) => {
    let today = new Date(year, month, 1).getDay()
    return today === 0 ? 6 : today - 1
  }


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
  const browseGrid = () => grid.map((day, index) => (
    <Day
      key={index}
      day={day}
    />
  ))

  
  return (
    <div className='grid'>
      {browseGrid()}
    </div>
  )
}


export default Grid
