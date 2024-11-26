import React from 'react'


function TodaysDateDisplay({ day, currentMonth, currentYear}) {

    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.toLocaleDateString('fr-FR', { weekday: 'long' });
    const dayOfWeekCapital = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    const nameOfMonth = date.toLocaleDateString('fr-FR', { month: 'long' });
  
    return (
        <p className='todaysDate'>{dayOfWeekCapital} {day} {nameOfMonth} {currentYear}</p>
    )
}

export default TodaysDateDisplay
