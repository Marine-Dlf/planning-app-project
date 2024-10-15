import React, {useState} from 'react'
import CurrentDate from './CurrentDate'
import ChangeDate from './ChangeDate'
import WeekDays from './WeekDays'
import Grid from './Grid'

function Calendar() {

  const today = new Date()
  const [todayDate, setTodayDate] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  return (
    <div>
      <CurrentDate 
        today = {today}
        setTodayDate = {setTodayDate}
        setCurrentMonth = {setCurrentMonth}
        setCurrentYear = {setCurrentYear}
      />
      <ChangeDate 
        currentMonth = {currentMonth}
        setCurrentMonth = {setCurrentMonth}
        currentYear = {currentYear}
        setCurrentYear = {setCurrentYear}
      />
      <WeekDays />
      <Grid />
    </div>
  )
}

export default Calendar
