import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/connexionRegistration.scss'


function Registration() {
  return (
    <div className='parent'>
      <div className='connexionRegistration'>
        <h1>Inscription</h1>
        <form>
          <label>Choisis un pseudo</label>
          <input type='text'/>
          <label>E-mail</label>
          <input type='text'/>
          <label>Crée ton mot de passe</label>
          <input type='text'/>
          <button type='submit'>Insciption</button>
          <NavLink to='/connexion' className='changePage'>Déjà un compte ? Se connecter</NavLink>
        </form>
      </div>
    </div>
  )
}

export default Registration
