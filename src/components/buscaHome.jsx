import React, { useEffect, useState } from "react";
import './styles/buscaHome.css';
import md5 from "blueimp-md5";

// Chaves da API da Marvel (⚠️ Evite expor a chave privada em produção)
const CHAVE_PUBLICA = "5323f4be36461aa651d45a2c6c8035b0";
const CHAVE_PRIVADA = "dfc57c3ddfff308bbadcb36ec69b084480d73c2b";

// Componente principal
function BuscaHome() {
    // Estados principais
    const [personagens, setPersonagens] = useState([]);       // Lista de personagens da Marvel
    const [carregando, setCarregando] = useState(false);      // Indica se os dados estão sendo carregados
    const [busca, setBusca] = useState("");                   // Texto da busca (após clicar no botão)
    const [buscaInput, setBuscaInput] = useState("");         // Texto do campo de entrada
    const [erro, setErro] = useState(false);                  // Exibe erro se o campo estiver vazio
    const [modoBusca, setModoBusca] = useState("nome");       // "nome" ou "descricao"

    // Frases especiais para certos heróis
    const fraseEfeito = {
        "Spider-Man": "Vai teia 🕸",
        "Iron Man": "Eu sou o Homem de Ferro!",
        "Captain America": "O Primeiro Vingador!",
    };

    // Emojis especiais para certos heróis
    const emojis = {
        "Spider-Man": "🕷🕸",
        "Iron Man": "🤖💸",
        "Captain America": "🛡",
    };

    // Efeito: busca por nome na API quando `busca` ou `modoBusca` mudar
    useEffect(() => {
        async function buscarPersonagens() {
            if (!busca || modoBusca !== "nome") return;

            setCarregando(true);
            const ts = Date.now().toString(); // Timestamp para autenticação
            const hash = md5(ts + CHAVE_PRIVADA + CHAVE_PUBLICA); // Gera hash MD5
            const url = `https://gateway.marvel.com/v1/public/characters?limit=12&ts=${ts}&apikey=${CHAVE_PUBLICA}&hash=${hash}&nameStartsWith=${busca.toLowerCase()}`;

            try {
                const resposta = await fetch(url);
                const dados = await resposta.json();
                setPersonagens(dados.data.results); // Atualiza os personagens
            } catch (error) {
                console.error("Erro na API:", error);
            } finally {
                setCarregando(false);
            }
        }

        buscarPersonagens();
    }, [busca, modoBusca]);

    // Efeito: busca por descrição (filtrando localmente)
    useEffect(() => {
        if (modoBusca !== "descricao" || !busca) return;

        async function buscarPorDescricao() {
            setCarregando(true);
            const ts = Date.now().toString();
            const hash = md5(ts + CHAVE_PRIVADA + CHAVE_PUBLICA);
            const url = `https://gateway.marvel.com/v1/public/characters?limit=100&ts=${ts}&apikey=${CHAVE_PUBLICA}&hash=${hash}`;

            try {
                const resposta = await fetch(url);
                const dados = await resposta.json();

                // Filtra localmente pela descrição
                const termo = busca.toLowerCase();
                const personagensFiltrados = dados.data.results.filter(personagem =>
                    (personagem.description || "").toLowerCase().includes(termo)
                );

                setPersonagens(personagensFiltrados);
            } catch (error) {
                console.error("Erro na API:", error);
            } finally {
                setCarregando(false);
            }
        }

        buscarPorDescricao();
    }, [busca, modoBusca]);

    // Função chamada ao clicar no botão de pesquisa
    const clicarBotao = () => {
        if (buscaInput.trim() === "") {
            setErro(true); // Campo vazio, mostra erro
            return;
        }

        setBusca(buscaInput);  // Define a busca final
        setBuscaInput("");     // Limpa o campo de input
        setErro(false);        // Oculta erro, se estava ativo
    };

    // JSX (interface)
    return (
        <>
            {/* Barra de busca */}
            <section className="BuscaAPI-box-Barra">
                <select
                    className="BuscaAPI-select"
                    value={modoBusca}
                    onChange={(e) => setModoBusca(e.target.value)}
                >
                    <option value="nome">Buscar por Nome</option>
                    <option value="descricao">Buscar por Descrição</option>
                </select>

                <input
                    className="BuscaAPI-pesquisar"
                    value={buscaInput}
                    onChange={(e) => setBuscaInput(e.target.value)}
                    placeholder="Insira o nome ou descrição do herói"
                />

                <button className="BuscaAPI-botaoPesquisa" onClick={clicarBotao}>🔍</button>

                {erro && (
                    <p className="BuscaAPI-erro">Por favor, insira um texto para buscar.</p>
                )}
            </section>

            {/* Exibição dos resultados */}
            <section className="BuscaAPI-BoxCards">
                {carregando ? (
                    <p>Carregando heróis...</p>
                ) : (
                    <>
                        {personagens.length === 0 ? (
                            <p>Nenhum personagem encontrado.</p>
                        ) : (
                            personagens.map((personagem) => (
                                <section className="BuscaAPI-Cards" key={personagem.id}>
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

                                    <p>
                                        {fraseEfeito[personagem.name] ||
                                            `${personagem.name} em ação! 🐱‍🏍`}
                                    </p>

                                    <p>
                                        {personagem.description || "Sem descrição disponível."}
                                    </p>
                                </section>
                            ))
                        )}
                    </>
                )}
            </section>
        </>
    );
}

export default BuscaHome;
