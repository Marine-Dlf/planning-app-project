import React, { useEffect, useRef } from 'react'
import '../styles/components/eventsListDisplay.scss'


function EventsListDisplay({ sortedEvents, types }) {

    const listRef = useRef(null);           // Ref for list: creating a reference 'listRef'
    const eventRefs = useRef([]);           // Ref for each event


    // Find the index of the next event or today's event
    const currentDateTime = new Date();
    const nextEventIndex = sortedEvents.findIndex(event => new Date(event.date) >= currentDateTime); // trouve l'index du premier événement dont la date est égale ou supérieure à la date et l'heure actuelles


    useEffect(() => {
        // Scroll to current/next event if found (auto scroll)
        if (nextEventIndex !== -1 && eventRefs.current[nextEventIndex]) {
            eventRefs.current[nextEventIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [nextEventIndex]);

    // Each item in the list has its own ref, allowing you to scroll directly to a specific item


    return (
        <div>
            <h3>Liste de vos évènements</h3>

            <ul className='listItem' ref={listRef}>
                
                {sortedEvents.map((sortedEvent, index) => {

                    const type = types.find(type => type.id === sortedEvent.types_id);
                    const typeName = type ? type.typeName : "Type inconnu";

                    const formattedDate = new Intl.DateTimeFormat('fr-FR').format(new Date(sortedEvent.date));

                    const dayOfWeek = new Date(sortedEvent.date).toLocaleDateString('fr-FR', { weekday: 'long' });


                    return (
                        <li
                            key={index}
                            className={`item ${typeName}`}
                            ref={el => (eventRefs.current[index] = el)}         // Assigns each value to a ref
                        >

                            <p className='date'>
                                <strong>{formattedDate}</strong> ({dayOfWeek})
                            </p>

                            {sortedEvent.time ? (
                                <p className='time'>
                                    {new Date(`1970-01-01T${sortedEvent.time}`).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                </p>
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
