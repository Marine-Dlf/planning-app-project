import React from 'react'
import LoginForm from '../components/LoginForm';
import '../styles/pages/connexionRegistration.scss'


function Connexion() {
  const handleConnexion = (formData) => {
    // Use formData to handle the connection
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
