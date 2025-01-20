import React from 'react'
import '../styles/components/grid.scss'


function Day({ day, onClick, events, types, isPastDay }) {

  const isEventPast = (eventDate) => {
    const today = new Date()
    const eventsDate = new Date(eventDate)
    if(eventsDate.getFullYear() === today.getFullYear() && eventsDate.getMonth() === today.getMonth() && eventsDate.getDate() === today.getDate()) {
      return false
    }
    return eventsDate < today
  }

  return (
    <div
      className={`day ${day === "" ? "emptyCase" : ""} ${isPastDay ? "pastDay" : ""}`}
      onClick={onClick}
    >
    
    {day !== '' ? (
        <>
          <p className='number'>{day}</p>
          {events
          .slice()                              // Create a copy of the array to avoid modifying the original
          .sort((a, b) => {                     // Ranking of events (in order of time)
            const timeA = a.time || '00:00'
            const timeB = b.time || '00:00'
            return timeA.localeCompare(timeB)
          })
          .map((event, index) => {
            // Find the 'typeName' corresponding to the 'type_id' or other field
            const type = types.find(type => type.id === event.types_id);
            const typeName = type ? type.typeName : "Type inconnu";

            // Formatting `time` to exclude seconds
            let formattedTime
            if (event.time !== null) {
            formattedTime = new Date(`1970-01-01T${event.time}`).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              })
            } else {
              formattedTime = ''
            }

            const eventClass = isEventPast(event.date) ? 'pastEvent' : ''

              return (
                <div key={index} className={`event ${typeName} ${eventClass}`}>           {/*Color change depending on the type of event*/}

                  {event.eventName}<br/>

                  {/* Conditional display of event.location and formattedTime */}
                  <div className="infos">
                    {formattedTime && event.location
                      ? `${formattedTime} - ${event.location}`
                      : formattedTime || event.location || null}
                  </div>

                </div>
              )
            })}
          </>
        ) : (
        ''
      )}
    </div>
  )
}


export default Day
