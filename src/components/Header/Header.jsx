import React from "react";
import logo from "./logo.png";
import "./Header.scss";
export default function Header() {
  return (
    <header className="header-container">
        <img className="header-logo" src={logo} alt="sportsee logo" />
          <h1 className= "header-accueil">
            <a href="/" >Accueil</a>
          </h1>
          <h1 className="header-about">
            <a href="/about">À propos</a>
          </h1>
          <h1 className= "header-services">
            <a href="/services">Services</a>
          </h1>
          <h1 className="header-contact">
            <a href="/contact">Contact</a>
          </h1>
    </header>
  );
}
