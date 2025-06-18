import { useState } from "react"
import ListaAPI from "../components/ListaAPI"

import Header from "../components/Header"

function Home() {
    const [aperta, setAperta] = useState(true)
    return(
        <>
            <button onClick={() => setAperta(!aperta)}>APERTA</button>
            {aperta && 
            <section style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                <ListaAPI />
            </section>
            }
        </>
    )
}

export default Home