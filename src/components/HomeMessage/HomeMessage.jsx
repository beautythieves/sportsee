import React from "react";
import { Link } from 'react-router-dom';

function HomeMessage() {
  return (
    <div>
      <h1>Bienvenue sur SportSee</h1>
      <p>Projet 12 de la formation "dévelopeur d'applications Javascript-React d'Openclassrooms: réalisation d'un tableau de bord avec React et Recharts.
      Cliquez sur l'ID d'un utilisateur pour visualiser les données de son activité sportive sous forme de graphiques.</p>
      <div>
        <Link to="/12">
          <button>Utilisateur 12</button>
        </Link>
        <Link to="/18">
          <button>Utilisateur 18</button>
        </Link>
      </div>
    </div>
  );
}

export default HomeMessage;
