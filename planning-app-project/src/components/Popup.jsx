import React, { useState } from 'react'

function Popup() {
    
    const [isOpen, setIsOpen] = useState(false);


    const handleClose = () => {
        setIsOpen(isOpen)
    }

  return (
    <div className='popup'>
        <button className='closeButton' onClick={handleClose}>❌</button>  
    </div>
  )
}

export default Popup
