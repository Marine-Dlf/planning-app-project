import React from 'react'

function Day({ day, onClick, events }) {
  return (
    <div
      className={'day' + (day === "" ? " emptyCase" : "")}
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

              return (
                <div key={index} className='event'>

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
