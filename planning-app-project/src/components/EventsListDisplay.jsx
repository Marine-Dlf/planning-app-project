import React from 'react'
import '../styles/components/eventsListDisplay.scss'


function EventsListDisplay({ sortedEvents, types }) {

    console.log(sortedEvents)

    return (
        <div>
            <h3>Liste de vos évènements</h3>
            <ul className='listItem'>
                {sortedEvents.map((sortedEvent, index) => {

                    const type = types.find(type => type.id === sortedEvent.types_id);
                    const typeName = type ? type.typeName : "Type inconnu";

                    const formattedDate = new Intl.DateTimeFormat('fr-FR').format(new Date(sortedEvent.date));

                    const dayOfWeek = new Date(sortedEvent.date).toLocaleDateString('fr-FR', { weekday: 'long' });


                    return (
                        <li key={index} className={`item ${typeName}`}>
                            <p className='date'><strong>{formattedDate}</strong> ({dayOfWeek}) </p>
                            {sortedEvent.time ? (
                                <p className='time'>{new Date(`1970-01-01T${sortedEvent.time}`).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                            ) : null}
                            <p className='eventName'>{sortedEvent.eventName}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default EventsListDisplay
