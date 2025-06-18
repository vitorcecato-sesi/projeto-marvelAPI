// Hooks
  import { BrowserRouter, Route, Routes } from 'react-router-dom'
//.

// Estilos
  import './App.css'
//.

// Páginas
import Home from './pages/Home'
import ListaPersonagens from "./components/buscaHome";
import MaisInfo from "./pages/MaisInfo";
import Favoritos from './pages/ListaDefavoritos'
import SobreApp from './pages/SobreApp'
//.

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Favoritos' element={<Favoritos />} />
          <Route path='/Sobre' element={<SobreApp />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;