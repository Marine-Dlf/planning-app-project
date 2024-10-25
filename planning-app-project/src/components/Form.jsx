import React, { useState } from 'react'
import '../styles/components/popup.scss'


function Form({ closePopup }) {

    const [formData, setFormData] = useState({
        eventName: '',
        time: '',
        location: '',
        comment: ''
    });

    // Fonction qui détecte un changement
    const handleChange = (e) => {
        const {name, value} = e.target      // Récupère automatiquement le name et le value de l’élément (input) qui a déclenché l'événement onChange. (Cet objet fait référence à l'élément qui a déclenché l'événement (ici: un input du formulaire)   (name correspond à l'attribut name de l'élément de formulaire (input, textarea, etc.))  ( Cela correspond à la valeur actuelle du champ de formulaire (value à ce que l'utilisateur vient de taper (ou sélectionner) dans l'input)))
        
        // Utilise le name du champ pour mettre à jour la valeur correcte dans l'objet formData. Avec ...prevData, elle conserve toutes les autres propriétés de formData intactes, et met seulement à jour le champ qui a changé.
        setFormData((prevData) => ({        // Mise à jour de l'état formData. La fonction prend un callback (fonction de rappel) qui a accès à la version précédente de l'état, prevData (les anciennes valeurs des champs de formulaire)
            ...prevData,                    // Le spread operator (...) permet de copier toutes les propriétés de l'objet prevData dans le nouvel objet qui sera retourné. Cela signifie que tous les champs de formulaire précédemment définis dans l'état seront conservés tels qu'ils étaient
            [name]: value,                  // Mise à jour uniquement du champ modifié
        }))
    }


    // Détecte la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)

        closePopup()
    }


  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <div className='formStep'>
            <label>Evènement</label>
            <input type='text' name='eventName' value={formData.eventName} onChange={handleChange}/>
        </div>
        <div className='formStep'>
            <label>Horaire</label>
            <input type='time' name='time' value={formData.time} onChange={handleChange}/>
        </div>
        <div className='formStep'>
            <label>Lieu</label>
            <input type='text' name='location' value={formData.location} onChange={handleChange}/>
        </div>
        <div className='formStep'>
            <label>Commentaire</label>
            <textarea name='comment' value={formData.comment} onChange={handleChange}/>
        </div>
        <div className='addButton'>
            <button type='submit'>Enregistrer</button>
        </div>
      </form>
    </div>
  )
}

export default Form
