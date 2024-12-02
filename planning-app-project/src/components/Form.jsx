import React, { useEffect, useState } from 'react'
import '../styles/components/popup.scss'


const EMPTY_EVENT = {
    typeName: '',
    eventName: '',
    time: '',
    location: '',
    comment: ''
}


function Form({ closePopup, selectedDate, fetchEvents, eventSelected, isEditMode, types }) {

    // Allows dates to be stored in a standardized YYYY-MM-DD format, compatible with many databases and API conventions
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;       // Returns the format YYYY-MM-DD
      };
    
      
    const convertToFrenchDate = (isoDate) => {
        const [year, month, day] = isoDate.split("-")
        return `${day}/${month}/${year}`        // Transforms "yyyy-mm-dd" into "dd/mm/yyyy"
    }


    const [formData, setFormData] = useState({
    ...EMPTY_EVENT,
    date: selectedDate ? convertToFrenchDate(formatDate(selectedDate)) : ""
    });


    const formfields = [
        { label: "Catégorie", type: "select", name: "types_id", options: types },
        { label: "Evènement", type: "text", name: "eventName"},
        { label: "Horaire", type: "time", name: "time"},
        { label: "Lieu", type: "text", name: "location"},
    ]


    // Pre-filling fields in form edit mode
    useEffect(() => {
        if (isEditMode && eventSelected) {
            setFormData({
                date: eventSelected.date ? convertToFrenchDate(eventSelected.date.split("T")[0]) : "",
                types_id: eventSelected.types_id || '',
                eventName: eventSelected.eventName || '',
                time: eventSelected.time || '',
                location: eventSelected.location || '',
                comment: eventSelected.comment || ''
            })
        }
    }, [isEditMode, eventSelected])


    // Detects change
    const handleChange = (e) => {
        const {name, value} = e.target      // Récupère automatiquement le name et le value de l’élément (input) qui a déclenché l'événement onChange. (Cet objet fait référence à l'élément qui a déclenché l'événement (ici: un input du formulaire)   (name correspond à l'attribut name de l'élément de formulaire (input, textarea, etc.))  ( Cela correspond à la valeur actuelle du champ de formulaire (value à ce que l'utilisateur vient de taper (ou sélectionner) dans l'input)))
        
        // Utilise le name du champ pour mettre à jour la valeur correcte dans l'objet formData. Avec ...prevData, elle conserve toutes les autres propriétés de formData intactes, et met seulement à jour le champ qui a changé.
        setFormData((prevData) => ({        // Mise à jour de l'état formData. La fonction prend un callback (fonction de rappel) qui a accès à la version précédente de l'état, prevData (les anciennes valeurs des champs de formulaire)
            ...prevData,                    // Le spread operator (...) permet de copier toutes les propriétés de l'objet prevData dans le nouvel objet qui sera retourné. Cela signifie que tous les champs de formulaire précédemment définis dans l'état seront conservés tels qu'ils étaient
            [name]: value,                  // Mise à jour uniquement du champ modifié (pour la date: conversion au format iso)
        }))
    }

    const convertToIsoDate = (frenchDate) => {
        const [day, month, year] = frenchDate.split("/")
        return `${year}-${month}-${day}`
    }

    // Detects form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Données envoyées:", formData);
        const method = isEditMode ? 'PUT' : 'POST'
        const url = isEditMode ? `http://localhost:5000/events/${eventSelected.id}` : 'http://localhost:5000/events'

        // Checks if eventName is valid (not empty)
        if (formData.eventName.trim() === '' || !formData.types_id) {
            alert("Merci de renseigner la catégorie et le nom de l'évènement")
            return
        }

        try {
            // If the 'time' field is empty, we set it to null
            const formDataToSend = {
            ...formData,
            time: formData.time === '' ? null : formData.time,
            date: convertToIsoDate(formData.date)
            }

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',             // Specifies the data is in JSON format
                },
                body: JSON.stringify(formDataToSend),               // Converts formData to JSON to send to the server
            });

            if (res.ok) {
                await fetchEvents();                                // Refresh events after adding
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
            {isEditMode ? (
                <div>
                <label>Date</label>
                    <input
                        type="text"
                        name="date"
                        value={formData.date || ''}
                        onChange={handleChange}
                />
                </div>
            ) : (
                <div className='hidden'>
                <label>Date</label>
                    <input
                        type="text"
                        name="date"
                        value={formData.date || ''}
                        readOnly   // Display the date in an unchangeable manner
                />
                </div>
            )
            }

            {formfields.map((field) => (
                <div key={field.name} className='formStep'>
                    <label>{field.label}</label>
                    {field.type === 'select' ? (
                        // Managing the category drop-down list
                        <select
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                        >
                            <option value="">- - Choisir une catégorie - -</option>
                            {field.options && Array.isArray(field.options) && field.options.map((option, index) => (
                                <option key={option.id || index} value={option.id}>
                                    {option.typeName}
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
