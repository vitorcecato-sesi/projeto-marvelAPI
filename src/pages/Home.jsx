import { useState } from "react"
import './styles/Home.css'
import ListaAPI from "../components/ListaAPI"
import Header from "../components/Header"
import BuscaHome from "../components/buscaHome"
import Footer from "../components/Footer"
import TrocaDeCor from "../components/BotaoTema"


function Home() {
    const [mostrar, setMostrar] = useState(true)
    return (
        <>
            <Header />
            <br></br>
            <br></br>
            <BuscaHome />
            <section className="Home-Body">
                <center>
                    <br/>
                    <br/>
                    <TrocaDeCor/>
                    <br />
                    <br />
                    <h1>Primeiros 20 Personagens da API</h1>
                    <br />
                    <button className="Home-Botao" onClick={() => setMostrar(!mostrar)}>{mostrar ? "Ocultar" : "Mostrar"}</button>
                    <br />
                    <br />
                    {mostrar && <ListaAPI />}
                </center>
                
            </section>
            <Footer />
        </>
    )
}

export default Home