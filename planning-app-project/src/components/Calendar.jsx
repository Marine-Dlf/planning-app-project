import React, { useEffect, useState } from 'react'
import CurrentDate from './CurrentDate'
import ChangeDate from './ChangeDate'
import WeekDays from './WeekDays'
import Grid from './Grid'
import Popup from './Popup'
import FilterTypes from './FilterTypes'
import { fetchEvents, fetchTypes } from '../services/fetchService'


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
  const [selectedTypes, setSelectedTypes] = useState([])


  const loadEvents = async () => {
    try {
      const data = await fetchEvents()
      setEvents(data)
    } catch (error) {
      console.error('Erreur lors du chargement des événements :', error);
    }
  }
  
  useEffect(() => {
    loadEvents()
  }, [currentMonth, currentYear])


  const loadTypes = async () => {
    try {
      const data = await fetchTypes()
      if (Array.isArray(data)) {
            setTypes(data);
            setSelectedTypes(data.map((type) => type.id))     // decides if all checkboxes should be checked
        } else {
            console.error("Les types récupérés ne sont pas un tableau.");
        }
    } catch (error) {
      console.error('Erreur lors du chargement des événements :', error);
    }
  }

  useEffect(() => {
    loadTypes()
  }, [])


  // Filters events to keep only those whose type matches the selected types
  const filteredEvents = events.filter((event) =>
    selectedTypes.includes(event.types_id)        // Keep only events matching selected types
  )


  // Popup display
  const displayPopup = (type, day='null', dayEvents = []) => {
    if (day !== "") {
      setSelectedDay(day)                 // Keep track of the selected day
      setPopupType(type)                  // Sets the type of the popup
      setSelectedDayEvents(dayEvents);    // Stores events of the selected day
      setIsPopupOpen(true)                // Open the popup
    }
  }


  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedDay(null)    // Resets the selected day if necessary
    setPopupType(null)      // Resets the popup type
  }


  const showAllEvents = () => {
    setPopupType('allEvents');  // Change the popup type
    setIsPopupOpen(true);       // Open the popup
};


  return (
    <div>
      <CurrentDate 
        today = {today}
        setTodayDate = {setTodayDate}
        setCurrentMonth = {setCurrentMonth}
        setCurrentYear = {setCurrentYear}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        showAllEvents={showAllEvents}
      />
      <FilterTypes
        events={events}
        types={types}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
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
        types={types}
        events={filteredEvents}
      />

      {isPopupOpen && (
        <Popup
          type = {popupType}
          day = {selectedDay}
          closePopup = {closePopup}
          currentMonth = {currentMonth}
          currentYear = {currentYear}
          setCurrentYear = {setCurrentYear}
          events = {selectedDayEvents}      // Pass the events of the selected day
          fetchEvents = {loadEvents}       // Refreshment after fetches
          types = {types}
          eventsArray = {events}
        />
      )}
    </div>
  )
}

export default Calendar
