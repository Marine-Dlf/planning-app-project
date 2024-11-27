import React from 'react'
import '../styles/components/eventsListDisplay.scss'


function EventsListDisplay({ sortedEvents, type, types }) {

    console.log(sortedEvents)
    return (
        <div>
            <h3>Liste de vos évènements</h3>
            <ul className='listItem'>
                {sortedEvents.map((sortedEvent, index) => {

                    const type = types.find(type => type.id === sortedEvent.types_id);
                    const typeName = type ? type.typeName : "Type inconnu";

                    return (
                        <li key={index} className={`item ${typeName}`}>
                            <p className='date'>{sortedEvent.date}</p>
                            <p className='time'>{sortedEvent.time}</p>
                            <p className='eventName'>{sortedEvent.eventName}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default EventsListDisplay
