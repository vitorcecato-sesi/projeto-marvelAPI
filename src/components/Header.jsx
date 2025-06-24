import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css"; // Importando a instalação do Font Awesome (Para usar os icones)
// npm install @fortawesome/fontawesome-free

import "./styles/Header.css";

import LogoMarvel from '../assets/Marvel_Logo.png'

function Header() {
  return (
    <>
      <section className="HeaderPrincipal">
        <Link to="https://github.com/vitorcecato-sesi/projeto-marvelAPI" target="_blank">
          <i className="fa-brands fa-github"></i> {/* Icone do GitHub */}
        </Link>

        <Link to="https://www.marvel.com/" target="_blank">
          <img src={LogoMarvel} alt="Marvel Logo" /> {/* Imagem Logo da Marvel */}
        </Link>

        <h3> Find Your Super Hero</h3>
      </section>

      <nav className="Navbar">
        <Link to="/"> HOME </Link>
        <Link to="/Favoritos"> FAVORITOS </Link>
        <Link to="/Sobre"> SOBRE O APP </Link>
      </nav>
    </>
  );
}

export default Header;
