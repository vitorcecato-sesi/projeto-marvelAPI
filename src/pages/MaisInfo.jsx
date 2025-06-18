import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";

import Header from "../components/Header";
import BotaoTema from "../components/BotaoTema";
import "./styles/Info.css";

function MaisInfo() {
  const { id } = useParams();
  const [heroi, setHeroi] = useState(null);
  const [hqs, setHqs] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const publicKey = "5323f4be36461aa651d45a2c6c8035b0";
    const privateKey = "dfc57c3ddfff308bbadcb36ec69b084480d73c2b";
    const ts = Date.now().toString();
    const hash = md5(ts + privateKey + publicKey);

    async function buscarDados() {
      try {
        const resPersonagem = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${id}`,
          { params: { ts, apikey: publicKey, hash } }
        );
        setHeroi(resPersonagem.data.data.results[0]);

        const resHQs = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${id}/comics`,
          { params: { ts, apikey: publicKey, hash, limit: 10 } }
        );
        setHqs(resHQs.data.data.results);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, [id]);

  if (carregando) {
    return (
      <div className="info-carregando-container">
        <div className="info-spinner"></div>
        <p>Carregando informações do herói...</p>
      </div>
    );
  }

  return (
  <>
    <Header />
<section className="info-parallax">
     <section className="info-bo">
        <BotaoTema/>
    </section>
   <section className="info-detalhes-container">
      {heroi ? (
        <>
          {/* CARD 1: imagem + texto */}
          <div className="info-detalhes-card">
            <div className="info-detalhes-img">
              {heroi.thumbnail && (
                <img
                  src={`${heroi.thumbnail.path}.${heroi.thumbnail.extension}`}
                  alt={heroi.name}
                />
              )}
            </div>
            <div className="info-detalhes-texto">
              <h1>{heroi.name}</h1>
              <p>{heroi.description || "Sem descrição disponível."}</p>
            </div>
          </div>

          {/* CARD 2: HQs */}
          <div className="info-hq-card">
            <h2>HQs em que aparece:</h2>
            <ul>
              {hqs.length > 0 ? (
                hqs.map((comic) => (
                  <li key={comic.id}>
                    <strong>{comic.title}</strong>
                  </li>
                ))
              ) : (
                <li>Sem HQs disponíveis.</li>
              )}
            </ul>
          </div>
        </>
      ) : (
        <p>Herói não encontrado.</p>
      )}
    </section>
</section>

   
  </>
);}
export default MaisInfo;
