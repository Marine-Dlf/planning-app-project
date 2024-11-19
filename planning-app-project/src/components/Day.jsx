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
          .slice()                              // Création d'une copie de l'array pour éviter de modifier l'original
          .sort((a, b) => {                     // Classement des events par heure
            const timeA = a.time || '00:00'
            const timeB = b.time || '00:00'
            return timeA.localeCompare(timeB)
          })
          .map((event, index) => {
            // Formatage de l'heure `time` pour exclure les secondes
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

                  {/* Affichage conditionnel de event.location et formattedTime */}
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
