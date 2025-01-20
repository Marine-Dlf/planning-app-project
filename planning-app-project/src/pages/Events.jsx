import React from 'react'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import '../styles/pages/events.scss'


function Events() {

  return (
    <div>
        <Header />
        <Navigation />
        <div className='events'>
          <h1>Evènements</h1>
        </div>
    </div>
  )
}

export default Events
