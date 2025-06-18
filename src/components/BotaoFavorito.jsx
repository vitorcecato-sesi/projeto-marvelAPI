// Hooks
    import { useEffect, useState } from "react";
//.

// Estilização
    import './styles/BotaoFavorito.css'
//.

function BotaoFavorito(props) {
    
    const informacoes = {
        nome: props.nome,
        img: props.img,
        frase: props.frase
    }

    const [infoFavoritos, setInfoFavoritos] = useState(JSON.parse(localStorage.getItem("Favoritos")) || []) // Obtém dados dos personagens favoritos
    
    const [favoritar, setFavoritar] = useState(false);  // Define a palavra que aparecerá no botão (Favoritar/Favoritado)

    useEffect(() => {   // Loop para atualizar as variáveis
    const timer = setTimeout(() => {
        setInfoFavoritos(JSON.parse(localStorage.getItem("Favoritos")) || [])
    }, 100);
    return () => clearTimeout(timer);
  })

    useEffect(() => {   //  Verifica se o personagem pesquisado está dentro da array de Favoritos
        const timer = setInterval(() => {
        const favoritoExistente = infoFavoritos.find(favorito => favorito.nome === informacoes.nome);
        if (favoritoExistente) {
            setFavoritar(true);
        } else {
            setFavoritar(false);
        }
    }, 100);

    return () => clearInterval(timer);
  })

    const guardarFavorito = () => {
    if (!favoritar) {
      const novoFavorito = [...infoFavoritos, informacoes]; // Cria uma nova array com as informações anteriores e o novo personagem
      localStorage.setItem("Favoritos", JSON.stringify(novoFavorito));  // Armazena a nova array no local storage
      setFavoritar(true);
    }
  };
  

    return(
        <>
            <button 
                className={favoritar ? "iconeEstrela fa-solid fa-star" : "iconeEstrela fa-regular fa-star"}
                onClick={guardarFavorito}
            
            ></button>
        </>
    )
}

export default BotaoFavorito