import React from 'react'
import '../styles/components/popup.scss'


function Form() {
  return (
    <div>
      <form className='form'>
        <div className='formStep'>
            <label>Evènement</label>
            <input type='text' />
        </div>
        <div className='formStep'>
            <label>Horaire</label>
            <input type='text' />
        </div>
        <div className='formStep'>
            <label>Lieu</label>
            <input type='text' />
        </div>
        <div className='formStep'>
            <label>Commentaire</label>
            <input type='text' />
        </div>
        <div className='addButton'>
            <button type='submit'>Enregistrer</button>
        </div>
      </form>
    </div>
  )
}

export default Form
