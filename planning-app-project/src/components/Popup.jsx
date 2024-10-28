import React from 'react'
import '../styles/components/popup.scss'
import Form from './Form';

function Popup({ type, day, currentMonth, currentYear, setCurrentYear, closePopup }) {

    const monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

    // A la détection du clic de l'année
    const handleYearClick = (year) => {
        setCurrentYear(year)
        closePopup()
    }

    let content;
    
    if (type === 'day') {
        // const formatedDate = new Date(currentYear, currentMonth, day).toLocaleDateString('fr-FR')        // Si je préfère afficher ??/??/????
        const date = new Date(currentYear, currentMonth, day)
        const dayOfWeek = date.toLocaleDateString('fr-FR', { weekday: 'long' })
        const dayOfWeekCapital = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)     // ==> Majuscule à la 1ère lettre du jour
        const nameOfMonth = date.toLocaleDateString('fr-FR', { month: 'long'})

        content = <div>
            <p className='todaysDate'>{dayOfWeekCapital} {day} {nameOfMonth} {currentYear}</p>
            <Form closePopup= {closePopup}/>
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
            </div>
        </div>
    )
}


export default Popup
