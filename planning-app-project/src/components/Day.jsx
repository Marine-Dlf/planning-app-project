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
          {events.map((event, index) => {
            // Formatage de l'heure `schedules` pour exclure les secondes
            let formattedTime
            if (event.schedules !== null) {
            formattedTime = new Date(`1970-01-01T${event.schedules}`).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })
          }
            return (
              <div key={index} className='event'>

                {event.name}<br/>

                <div className="infos">
                {event.location && formattedTime              // Affichage conditionnel de event.location et formattedTime
                  ? `${formattedTime} - ${event.location}`
                  : event.location == null
                  ? formattedTime
                  : formattedTime == null
                  ? event.location
                  : null}
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
