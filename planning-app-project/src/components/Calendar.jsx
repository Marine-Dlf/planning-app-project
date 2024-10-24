import React, {useState} from 'react'
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


  // Affichage de la popup
  const displayPopup = (type, day='null') => {
    if (day !== "") {
      setSelectedDay(day)     // Garde une trace du jour sélectionné
      setPopupType(type)      // Définie le type de la popup
      setIsPopupOpen(true)    // Ouvre la popup
    }
  }

  // Fermeture de la popup
  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedDay(null)    // Réinitialise le jour sélectionné si nécessaire
    setPopupType(null)      // Réinitialise le type de la popup
  }


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
      />

      {isPopupOpen && (
        <Popup
          type={popupType}              // Passe le type de la popup
          day={selectedDay}             // On peut passer le jour sélectionné si nécessaire
          onClose={closePopup}          // Passe la fonction pour fermer la popup
          currentMonth={currentMonth}   // Passe le mois actuel
          currentYear={currentYear}     // Passe l'année actuelle
        />
      )}
    </div>
  )
}

export default Calendar
