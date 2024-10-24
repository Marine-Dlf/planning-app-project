import React from 'react'
import '../styles/components/changeDate.scss'


const monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']



function ChangeDate({ currentMonth, setCurrentMonth, currentYear, setCurrentYear, displayPopup }) {

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


    // Diplay months
    let nextMonthName
    currentMonth === 11 ? nextMonthName = monthName[0] : nextMonthName = monthName[currentMonth + 1]

    let previousMonthName
    currentMonth === 0 ? previousMonthName = monthName[11] : previousMonthName = monthName[currentMonth - 1]


    return (
        <div className='changeDate'>
            <div className='changeYear'>
                <button className='changeYearButton' onClick={previousYear}>‹</button>
                <button onClick={() => displayPopup('year')}>{currentYear}</button>
                <button className='changeYearButton' onClick={nextYear}>›</button>
            </div>
            <div className='changeMonth'>
                <button className='changeMonthButton' onClick={previousMonth}>‹ {previousMonthName}</button>
                <button className='currentMonthButton' onClick={() => displayPopup('month')}>{monthName[currentMonth]}</button>
                <button className='changeMonthButton' onClick={nextMonth}>{nextMonthName} ›</button>
            </div>
        </div>
    )
}

export default ChangeDate
