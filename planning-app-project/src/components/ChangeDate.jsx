import React from 'react'
import { useState } from 'react'
import '../styles/components/changeDate.scss'


const monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']



function ChangeDate() {

    // const today = new Date()
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

  return (
    <div className='changeDate'>
        <div className='changeYear'>
            <button className='changeYearButton'>‹</button>
            <button>{currentYear}</button>
            <button className='changeYearButton'>›</button>
        </div>
        <div className='changeMonth'>
            <button className='changeMonthButton'>‹ Précédent</button>
            <button>{monthName[currentMonth]}</button>
            <button className='changeMonthButton'>Suivant ›</button>
        </div>
    </div>
  )
}

export default ChangeDate
