// Hooks
    import { useEffect, useState } from "react"
    import md5 from "blueimp-md5"
//.

// Estilo
    import './styles/ListaAPI.css'
//.

// Componentes
    import BotaoFavorito from "./BotaoFavorito"
//.

// Keys para a API
    const CHAVE_PUBLICA = "5323f4be36461aa651d45a2c6c8035b0"    // Chave Pública do Usuário
    const CHAVE_PRIVADA = "dfc57c3ddfff308bbadcb36ec69b084480d73c2b"    // Chave Privada do Usuário
//.

function ListaAPI() {

  const [personagens, setPersonagens] = useState([])    // Dados do resultado da API - Personagens
  const [carregando, setCarregando] = useState(true)    // Carregamento da API

  const fraseEfeito = { // Frases de efeito para os personagens (especificos)
    "Spider-Man": "Vai teia 🕸",
    "Iron Man": "Eu sou o Homem de Ferro!",
    "Captain America": "O Primeiro Vingador!",
  }

  const emojis = {  // Emojis para os personagens (especificos)
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

        {personagens.map((heroi, index) => (    // Map para listar os primeiros 20

            <section
            key={heroi.id}  // Key da section
            className={`ListaAPI-Cards${index % 2 === 0 ? 1 : 2}`}  // Adiciona o numero da classe para mudar as cores (Ex: ListaAPI-Cards1 ou ListaAPI-Cards2)
            >
            <img
                src={`${heroi.thumbnail.path}/standard_xlarge.${heroi.thumbnail.extension}`}    // Caminho da imagem
                alt={heroi.name}    // Nome do heroi
                className="ListaAPI-Img"    // Classe da imagem
            />

            {/* Verifica se é um dos herois especificos. Se tiver, coloca o nome + o emoji, caso contrario só o nome. */}
            {/* Também, verifica se é par ou impar (fundo vermelho ou amarelo) para adicionar emoji aos cards TOXICOS */}
            <h3>{emojis[heroi.name] ? `${heroi.name} ${emojis[heroi.name]}` : `${heroi.name}`} {index % 2 === 0 ? "" : "☢⚠😫"}</h3>
            
            {/* Verifica se o heroi tem uma frase, caso contrario adiciona uma frase padrão */}
            <p>{fraseEfeito[heroi.name] || `${heroi.name} em ação! 🐱‍🏍`}</p>
                <BotaoFavorito
                    nome={emojis[heroi.name] ? `${heroi.name} ${emojis[heroi.name]}` : `${heroi.name}`}
                    img={`${heroi.thumbnail.path}/standard_xlarge.${heroi.thumbnail.extension}`}
                    frase={fraseEfeito[heroi.name] || `${heroi.name} em ação! 🐱‍🏍`}
                    
                />
            </section>
        ))}
        </section>
    </>
  )
}
export default ListaAPI
