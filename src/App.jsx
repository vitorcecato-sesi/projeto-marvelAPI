import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaPersonagens from "./components/buscaHome";
import MaisInfo from "./pages/MaisInfo";
 import SobreNos from './pages/SobreNos'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaPersonagens />} />
        <Route path="/detalhes/:id" element={<MaisInfo />} />
        <Route path='/SobreApp' element={<SobreNos />} />
      </Routes>
    </Router>
  );
}

export default App;