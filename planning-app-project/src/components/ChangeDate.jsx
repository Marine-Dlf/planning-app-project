import React from 'react'
import { useState } from 'react'
import '../styles/components/changeDate.scss'


const monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']



function ChangeDate() {

    // const today = new Date()
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

    // Move to the precious or next year
    const nextYear = () => (setCurrentYear(currentYear + 1));
    const previousYear = () => (setCurrentYear(currentYear - 1));

    // Move to the precious or next month
    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    const previousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    return (
        <div className='changeDate'>
            <div className='changeYear'>
                <button className='changeYearButton' onClick={previousYear}>‹</button>
                <button>{currentYear}</button>
                <button className='changeYearButton' onClick={nextYear}>›</button>
            </div>
            <div className='changeMonth'>
                <button className='changeMonthButton' onClick={previousMonth}>‹ Précédent</button>
                <button>{monthName[currentMonth]}</button>
                <button className='changeMonthButton' onClick={nextMonth}>Suivant ›</button>
            </div>
        </div>
    )
}

export default ChangeDate
