import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaPersonagens from "./components/buscaHome";
import MaisInfo from "./pages/MaisInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaPersonagens />} />
        <Route path="/detalhes/:id" element={<MaisInfo />} />
      </Routes>
    </Router>
  );
}

export default App;