import React from 'react'
import LoginForm from '../components/LoginForm';
import '../styles/connexionRegistration.scss'


function Connexion() {
  const handleConnexion = (formData) => {
    // Utilisez formData pour traiter la connexion
    console.log('Données de connexion:', formData);
  };

  return (
    <LoginForm
      title='Connexion'
      buttonText='Connexion'
      changeText="S'inscrire ? Par ici !"
      changeLink='/registration'
      onSubmit={handleConnexion}
    />
  );
}

export default Connexion
