import { useState,useEffect } from "react"; // Importa os hooks useState e useEffect do React
import './styles/botaoTema.css' // Importa o CSS do botão de tema
function TrocaDeCor() { // Declara o componente TrocaDeCor
  const [tema, setTema] = useState( // Cria o estado tema e a função para alterá-lo
    ()=> JSON.parse(localStorage.getItem("modoEscuro")) || false // Inicializa o estado com o valor salvo no localStorage ou false
)  // Começa no claro
  
  useEffect(() => { // Efeito para atualizar o tema sempre que ele mudar
      document.body.style.backgroundColor = tema ? "red" : "white" // Altera a cor de fundo do body
      document.body.style.color = tema ? "white" : "black" // Altera a cor do texto do body
      console.log(`Tema atualizado: ${tema ? "Claro" : "Escuro"}`); // Loga no console qual tema está ativo
      localStorage.setItem("modoEscuro", JSON.stringify(tema)) // Salva o tema no localStorage
  }, [tema]) // Executa o efeito sempre que tema mudar

    return (
        <section className="button"> // Container do botão
      <div > // Div para o botão
 <button className="botao" onClick={() => setTema(!tema)} > {tema ? "claro" : "escuro"}</button> // Botão que alterna o tema e muda o texto
  
        
      </div> // Fecha a div
      </section> // Fecha a section
    );
  }
  
  export default TrocaDeCor; // Exporta o componente