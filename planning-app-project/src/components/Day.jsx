import React from 'react'

function Day({ day, onClick }) {
  return (
    <div
      className={'day' + (day === "" ? " emptyCase" : "")}
      onClick={onClick}
    >
    {day !== "" ? day : ""}
    </div>
  )
}


export default Day
