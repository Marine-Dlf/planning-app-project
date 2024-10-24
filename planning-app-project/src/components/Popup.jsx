import React from 'react'
import '../styles/components/popup.scss'

function Popup({ type, day, currentMonth, currentYear, onClose }) {

    const monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

    let content;
    
    if (type === 'day') {
        const formatedDate = new Date(currentYear, currentMonth, day).toLocaleDateString('fr-FR')
        content = <h3>{formatedDate}</h3>
    } else if (type === 'month') {
        content = <p>- Affichage du mois en cours: {monthName[currentMonth]}<br/>et des 11 autres mois<br/>- Format: un rectangle de 3 mois en largeur et 4 en hauteur</p>
    } else if (type === 'year') {
        content = <p>Affichage de la liste déroulante des années<br/>(avec l'année en cours ({currentYear}) au centre)</p>
    }


    return (
        <div className='popupBackground'>
            <div className='popup'>
                <button className='closeButton' onClick={onClose}>❌</button>  
                <div className='popupContent'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Popup
