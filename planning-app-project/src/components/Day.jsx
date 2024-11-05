import React from 'react'

function Day({ day, onClick, events }) {
  return (
    <div
      className={'day' + (day === "" ? " emptyCase" : "")}
      onClick={onClick}
    >
    
    {day !== '' ? (
        <>
          <p>{day}</p>
          {events.map((event, index) => (
            <div key={index} className='event'>
              {event.name} {/* Affichez le nom de l'événement ou d'autres détails */}
            </div>
          ))}
        </>
      ) : (
        ''
      )}
      
    </div>
  )
}


export default Day
