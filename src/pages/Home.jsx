import { useState } from "react"
import ListaAPI from "../components/ListaAPI"

import Header from "../components/Header"
import ListaPersonagens from "../components/buscaHome"

function Home() {
    const [aperta, setAperta] = useState(true)
    return(
        <>

            <Header />
            <ListaPersonagens/>

            

        </>
    )
}

export default Home