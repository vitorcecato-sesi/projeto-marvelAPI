// Importa o hook useParams do React Router para pegar o ID da URL
import { useParams } from "react-router-dom";

// Importa hooks do React: useEffect para efeitos colaterais e useState para estado
import { useEffect, useState } from "react";

// Importa a biblioteca axios para fazer requisições HTTP
import axios from "axios";

// Importa o md5 para gerar o hash exigido pela API da Marvel
import md5 from "md5";

// Importa o  cabeçalho
import Header from "../components/Header";

// Importa o botão de troca de tema
import BotaoTema from "../components/BotaoTema";

//Import o footer
import Footer from "../components/Footer";

// Importa o arquivo de estilos CSS da página
import "./styles/Info.css";

// Declara o componente funcional principal da página
function MaisInfo() {
  // Pega o parâmetro "id" da URL, usado para identificar o herói
  const { id } = useParams();

  // Estado que armazena os dados do herói
  const [heroi, setHeroi] = useState(null);

  // Estado que armazena os quadrinhos do herói
  const [hqs, setHqs] = useState([]);

  // Estado que indica se os dados ainda estão sendo carregados
  const [carregando, setCarregando] = useState(true);

  // Hook que executa assim que o componente é montado ou o ID muda
  useEffect(() => {
    // Chave pública fornecida pela API da Marvel
    const publicKey = "5323f4be36461aa651d45a2c6c8035b0";

    // Chave privada usada para gerar o hash
    const privateKey = "dfc57c3ddfff308bbadcb36ec69b084480d73c2b";

    // Timestamp atual, exigido pela autenticação
    const ts = Date.now().toString();

    // Gera o hash MD5 a partir do timestamp, chave privada e chave pública
    const hash = md5(ts + privateKey + publicKey);

    // Função assíncrona que busca os dados da API
    async function buscarDados() {
      try { // Tente executar este código
        // Faz requisição para buscar os dados do personagem pelo ID
        const resPersonagem = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${id}`,
          { params: { ts, apikey: publicKey, hash } }
        );


        // Salva o herói retornado no estado
        setHeroi(resPersonagem.data.data.results[0]);

        // Faz requisição para buscar as HQs associadas ao personagem
        const resHQs = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${id}/comics`,
          { params: { ts, apikey: publicKey, hash, limit: 10 } }
        );

        // Salva as HQs no estado
        setHqs(resHQs.data.data.results);
      } catch (error) {   // Se der erro, execute isso aqui
        // Mostra erro no console se a requisição falhar
        console.error("Erro ao buscar dados:", error);
      } finally {
        // Após requisições, marca como carregado
        setCarregando(false);
      }
    }

    // Chama a função que busca os dados
    buscarDados();
  }, [id]); // Executa novamente se o ID mudar

  // Se ainda estiver carregando os dados, mostra um spinner
  if (carregando) {
    return (
      <div className="info-carregando-container">
        {/* Animação de carregamento */}
        <div className="info-spinner"></div>

        {/* Mensagem de carregamento */}
        <p>Carregando informações do herói...</p>
      </div>
    );
  }

  // Conteúdo final da página após carregar
  return (
    <>
      {/* Componente de cabeçalho */}
      <Header />

      {/* Seção com efeito parallax no CSS */}
      <section className="info-parallax">
        
        {/* Botão para trocar o tema (claro/escuro) */}
        <section className="info-bo">
          <BotaoTema />
        </section>

        {/* Container com os detalhes do herói */}
        <section className="info-detalhes-container">

          {/* Se o herói existir */}
          {heroi ? (
            <>
              {/* CARD 1 - Imagem + Nome + Descrição do Herói */}
              <div className="info-detalhes-card">

                {/* Imagem do herói */}
                <div className="info-detalhes-img">
                  {heroi.thumbnail && (
                    <img
                      src={`${heroi.thumbnail.path}.${heroi.thumbnail.extension}`} // Monta o link da imagem
                      alt={heroi.name} // Texto alternativo da imagem
                    />
                  )}
                </div>

                {/* Texto com nome e descrição */}
                <div className="info-detalhes-texto">
                  <h1>{heroi.name}</h1>
                  <p>{heroi.description || "Sem descrição disponível."}</p>
                </div>
              </div>

              {/* CARD 2 - Lista de HQs */}
              <div className="info-hq-card">
                <h2>HQs em que aparece:</h2>

                {/* Lista de HQs */}
                <ul>
                  {hqs.length > 0 ? (
                    // Se houver HQs, exibe cada uma como item da lista
                    hqs.map((comic) => (
                      <li key={comic.id}>
                        <strong>{comic.title}</strong>
                      </li>
                    ))
                  ) : (
                    // Se não houver HQs
                    <li>Sem HQs disponíveis.</li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            // Caso o herói não seja encontrado
            <p>Herói não encontrado.</p>
          )}
        </section>
      </section>
      <Footer />
      
    </>
  );
}

// Exporta o componente para uso em outras partes do projeto
export default MaisInfo;