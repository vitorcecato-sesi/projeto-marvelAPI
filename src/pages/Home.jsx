import { useState } from "react"
import ListaAPI from "../components/ListaAPI"
import Header from "../components/Header"
import BuscaHome from "../components/buscaHome"
import Footer from "../components/Footer"

function Home() {
    return(
        <>
            <Header />
            <BuscaHome/>
            <ListaAPI/>
            <Footer/>

        </>
    )
}

export default Home