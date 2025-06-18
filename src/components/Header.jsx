import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css"; // Importando a instalação do Font Awesome (Para usar os icones)
// npm install @fortawesome/fontawesome-free

import "./styles/Header.css";

function Header() {
  return (
    <>
      <section className="HeaderPrincipal">
        <a href="https://github.com/vitorcecato-sesi/projeto-marvelAPI" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i> {/* Icone do GitHub */}
        </a>

        <a href="https://www.marvel.com/" target="_blank" rel="noopener noreferrer">
          <img src="../../public/Marvel_Logo.png" alt="Marvel Logo" /> {/* Imagem Logo da Marvel */}
        </a>

        <h3> Find Your Super Hero</h3>
      </section>

      <nav className="Navbar">
        <Link to="/Home"> HOME </Link>
        <Link to="/Favoritos"> FAVORITOS </Link>
      </nav>
    </>
  );
}

export default Header;
