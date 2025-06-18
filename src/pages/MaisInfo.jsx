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

  useEffect(() => {
    const publicKey = "5323f4be36461aa651d45a2c6c8035b0";
    const privateKey = "dfc57c3ddfff308bbadcb36ec69b084480d73c2b";
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey);

    // Busca informações do personagem
    axios
      .get(`https://gateway.marvel.com/v1/public/characters/${id}`, {
        params: { ts, apikey: publicKey, hash },
      })
      .then((res) => {
        const personagem = res.data.data.results[0];
        setHeroi(personagem);
      })
      .catch((err) => console.error("Erro ao buscar herói:", err));

    // Busca HQs do personagem
    axios
      .get(`https://gateway.marvel.com/v1/public/characters/${id}/comics`, {
        params: { ts, apikey: publicKey, hash, limit: 10 },
      })
      .then((res) => {
        setHqs(res.data.data.results);
      })
      .catch((err) => console.error("Erro ao buscar HQs:", err));
  }, [id]);

  return (
    <>
      <Header />
      <section className="info-bo">
      <BotaoTema />
      </section>

      <section className="info-blocao">
        {heroi ? (
          <>
            <section className="info-bloco-texto">
              <h1>HQ</h1>
              <p>Veja abaixo as histórias em quadrinhos em que {heroi.name} aparece:</p>
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
            </section>
            <section className="info-bloco-img">
              <img
                src={`${heroi.thumbnail.path}.${heroi.thumbnail.extension}`}
                alt={heroi.name}
              />
            </section>
          </>
        ) : (
          <p>Carregando informações...</p>
        )}
      </section>
    </>
  );
}

export default MaisInfo;
