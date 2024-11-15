import React, { useState } from 'react'
import '../styles/components/popup.scss'
import Form from './Form';

function Popup({ type, day, currentMonth, currentYear, setCurrentYear, closePopup, events, formData, setFormData, EMPTY_EVENT, fetchEvents }) {

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

    // Suppression d'un event
    const deleteEvent = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/events/${id}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                await fetchEvents()
                closePopup()
            } else {
            throw new Error(`HTTP error! Status: ${res.status}`);
            }
            console.log("Événement supprimé avec succès :");
        } catch (error) {
            console.error("Erreur lors de la suppression de l'événement :", error);
        }
    }

    const modifyAlert = () => {
        alert('Modifier')
        return
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
                        <Form fetchEvents={fetchEvents} closePopup={closePopup} selectedDate={new Date(currentYear, currentMonth, day)} />
                    </>
                ) : (
                    <div className='listEvents'>
                        <p className='todaysDate'>{dayOfWeekCapital} {day} {nameOfMonth} {currentYear}</p>
                        <p>Evènement(s)</p>
                        {events.length > 0 ? (
                        <ul className='listItem'>
                            {events.map((event, index) => (
                                <li key={index} className='item'>
                                    
                                    <div className='buttons'>
                                        <button className='modifyButton' onClick={modifyAlert}>✏️</button>
                                        <button className='deleteButton' onClick={() => deleteEvent(event.id)}>🗑️</button>
                                    </div>

                                    <div className='eventInfos'>
                                        {event.time ? (
                                            <span className='time'>{new Date(`1970-01-01T${event.time}`).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        ) : null}<br />

                                        <div className='eventName'><strong>{event.eventName}</strong></div>

                                        {event.location ? <div className='location'>{event.location}</div> : null}

                                        <div className='comment'>{event.comment}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun événement pour ce jour</p>
                    )}

                        <button className='addButton' onClick={openForm}>Add</button>
                    </div>
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
             <Form fetchEvents={fetchEvents} closePopup= {closePopup} selectedDate={date} />
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
                    <button className='backButton' type='button' onClick={(e) => {e.preventDefault(); closeForm();}}>⇦</button>
                )}
            </div>

        </div>
    )
}


export default Popup
