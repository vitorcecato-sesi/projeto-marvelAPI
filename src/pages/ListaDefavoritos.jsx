// Hooks
import React, { useEffect, useState } from "react"; // Importa React e hooks do React

// Style
import "./styles/listaDefavoritos.css"; // Importa o CSS da página
import TrocaDecor from "../components/BotaoTema"; // Importa componente de troca de tema
import Header from "../components/Header"; // Importa o componente Header
import Footer from "../components/Footer";
//.

// Componente principal da página de favoritos
function Favoritos() {
  // Estado para armazenar a lista de favoritos, buscando do localStorage ou iniciando vazio
  const [infoFavorito, setInfoFavorito] = useState(
    JSON.parse(localStorage.getItem("Favoritos")) || []
  );

  useEffect(() => {
    // Atualiza a lista de favoritos a cada 100ms para refletir mudanças no localStorage
    const timer = setInterval(() => {
      setInfoFavorito(JSON.parse(localStorage.getItem("Favoritos")) || []);
    }, 100);

    // Limpa o timer quando o componente for desmontado
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Função para remover um favorito individualmente
  const removerFavorito = (numeroArray) => {
    // Filtra o favorito pelo índice e atualiza o localStorage
    const novoFavoritos = infoFavorito.filter(
      (conteudo, index) => index !== numeroArray
    );
    return localStorage.setItem("Favoritos", JSON.stringify(novoFavoritos));
  };

  // Função para limpar todos os favoritos
  const limparFavoritos = () => {
    localStorage.setItem("Favoritos", JSON.stringify([])); // Limpa o localStorage
    setInfoFavorito([]); // Limpa o estado local
    alert("Todos os arquivos confidenciais foram destruidos. Nick fury Agradece!"); // Mostra alerta
  };

  // Seleciona os três primeiros favoritos para exibir em destaque
  const topTres = infoFavorito.slice(0, 3);

  return (
    <>
      <section className="bodyFavoritos">
        {/* Container principal da página */}
        <section className="headerNavFav">
          {/* Header e navbar */}
          <Header /> {/* Componente Header */}
        </section>
        <section className="mainFavoritos">
          {/* Conteúdo principal */}
          <h1>Favoritos</h1> {/* Título da página */}
          {infoFavorito && infoFavorito.length <= 0 && (
            <p>Você não possui favoritos.</p>
          )}
          {/* Mensagem se não houver favoritos */}

          <button
            className="limparFavoritos"
            onClick={limparFavoritos}
            style={{ margin: "10px 0" }}
          >
            Limpar todos os favoritos
          </button>
          {/* Botão para limpar todos os favoritos */}

          <section className="infoFavoritos">
            {/* Lista de favoritos */}
            {infoFavorito &&
              infoFavorito.length > 0 &&
              infoFavorito.map(
                (
                  personagem,
                  index // Mapeia favoritos na ordem em que foram salvos
                ) => (
                  <section className="cartaFavoritos" key={index}>
                    {/* Card do favorito */}
                    <img
                      src={personagem.img} // Imagem do personagem
                      alt={`Imagem do personagem ${personagem.nome}`} // Texto alternativo
                    />
                    {/* Imagem do personagem */}
                    <h2>{personagem.nome}</h2>
                    {/* Nome do personagem */}
                    <button
                      id={
                        document.body.style.backgroundColor == "red"
                          ? "branco"
                          : "vermelho"
                      }
                      className="buttonCarta"
                      onClick={() => removerFavorito(index)}
                    >
                      Desfavoritar
                    </button>
                    {/* Botão para remover favorito */}
                  </section>
                )
              )}
          </section>

          {/* Lista ordenada dos três primeiros favoritos (embaixo) */}
          {topTres.length > 0 && (
            <>
              <h2 style={{ marginTop: "30px" }}>Top 3 Favoritos</h2>
              <ol className="topTresFavoritos">
                {topTres.map((personagem, index) => (
                  <li key={index}>{personagem.nome}</li>
                ))}
              </ol>
            </>
          )}

          <TrocaDecor /> {/* Componente de troca de tema */}
          <br /> {/* Espaço */}
        </section>
        <Footer />
      </section>
    </>
  );
}

export default Favoritos; // Exporta o componente