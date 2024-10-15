import React from 'react'
import '../styles/components/currentDate.scss';


let date = new Date()

let today = date.toLocaleDateString('fr-FR')


function CurrentDate() {

  return (
    <div className='currentDate'>
      <p>Date du jour : {today}</p>
      <button>Retour au mois en cours</button>
    </div>
  )
}

export default CurrentDate
