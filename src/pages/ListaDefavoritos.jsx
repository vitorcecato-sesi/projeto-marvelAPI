// Hooks
    import { useEffect, useState } from "react"
//.

// Style
    import "./styles/listaDefavoritos.css"
//.

// Componente
   

//.

function Favoritos() {
    const [infoFavorito, setInfoFavorito] = useState(JSON.parse(localStorage.getItem("Favoritos")) || []);

    useEffect(() => {
        const timer = setInterval(() => {
            setInfoFavorito(JSON.parse(localStorage.getItem("Favoritos")))
        }, 100)

        return() => {
            clearInterval(timer) // Remove o timer ao desmontar
        }
    }, [])

    const removerFavorito = (numeroArray) => {
        const novoFavoritos = infoFavorito.filter((conteudo, index) => index !== numeroArray)
        return (localStorage.setItem("Favoritos", JSON.stringify(novoFavoritos)))
    }

    return(
        <>
            <section className="bodyFavoritos">
                <section className="headerNavFav">
                    <Header />
                    <Navbar favoritos="ativo" />
                </section>
                <section className="mainFavoritos">
                    <h1>Favoritos</h1>
                    {infoFavorito && infoFavorito.length <= 0 && <p>Você não possui favoritos.</p>}
                    <section className="infoFavoritos">
                        {infoFavorito && infoFavorito.length > 0 && infoFavorito.map((personagem, index) => (
                            <section className="cartaFavoritos">
                                <img src={personagem.imagem} alt={`Imagem do ${personagem.nome} `} />
                                <h2>{personagem.nome}</h2>
                                <button id={document.body.style.backgroundColor == "red" ? "branco" : "vermelho"} className="buttonCarta" onClick={() => removerFavorito(index)}>Desfavoritar</button>
                            </section>
                        ))}
                    </section>
                
                    <br />
                </section>
            
            </section>
        </>
    )
}

export default Favoritos