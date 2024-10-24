import React from 'react'
import { NavLink } from 'react-router-dom'

function DisconnectButton() {
  return (
    <div className='disconnect'>
      <NavLink to='/connexion'>Se déconnecter</NavLink>
    </div>
  )
}

export default DisconnectButton
