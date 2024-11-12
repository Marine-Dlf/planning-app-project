import React from 'react'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import '../styles/pages/home.scss'

function Home() {
  return (
    <div>
        <Header />
        <Navigation />
        <div className='home'>
          <h1>Org-App</h1>
          <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, cupiditate excepturi architecto magnam dolore ea deserunt id. Consectetur natus, iste, dolores voluptatem omnis modi similique pariatur ullam delectus, neque vitae?
          </p>
        </div>
    </div>
  )
}

export default Home
