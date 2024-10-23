import React from 'react'
import '../styles/connexionRegistration.scss'
import { NavLink } from 'react-router-dom'


function Connexion() {
  return (
    <div className='parent'>
      <div className='connexionRegistration'>
        <h1>Connexion</h1>
        <form>
          <label>Pseudo</label>
          <input type='text'/>
          <label>E-mail</label>
          <input type='text'/>
          <label>Mot de Passe</label>
          <input type='text'/>
          <button type='submit'>Connexion</button>
          <NavLink to='/registration' className='changePage'>S'inscrire ? Par ici !</NavLink>
        </form>
      </div>
    </div>
  )
}

export default Connexion
