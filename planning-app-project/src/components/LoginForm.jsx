import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';


function LoginForm({ title, buttonText, changeText, changeLink, onSubmit }) {
  // Ajoutez l'état pour gérer les valeurs des champs
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: ''
  });

  // Fonction pour gérer les changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Adapter la fonction onSubmit pour inclure les données du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Passe les données du formulaire à la fonction onSubmit
  };


  return (
    <div className='parent'>
      <div className='connexionRegistration'>
        <h1>{title}</h1>
        <form onSubmit={handleSubmit}>
          <label>{title === 'Inscription' ? 'Choisis un pseudo' : 'Pseudo'}</label>
          <input
            type='text'
            name='pseudo'
            value={formData.pseudo}
            onChange={handleChange}
          />

          <label>E-mail</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />

          <label>{title === 'Inscription' ? 'Crée ton mot de passe' : 'Mot de Passe'}</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />

          <button type='submit'>{buttonText}</button>
          
          <NavLink to={changeLink} className='changePage'>
            {changeText}
          </NavLink>
        </form>
      </div>
    </div>
  );
}


export default LoginForm
