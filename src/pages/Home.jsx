import { useState } from "react"
import './styles/Home.css'
import ListaAPI from "../components/ListaAPI"
import Header from "../components/Header"
import BuscaHome from "../components/buscaHome"
import Footer from "../components/Footer"

function Home() {
    const [mostrar, setMostrar] = useState(true)
    return (
        <>
            <Header />
            <BuscaHome />
            <section className="Home-Body">
                <center>
                    <button className="Home-Botao" onClick={() => setMostrar(!mostrar)}>{mostrar ? "Ocultar" : "Mostrar"}</button>
                    {mostrar && <ListaAPI />}
                </center>
                
            </section>
            <Footer />
        </>
    )
}

export default Home