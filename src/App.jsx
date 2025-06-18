// Hooks
  import { BrowserRouter, Route, Routes } from 'react-router-dom'
//.

// Estilos
  import './App.css'
  import Favoritos from './pages/ListaDefavoritos'
//.

// Páginas
  import Home from './pages/Home'
//.

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
