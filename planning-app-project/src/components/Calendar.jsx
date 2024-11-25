import React, { useEffect, useState } from 'react'
import CurrentDate from './CurrentDate'
import ChangeDate from './ChangeDate'
import WeekDays from './WeekDays'
import Grid from './Grid'
import Popup from './Popup'


function Calendar() {

  const today = new Date();
  const [todayDate, setTodayDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [popupType, setPopupType] = useState(null);

  const [events, setEvents] = useState([])   // State to store events
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);   // Store the events of the selected day

  const [types, setTypes] = useState([])

  

  // Fetch to then be able to display the data   // I moved the fetch from Grid to here (Calendar) to be able to use the data in Popup in addition to Grid
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
          // Check if the response is OK (status 200-299) (if not, it throws an error)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();         // If the response is correct, we extract the JSON data from the response
        setEvents(data);                            // Store events in state
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    }
    fetchEvents()
  }, [currentMonth, currentYear]);                  // Call the API every time the month or year changes


  const fetchTypes = async () => {
    try {
      const res = await fetch('http://localhost:5000/types')
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json()
      // setTypes(data)
      if (Array.isArray(data)) {
        setTypes(data);
    } else {
        console.error("Les types récupérés ne sont pas un tableau.");
    }
    } catch (error) {
      console.error('Erreur lors de la récupération des types :', error);
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])



  // Popup display
  const displayPopup = (type, day='null', dayEvents = []) => {
    if (day !== "") {
      setSelectedDay(day)                 // Keep track of the selected day
      setPopupType(type)                  // Sets the type of the popup
      setSelectedDayEvents(dayEvents);    // Stores events of the selected day
      setIsPopupOpen(true)                // Open the popup
    }
  }

  // Fermeture de la popup
  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedDay(null)    // Resets the selected day if necessary
    setPopupType(null)      // Resets the popup type
  }


  // Refreshment after fetches
  const fetchEvents = async () => {
    try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
        closePopup()
    } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
    }
  };



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
        displayPopup = {displayPopup}
      />
      <WeekDays />
      <Grid 
        currentMonth = {currentMonth}
        setCurrentMonth = {setCurrentMonth}
        currentYear = {currentYear}
        setCurrentYear = {setCurrentYear}
        displayPopup = {displayPopup}
        events = {events}
        types={types}
      />

      {isPopupOpen && (
        <Popup
          type = {popupType}                // Pass the 'type' prop to Popup
          day = {selectedDay}               // The selected day can be skipped if necessary
          closePopup = {closePopup}         // Pass the function to close the popup
          currentMonth = {currentMonth}     // Pass the current month
          currentYear = {currentYear}       // Pass the current year
          setCurrentYear = {setCurrentYear}
          events = {selectedDayEvents}      // Pass the events of the selected day
          fetchEvents = {fetchEvents}       // Refreshment after fetches
          // fetchTypes = {fetchTypes}
          types = {types}
        />
      )}
    </div>
  )
}

export default Calendar
