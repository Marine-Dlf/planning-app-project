import React from 'react'

function EventsList({ events, types, openEditForm, deleteEvent }) {

    return (
        <ul className='listItem'>
            {events
                .slice()                                // Create a copy of the array
                .sort((a, b) => {                       // Ranking of events (in order of time)
                    const timeA = a.time || '00:00'
                    const timeB = b.time || '00:00'
                    return timeA.localeCompare(timeB)
                })
                .map((event, index) => {
                // Find the 'typeName' corresponding to the 'type_id' or other field
                const type = types.find(type => type.id === event.types_id);
                const typeName = type ? type.typeName : "Type inconnu";
                console.log(typeName)
                const checkColor = (typeName) => {
                    switch (typeName) {
                        case "Concours":
                            return "#88C4FF";
                        case "Spectacle":
                            return "#9AFF7F";
                        case "Répétition":
                            return "#FFF4A1";
                        case "Réunion":
                            return "#FFA3CC";
                        case "Autre":
                            return "rgb(249, 212, 218)"
                        default:
                    }
                }

                return (
                    <li key={index} className='item' style={{ backgroundColor: `${checkColor(typeName)}` }}>
                        
                        <div className='buttons' >
                            <button className='modifyButton' style={{ border: `${checkColor(typeName)}`, backgroundColor: `${checkColor(typeName)}` }} onClick={() => openEditForm(event)}>✏️</button>
                            <button className='deleteButton' style={{ border: `${checkColor(typeName)}`, backgroundColor: `${checkColor(typeName)}` }} onClick={() => deleteEvent(event.id, event.eventName)}>🗑️</button>
                        </div>

                        <div className='eventInfos'>
                            {event.time ? (
                                <span className='time'>{new Date(`1970-01-01T${event.time}`).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                            ) : null}<br />

                            <div className='eventName'><strong>{event.eventName}</strong></div>

                            <div className='typeName'>{typeName}</div>

                            {event.location ? <div className='location'>{event.location}</div> : null}

                            <div className='comment'>
                                {event.comment
                                    .split('\n')                    // Handles line breaks
                                    .map((line, index) => (
                                        <div key = {index}>
                                            {line || <br />}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </li>
                )})
            }
        </ul>
    )
}


export default EventsList
