import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importando a instalação do Font Awesome (Para usar os icones)
//npm install @fortawesome/fontawesome-free

//CSS
import "../components/styles/Footer.css"

//Imagens
import LogoFooterM from "../assets/logoFooterM.png"

function Footer() {
    return (
        <>
        <br/>

        <footer className="footerBlocoPrincipal"> 
            <Link to="https://developer.marvel.com/"> <img className="LogoFooterMarvel" src={LogoFooterM} alt="Logo da Marvel" /> </Link>

            <section className="blocoLinksPaginas"> 
                <strong> <Link to="/"> HOME </Link> </strong> {/* strong -> negrito */}
                <strong> <Link to="/"> FAVORITOS </Link> </strong> 
                <strong> <Link to="/SobreApp"> SOBRE O APP </Link>  </strong>
            </section>

            <section className="blocoLinksPaginas"> 
                <strong> <Link to="https://www.marvel.com/games"> JOGOS </Link> </strong>
                <strong> <Link to="https://www.marvel.com/movies"> FILMES </Link> </strong>
                <strong> <Link to="https://www.marvel.com/comics"> COMICS </Link>  </strong>
            </section>

            <section className="MensagemEngraçada"> 
                <p> Bem Vindos Devenger’s! </p> 
            </section>

            <section className="iconesRedesSociais"> 
                <Link to="https://www.facebook.com/Marvel/"> <i class="fa-brands fa-facebook"></i> </Link>
                <Link to="https://www.instagram.com/marvel/"> <i class="fa-brands fa-instagram"></i> </Link>
                <Link to="https://www.youtube.com/marvel"> <i class="fa-brands fa-youtube"> </i> </Link>
            </section>

        </footer>
        </>
    )
}

export default Footer