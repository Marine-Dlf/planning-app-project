import React from 'react'
import LoginForm from '../components/LoginForm';
import '../styles/connexionRegistration.scss'


function Registration() {

  const handleRegistration = (formData) => {
    // Utilisez formData pour traiter l'inscription
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
