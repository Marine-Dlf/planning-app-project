import React from 'react'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import '../styles/pages/events.scss'
import EventsListDisplay from '../components/EventsListDisplay'

function Events() {
  return (
    <div>
        <Header />
        <Navigation />
        <div className='events'>
          <h1>Evènements</h1>
        </div>
        <EventsListDisplay />
    </div>
  )
}

export default Events
