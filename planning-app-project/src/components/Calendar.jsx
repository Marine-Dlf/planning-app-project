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

  const [events, setEvents] = useState([])   // État pour stocker les événements
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);   // Stocke les évènement du jour sélectionné

  

  // Fetch pour ensuite pouvoir afficher les données // J'ai déplacé le fetch depuis Grid à ici (Calendar) pour pouvoir utiliser les données dans Popup en plus de Grid
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
          // Vérifier si la réponse est OK (status 200-299) (si ce n'est pas le cas, il lève une erreur)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();         // Si la réponse est correcte, on extrait les données JSON de la réponse.
        setEvents(data);                            // Stocker les événements dans l'état
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    }
    fetchEvents()
  }, [currentMonth, currentYear]);                    // Appel de l'API à chaque changement de mois ou d'année



  // Affichage de la popup
  const displayPopup = (type, day='null', dayEvents = []) => {
    if (day !== "") {
      setSelectedDay(day)                 // Garde une trace du jour sélectionné
      setPopupType(type)                  // Définie le type de la popup
      setSelectedDayEvents(dayEvents);    // Stocke les événements du jour sélectionné
      setIsPopupOpen(true)                // Ouvre la popup
    }
  }

  // Fermeture de la popup
  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedDay(null)    // Réinitialise le jour sélectionné si nécessaire
    setPopupType(null)      // Réinitialise le type de la popup
  }


  // Rafraîchissement après les fetchs
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
      />

      {isPopupOpen && (
        <Popup
          type = {popupType}                // Passe le type de la popup
          day = {selectedDay}               // On peut passer le jour sélectionné si nécessaire
          closePopup = {closePopup}         // Passe la fonction pour fermer la popup
          currentMonth = {currentMonth}     // Passe le mois actuel
          currentYear = {currentYear}       // Passe l'année actuelle
          setCurrentYear = {setCurrentYear}
          events = {selectedDayEvents}      // Passe les événements du jour sélectionné
          fetchEvents = {fetchEvents}       // Rafraîchissement après les fetchs
        />
      )}
    </div>
  )
}

export default Calendar
