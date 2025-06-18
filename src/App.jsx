// Hooks
  import { BrowserRouter, Route, Routes } from 'react-router-dom'
//.

// Estilos
  import './App.css'
//.

// Páginas
  import Home from './pages/Home'
  import SobreApp from './pages/SobreApp'
//.

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/SobreApp' element={<SobreApp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
