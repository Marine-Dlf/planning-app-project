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
                {event.name}<br/> {/* Affichez le nom de l'événement ou d'autres détails */}
                {event.location ? <div className='infos'>{formattedTime} - {event.location}</div> : <div className='infos'>{formattedTime}</div>}
                {/* à modifier {formattedTime ? <div className='infos'>{formattedTime} - {event.location}</div> : <div className='infos'>{event.location}</div>} */}
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
