import React from 'react'
import '../styles/components/grid.scss'

const grid = ['hello', 'coucou', 'ciao', 'hola', 'konichiwa', 'salut', 'bonjour', 'yeah']


function Grid({ currentMonth, setCurrentMonth, currentYear, setCurrentYear }) {

  return (
    <div className='grid'>
      {browseGrid()}
      {getDaysInMonth(currentMonth, currentYear)}
    </div>
  )
}

// Parcours du tableau
const browseGrid = () => {
  return grid.map((day, index) => <div key={index} className='day'>{day}</div>)
}

// Nombre de jour par mois
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate()
}


export default Grid
