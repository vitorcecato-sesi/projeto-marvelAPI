// Hooks
  import { BrowserRouter, Route, Routes } from 'react-router-dom'
//.

// Estilos
  import './App.css'
  import Favoritos from './pages/ListaDefavoritos'
//.

// Páginas
  import MaisInfo from './pages/MaisInfo'
//.

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MaisInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
