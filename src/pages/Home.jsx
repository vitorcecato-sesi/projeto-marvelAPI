import { useState } from "react"
import ListaAPI from "../components/ListaAPI"

function Home() {
    const [aperta, setAperta] = useState(true)
    return(
        <>
            <button onClick={() => setAperta(!aperta)}>APERTA</button>
            {aperta && <ListaAPI />}
        </>
    )
}

export default Home