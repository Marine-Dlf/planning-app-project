import React, { useEffect, useState } from 'react'
import '../styles/components/grid.scss'



function Grid({ currentMonth, setCurrentMonth, currentYear, setCurrentYear }) {

  // Génère un tableau des jours du mois
  const [grid, setGrid] = useState([])

  // Nombre de jour par mois
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Calcule et met à jour la grille des jours du mois actuel à chaque fois que l'année (currentYear) ou le mois (currentMonth) change
  // Génère un tableau contenant ts les jours du mois et met à jour l'état "grid" avec ce tableau => permet de re-rendre l'interface avec le bon nombre de jours
  useEffect(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    let newGrid = []
    for (let i = 1; i <= daysInMonth; i++) {
      newGrid.push(i)
    }
    setGrid(newGrid)
  }, [currentYear, currentMonth])   // [currentYear, currentMonth], indique que cet effet doit se ré-exécuter à chaque fois que currentYear ou currentMonth change

  // Parcours du tableau
  const browseGrid = () => {
    return grid.map((day, index) => <div key={index} className='day'>{day}</div>)
  }

  return (
    <div className='grid'>
      {browseGrid()}
    </div>
  )
}


export default Grid
