import React from 'react'
import '../styles/components/popup.scss'
import Form from './Form';

function Popup({ type, day, currentMonth, currentYear, onClose }) {

    const monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

    let content;
    
    if (type === 'day') {
        // const formatedDate = new Date(currentYear, currentMonth, day).toLocaleDateString('fr-FR')        // Si je préfère afficher ??/??/????
        const date = new Date(currentYear, currentMonth, day)
        const dayOfWeek = date.toLocaleDateString('fr-FR', { weekday: 'long' })
        const dayOfWeekCapital = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)     // ==> Majuscule à la 1ère lettre du jour
        const nameOfMonth = date.toLocaleDateString('fr-FR', { month: 'long'})

        content = <div>
            <p className='todaysDate'>{dayOfWeekCapital} {day} {nameOfMonth} {currentYear}</p>
            <Form onClose= {onClose}/>
        </div>

    } else if (type === 'month') {
        content = <p>- Affichage du mois en cours: {monthName[currentMonth]}<br/>et des 11 autres mois<br/>- Format: un rectangle de 3 mois en largeur et 4 en hauteur</p>
    } else if (type === 'year') {
        content = <p>Affichage de la liste déroulante des années<br/>(avec l'année sélectionnée ({currentYear}) au centre)</p>
    }


    return (
        <div className='popupBackground'>
            <div className='popup'>
                <div className='closeButtonDiv'>
                    <button className='closeButton' onClick={onClose}>×</button>
                </div>
                <div className='popupContent'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Popup
