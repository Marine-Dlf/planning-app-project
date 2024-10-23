import React from 'react'

function Day({day}) {
  return (
    <div
      className={'day' + (day == "" ? " emptyCase" : "")}
    >
      {day !== "" ? day : ""}
    </div>
  )
}



export default Day
