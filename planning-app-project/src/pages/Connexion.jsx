import React from 'react'
import '../styles/connexion.scss'


function Connexion() {
  return (
    <div className='parent'>
      <div className='connexion'>
        <h1>Connexion</h1>
        <form>
          <label>Pseudo</label>
          <input type='text'/>
          <label>E-mail</label>
          <input type='text'/>
          <label>Mot de Passe</label>
          <input type='text'/>
          <button type='submit'>Connexion</button>
        </form>
      </div>
    </div>
  )
}

export default Connexion
