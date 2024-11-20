import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';


function LoginForm({ title, buttonText, changeText, changeLink, onSubmit }) {
  // Add state to manage field values
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: ''
  });

  // Management of changes in fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Adapt the onSubmit function to include form data
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to the onSubmit function
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
