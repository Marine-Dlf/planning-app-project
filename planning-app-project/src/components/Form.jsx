import React, { useEffect, useState } from 'react'
import '../styles/components/popup.scss'


const EMPTY_EVENT = {
    typeName: '',
    eventName: '',
    time: '',
    location: '',
    comment: ''
}


function Form({ closePopup, selectedDate, fetchEvents, eventSelected, isEditMode }) {

    // // const [formData, setFormData] = useState(EMPTY_EVENT);

    // Permet de stocker les dates dans un format standardisé YYYY-MM-DD, compatible avec de nombreuses bases de données et conventions API
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;  // Retourne le format YYYY-MM-DD
      };
    

      const [formData, setFormData] = useState({
        ...EMPTY_EVENT,
        date: formatDate(selectedDate),  // Format local
      });


    const formfields = [
        { label: "Catégorie", type: "select", name: "typeName", options: ["Spectacle", "Concours", "Répétition", "Réunion", "Autre"] },
        { label: "Evènement", type: "text", name: "eventName"},
        { label: "Horaire", type: "time", name: "time"},
        { label: "Lieu", type: "text", name: "location"},
    ]


    // Pré-remplissage des champs en mode édition du formulaire
    useEffect(() => {
        if (isEditMode && eventSelected) {
            setFormData({
                typeName: eventSelected.typeName || '',
                eventName: eventSelected.eventName || '',
                time: eventSelected.time || '',
                location: eventSelected.location || '',
                comment: eventSelected.comment || ''
            })
        }
    }, [isEditMode, eventSelected])


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
    const handleSubmit = async (e) => {
        e.preventDefault()

        const method = isEditMode ? 'PUT' : 'POST'
        const url = isEditMode ? `http://localhost:5000/events/${eventSelected.id}` : 'http://localhost:5000/events'

        // Vérifie si eventName est valdide (non vide)
        if (formData.eventName.trim() === '') {
            alert('Evènement obligatoire')
            return
        }

        try {
            // Si le champ 'time' est vide, on le met à null
            const formDataToSend = {
            ...formData,
            time: formData.time === '' ? null : formData.time,
            }

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',             // Spécifie que les données sont au format JSON
                },
                body: JSON.stringify(formDataToSend),               // Convertit formData en JSON pour l'envoyer au serveur
            });

            if (res.ok) {
                await fetchEvents(); // Rafraîchit les événements après ajout
                console.log(`Evènement ${isEditMode ? 'modifié' : 'créé'} avec succès !`)
                closePopup()
            } else {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'événement :", error);
        }

    }


  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>

        <div className='formStep'>

            <div className='hidden'>
            <label>Date</label>
                <input
                    type="text"
                    name="date"
                    value={formData.date || ''}
                    readOnly   // Affiche la date de manière non modifiable
            />
            </div>


            {formfields.map((field) => (
                <div key={field.name} className='formStep'>
                    <label>{field.label}</label>
                    {field.type === 'select' ? (
                        // Gestion de la liste déroulante des catégories
                        <select
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                        >
                            <option value="">- - Choisir une catégorie - -</option>
                            {field.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
        </div>

        <div className='formStep'>
            <label>Commentaire</label>
            <textarea name='comment' value={formData.comment} onChange={handleChange}/>
        </div>

        <div className='saveButton'>
            <button type='submit'>{isEditMode ? 'Modifier' : 'Enregistrer'}</button>
        </div>

      </form>
    </div>
  )
}

export default Form
