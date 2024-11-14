import React, { useState } from 'react'
import '../styles/components/popup.scss'
import Form from './Form';

function Popup({ type, day, currentMonth, currentYear, setCurrentYear, closePopup, events }) {

    const monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']


    // A la détection du clic de l'année
    const handleYearClick = (year) => {
        setCurrentYear(year)
        closePopup()
    }

    // Gestion de l'ouverture du formulaire
    const [isFormOpen, setIsFormOpen] = useState(false)

    const openForm = () => {
        console.log('Ouvert')
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setIsFormOpen(false)
    }


    let content;

    if (type === 'dayWithEvent') {
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = date.toLocaleDateString('fr-FR', { weekday: 'long' });
        const dayOfWeekCapital = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
        const nameOfMonth = date.toLocaleDateString('fr-FR', { month: 'long' })

        content = (
            <div>
                {isFormOpen ? (
                    <>
                        <p className='todaysDate'>{dayOfWeekCapital} {day} {nameOfMonth} {currentYear}</p>
                        <Form closePopup={closePopup} selectedDate={new Date(currentYear, currentMonth, day)} />
                    </>
                ) : (
                    <>
                        <p className='todaysDate'>{dayOfWeekCapital} {day} {nameOfMonth} {currentYear}</p>
                        <p>Les évènements normalement !</p>
                        <button onClick={openForm}>Add</button>
                    </>
                )}
            </div>
        );


    } else if (type === 'dayWithoutEvent') {
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = date.toLocaleDateString('fr-FR', { weekday: 'long' });
        const dayOfWeekCapital = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
        const nameOfMonth = date.toLocaleDateString('fr-FR', { month: 'long' });

        content = <div>
             <p className='todaysDate'>{dayOfWeekCapital} {day} {nameOfMonth} {currentYear}</p>
             <Form closePopup= {closePopup} selectedDate={date} />
         </div>
      
    } else if (type === 'month') {
        content = <p>- Affichage du mois en cours: {monthName[currentMonth]}<br/>et des 11 autres mois<br/>- Format: un rectangle de 3 mois en largeur et 4 en hauteur</p>
    
    } else if (type === 'year') {
        content = <div className='yearsList'>
            <button onClick={() => handleYearClick(currentYear - 2)}>{currentYear - 2}</button>
            <button onClick={() => handleYearClick(currentYear - 1)}>{currentYear - 1}</button>
            <button className='currentYearButton' onClick={() => handleYearClick(currentYear)}>{currentYear}</button>
            <button onClick={() => handleYearClick(currentYear + 1)}>{currentYear + 1}</button>
            <button onClick={() => handleYearClick(currentYear + 2)}>{currentYear + 2}</button>
        </div>
    }


    return (
        <div className='popupBackground'>

            <div className='popup'>
                <div className='closeButtonDiv'>
                    <button className='closeButton' onClick={closePopup}>×</button>
                </div>

                <div className='popupContent'>
                    {content}
                </div>

                {isFormOpen && (
                    <button type='button' onClick={(e) => {e.preventDefault(); closeForm();}}>🔙</button>
                )}
            </div>

        </div>
    )
}


export default Popup
