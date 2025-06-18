import { useState } from "react"
import ListaAPI from "../components/ListaAPI"

import Header from "../components/Header"

function Home() {
    const [aperta, setAperta] = useState(true)
    return(
        <>
        


        <ListaAPI />
        </>
    )
}

export default Home