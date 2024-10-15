import React from 'react'
import CurrentDate from './CurrentDate'
import ChangeDate from './ChangeDate'
import WeekDays from './WeekDays'
import Grid from './Grid'

function Calendar() {

  return (
    <div>
      <CurrentDate />
      <ChangeDate />
      <WeekDays />
      <Grid />
    </div>
  )
}

export default Calendar
