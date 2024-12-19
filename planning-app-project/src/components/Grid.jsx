import React, { useEffect, useState } from 'react'
import '../styles/components/grid.scss'
import Day from './Day';


function Grid({ currentMonth, currentYear, displayPopup, events, types }) {

  const [grid, setGrid] = useState([]);      // Generates a table of the days of the month


  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()


  const getFirstDayInMonth = (year, month) => {
    let today = new Date(year, month, 1).getDay()
    return today === 0 ? 6 : today - 1
  }


  // Calculates and updates the grid of days of the current month each time the year (currentYear) or month (currentMonth) changes
  // Generates an array containing all the days of the month and updates the "grid" state with this array => allows to re-render the interface with the correct number of days
  useEffect(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    let firstDay = getFirstDayInMonth(currentYear, currentMonth)
    let newGrid = []

    // Add empty boxes at the beginning to align with the first day of the month
    for (let j = 0; j < firstDay; j++) {
      newGrid.push("")
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      newGrid.push(i)
    }

    setGrid(newGrid)

  }, [currentYear, currentMonth])   // [currentYear, currentMonth], indicates that this effect should re-run every time currentYear or currentMonth changes


  // Browse the array
  const browseGrid = () => grid.map((day, index) => {

    const dayEvents = events.filter(                            // Filter events to get only those that match to the current day
      (event) =>                                                // then, event.date is converted to Date
        new Date(event.date).getFullYear() === currentYear &&   // and we check if the year,   
        new Date(event.date).getMonth() === currentMonth &&     // the month 
        new Date(event.date).getDate() === day                  // and the day of this event correspond to currentYear, currentMonth and day
    );

    const popupType = dayEvents.length > 0 ? 'dayWithEvent' : 'dayWithoutEvent';

    return (
    <Day
      key = {index}
      day = {day}             // Pass the day or empty box to the Day component
      events = {dayEvents}    // Pass today's events to the Day component
      onClick = {day ? () => displayPopup(popupType, day, dayEvents) : undefined}     // Passes the click action to the Day component (the 'day' type has been replaced by popupType)
      types={types}
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
