import React from 'react'
import '../styles/components/currentDate.scss';


let todaysDate = new Date().toLocaleDateString('fr-FR')


function CurrentDate({ today, setTodayDate, setCurrentMonth, setCurrentYear, showAllEvents }) {

  const goToToday = () => {
    setTodayDate(today)
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
  }

  return (
    <div className='currentDate'>
      <button onClick={showAllEvents}>Liste d'évènements</button>
      <p>Date du jour : {todaysDate}</p>
      <button onClick={goToToday}>Retour au mois en cours</button>
    </div>
  )
}

export default CurrentDate
