import React from 'react'
import '../styles/components/grid.scss'

const grid = ['hello', 'coucou', 'ciao', 'hola', 'konichiwa', 'salut', 'bonjour', 'yeah']


function Grid() {

  return (
    <div className='grid'>
      {browseGrid()}
    </div>
  )
}

// Parcours du tableau
const browseGrid = () => {
  return grid.map((day, index) => <div key={index} className='day'>{day}</div>)
}


export default Grid
