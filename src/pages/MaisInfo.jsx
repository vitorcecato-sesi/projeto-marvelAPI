import "./styles/Info.css"; // Importando o CSS específico para a página

function MaisInfo() {
  return (
    <div className="info-blocao">
      <div className="info-bloco-img">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/mcu-opener-revision-2-66a283368d5e0.jpg?crop=0.891xw:0.656xh;0.0748xw,0.0788xh&resize=640:*"
          alt="Marvel"
        />
      </div>
      <div className="info-bloco-texto">
        <h1>Mais Informações</h1>
        <p>Esta página contém informações adicionais sobre os personagens da Marvel.</p>
      </div>
    </div>
  );
}

export default MaisInfo;
