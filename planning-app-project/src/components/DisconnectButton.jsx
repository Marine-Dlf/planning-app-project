import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/pages/connexionRegistration.scss'

function DisconnectButton() {
  return (
    <div className='disconnect'>
      <NavLink to='/connexion' className='disconnectBtn'>Se déconnecter</NavLink>
    </div>
  )
}

export default DisconnectButton
