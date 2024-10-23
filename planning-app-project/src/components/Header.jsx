import React from 'react'
import '../styles/components/header.scss'
import DisconnectButton from './DisconnectButton'

function Header() {
  return (
    <div className='header'>
      <p>Org-App</p>
      <DisconnectButton />
    </div>
  )
}

export default Header
