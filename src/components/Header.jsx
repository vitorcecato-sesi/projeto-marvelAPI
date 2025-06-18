import { Link } from "react-router-dom";

import '@fortawesome/fontawesome-free/css/all.min.css'; // Importando a instalação do Font Awesome (Para usar os icones)
import "./styles/Header.css"

function Header() {
    return(
        <>
        <section className="HeaderPrincipal">
            <i class="fa-brands fa-github"></i>
            <img src="../../public/Marvel_Logo.png" alt="Marvel Logo" />
        </section>

        <nav className="Navbar">
            <Link to="/"> HOME </Link>
            <Link to="/"> FAVORITOS </Link>
        </nav>
        
        </>
    )
}

export default Header