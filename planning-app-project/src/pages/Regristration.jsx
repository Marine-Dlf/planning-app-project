import React from 'react'
import LoginForm from '../components/LoginForm';
import '../styles/pages/connexionRegistration.scss'


function Registration() {

  const handleRegistration = (formData) => {
    // Use formData to handle the registration
    console.log('Données d\'inscription:', formData);
  };

  return (
    <LoginForm
      title='Inscription'
      buttonText='Inscription'
      changeText="Déjà un compte ? Se connecter"
      changeLink='/connexion'
      onSubmit={handleRegistration}
    />
  );
}

export default Registration
