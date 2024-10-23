import React, { useState } from 'react'
import '../styles/components/popup.scss'

function Popup({ day, currentMonth, currentYear, onClose }) {
    
    const formatedDate = new Date(currentYear, currentMonth, day).toLocaleDateString('fr-FR')


    return (
        <div className='popupBackground'>
            <div className='popup'>
                <button className='closeButton' onClick={onClose}>❌</button>  
                <div className='popupContent'>
                    <h3>{formatedDate}</h3>
                </div>
            </div>
        </div>
    )
}

export default Popup
