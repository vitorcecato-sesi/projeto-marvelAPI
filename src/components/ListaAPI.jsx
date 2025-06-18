// Hooks
    import { useEffect, useState } from "react"
    import md5 from "blueimp-md5"
//.

// Estilo
    import './styles/ListaAPI.css'
//.

// Keys para a API
    const CHAVE_PUBLICA = "5323f4be36461aa651d45a2c6c8035b0"    // Chave Pública do Usuário
    const CHAVE_PRIVADA = "dfc57c3ddfff308bbadcb36ec69b084480d73c2b"    // Chave Privada do Usuário
//.

function ListaAPI() {

  const [personagens, setPersonagens] = useState([])    // Dados do resultado da API - Personagens
  const [carregando, setCarregando] = useState(true)    // Carregamento da API

  const fraseEfeito = {
    "Spider-Man": "Vai teia 🕸",
    "Iron Man": "Eu sou o Homem de Ferro!",
    "Captain America": "O Primeiro Vingador!",
  }

  const emojis = {
    "Spider-Man": "🕷🕸",
    "Iron Man": "🤖💸",
    "Captain America": "🛡"
  }

  useEffect(() => { // Assim que o usuário carregar a página, a busca será feita

    async function buscarPersonagens() {

      setCarregando(true)   // Alterar estado para carregando

      const ts = Date.now().toString()  // Obter data atual

      const hash = md5(ts + CHAVE_PRIVADA + CHAVE_PUBLICA)  // Necessário para o uso da API

      const url = `https://gateway.marvel.com/v1/public/characters?limit=21&ts=${ts}&apikey=${CHAVE_PUBLICA}&hash=${hash}`

      const resposta = await fetch(url) // Tentar consulta com API

      const dados = await resposta.json()   // Obter dados em JSON

      setPersonagens(dados.data.results)    // Salvar dado em nossa variável

      setCarregando(false)  // Fim do carregamento

    }

    buscarPersonagens() // Chamar função para buscar
  }, [])

  if (carregando) return <p>Carregando heróis...</p>

  console.log(JSON.stringify(personagens))

  return (
    <>
        <section className="ListaAPI-Todos">
        {personagens.map((heroi, index) => (
            <section
            key={heroi.id}
            className={`ListaAPI-Cards${index % 2 === 0 ? 1 : 2}`}
            >
            <img
                src={`${heroi.thumbnail.path}/standard_xlarge.${heroi.thumbnail.extension}`}
                alt={heroi.name}
                className="ListaAPI-Img"
            />
            <h3>{emojis[heroi.name] ? `${heroi.name} ${emojis[heroi.name]}` : `${heroi.name}`} {index % 2 === 0 ? "" : "☢⚠😫"}</h3>
            <p>{fraseEfeito[heroi.name] || `${heroi.name} em ação! 🐱‍🏍`}</p>
            </section>
        ))}
        </section>
    </>
  )
}
export default ListaAPI
