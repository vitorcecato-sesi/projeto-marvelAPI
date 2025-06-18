import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './styles/buscaHome.css';
import md5 from "blueimp-md5";

const CHAVE_PUBLICA = "5323f4be36461aa651d45a2c6c8035b0";
const CHAVE_PRIVADA = "dfc57c3ddfff308bbadcb36ec69b084480d73c2b";

function ListaPersonagens() {
  const [personagens, setPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [busca, setBusca] = useState("");
  const [buscaInput, setBuscaInput] = useState("");
  const [erro, setErro] = useState(false);

  const fraseEfeito = {
    "Spider-Man": "Vai teia 🕸",
    "Iron Man": "Eu sou o Homem de Ferro!",
    "Captain America": "O Primeiro Vingador!",
  };

  const emojis = {
    "Spider-Man": "🕷🕸",
    "Iron Man": "🤖💸",
    "Captain America": "🛡"
  };

  useEffect(() => {
    async function buscarPersonagens() {
      if (!busca) return;
      setCarregando(true);
      const ts = Date.now().toString();
      const hash = md5(ts + CHAVE_PRIVADA + CHAVE_PUBLICA);
      const url = `https://gateway.marvel.com/v1/public/characters?limit=12&ts=${ts}&apikey=${CHAVE_PUBLICA}&hash=${hash}&nameStartsWith=${busca.toLowerCase()}`;
      const resposta = await fetch(url);
      const dados = await resposta.json();
      setPersonagens(dados.data.results);
      setCarregando(false);
    }

    buscarPersonagens();
  }, [busca]);

  const clicarBotao = () => {
    if (buscaInput === "") {
      setErro(true);
      return;
    }
    setBusca(buscaInput);
    setBuscaInput("");
    setErro(false);
  };

  return (
    <>
      <section className="BuscaAPI-box-Barra">
        <input
          className="BuscaAPI-pesquisar"
          value={buscaInput}
          onChange={(e) => setBuscaInput(e.target.value)}
          placeholder="Insira o nome de um herói"
        />
        <button className="BuscaAPI-botaoPesquisa" onClick={clicarBotao}>🔍</button>
        {erro && <p style={{ color: "red" }}>Por favor, insira um nome válido.</p>}
      </section>

      {carregando ? (
        <p>Carregando heróis...</p>
      ) : (
        <section className="BuscaAPI-BoxCards">
          {personagens.length === 0 ? (
            <p>Nenhum personagem encontrado.</p>
          ) : (
            personagens.map((personagem) => (
              <Link
                to={`/detalhes/${personagem.id}`}
                key={personagem.id}
                className="BuscaAPI-Cards"
              >
                <img
                  className="BuscaAPI-Img"
                  src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`}
                  alt={personagem.name}
                />
                <h3>
                  {emojis[personagem.name]
                    ? `${personagem.name} ${emojis[personagem.name]}`
                    : personagem.name}
                </h3>
                <p>{fraseEfeito[personagem.name] || `${personagem.name} em ação! 🐱‍🏍`}</p>
              </Link>
            ))
          )}
        </section>
      )}
    </>
  );
}

export default ListaPersonagens;
