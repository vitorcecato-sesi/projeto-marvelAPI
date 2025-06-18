//Imagens
import FotoGrupo3 from "../assets/FotoGrupo3.png";
import LogoG3 from "../assets/logoG3.png";

//Componentes 
import Header from "../components/Header";
import Footer from "../components/Footer";
import BotaoTema from "../components/BotaoTema"

//CSS
import "../pages/styles/SobreApp.css";

function SobreNos() {
  return (
    <>
    <Header />

    <br/>
    <br/>

      <center>
        <section className="blocoSobrePrincipal">
          <section className="blocoFotoGrupo3">
            <h2 className="tituloGrupo"> GRUPO 3 </h2>
            <img className="fotoDoGrupo" src={FotoGrupo3} alt="Foto Do Grupo" />
          </section>

          <BotaoTema/>

          <section className="BlocoLogoEIntegrantes">
            <img className="logoSobreGrupo" src={LogoG3} alt="Logo do Grupo" />
            <h3>
              Integrantes: <br />
              Laura Betti Migliaccio <br />
              Lucas Casagrande da Silva <br />
              Milena Oliveira Souza <br />
              Pietro Melle Michelin <br />
              Pyetro Joaquim Taborda Nunes <br />
              Vitor Geraldo Cecato <br />
            </h3>
          </section>

          <section className="blocoSobreProjeto">
            <h2 className="tituloSobreProjeto"> Sobre O Projeto </h2>
            <p>
              O nosso projeto tem como objetivo criar um mini app de personagens
              da Marvel usando React + Vite utilizando o básico como listagem,
              busca e detalhes dos personagens. Será utilizado uma API da Marvel
              fornecidade pela Disney onde se utiliza chaves(keys) para obter o
              acesso e as informações disponibilizadas nela. Todas as
              resposabilidades e objetivos foram separadas e definidas no Trello,
              com cada integrante responsável por sua tarefa sempe pensando no
              desempenho do grupo!
            </p>
          </section>
        </section>
      </center>

      <Footer/>
    </>
  );
}

export default SobreNos;
