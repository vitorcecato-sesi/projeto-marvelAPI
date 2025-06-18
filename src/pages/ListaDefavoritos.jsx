// Hooks
import { useEffect, useState } from "react"; // Importa hooks do React
//.

// Style
import "./styles/listaDefavoritos.css"; // Importa o CSS da página
import TrocaDecor from "../components/BotaoTema"; // Importa componente de troca de tema
//.

// Componente

//.

function Favoritos() {
  // Declara o componente Favoritos
  const [infoFavorito, setInfoFavorito] = useState(
    JSON.parse(localStorage.getItem("Favoritos")) || []
  ); // Estado para armazenar favoritos

  useEffect(() => {
    // Efeito para atualizar favoritos periodicamente
    const timer = setInterval(() => {
      // Cria um timer
      setInfoFavorito(JSON.parse(localStorage.getItem("Favoritos"))); // Atualiza o estado com os favoritos do localStorage
    }, 100); // Intervalo de 100ms

    return () => {
      clearInterval(timer); // Remove o timer ao desmontar
    };
  }, []); // Executa apenas uma vez ao montar

  const removerFavorito = (numeroArray) => {
    // Função para remover favorito
    alert("Favorito removido!"); // Exibe um alerta ao remover
    const novoFavoritos = infoFavorito.filter(
      (conteudo, index) => index !== numeroArray
    ); // Filtra o favorito a ser removido
    return localStorage.setItem("Favoritos", JSON.stringify(novoFavoritos)); // Atualiza o localStorage
  };

  return (
    <>
      <section className="bodyFavoritos">
        {" "}
        {/* Container principal */}
        <section className="headerNavFav">
          {" "}
          {/* Header e navbar */}
          <Header /> {/* Componente Header */}
          <Navbar favoritos="ativo" /> {/* Componente Navbar com prop */}
        </section>
        <section className="mainFavoritos">
          {" "}
          {/* Conteúdo principal */}
          <h1>Favoritos</h1> {/* Título */}
          {infoFavorito && infoFavorito.length <= 0 && (
            <p>Você não possui favoritos.</p>
          )}{" "}
          {/* Mensagem se não houver favoritos */}
          <section className="infoFavoritos">
            {" "}
            {/* Lista de favoritos */}
            {infoFavorito &&
              infoFavorito.length > 0 &&
              infoFavorito.map(
                (
                  personagem,
                  index // Mapeia favoritos na ordem em que foram salvos
                ) => (
                  <section className="cartaFavoritos">
                    {" "}
                    {/* Card do favorito */}
                    <span className="rankFavorito">{index + 1}º</span>{" "}
                    {/* Exibe o número do ranking */}
                    <img
                      src={personagem.imagem}
                      alt={`Imagem do ${personagem.thumbnail.path} `}
                    />{" "}
                    {/* Imagem do personagem */}
                    <h2>{personagem.thumbnail.path}</h2>{" "}
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
                    </button>{" "}
                    {/* Botão para remover favorito */}
                  </section>
                )
              )}
          </section>
          <TrocaDecor /> {/* Componente de troca de tema */}
          <br /> {/* Espaço */}
        </section>
      </section>
    </>
  );
}

export default Favoritos; // Exporta o componente