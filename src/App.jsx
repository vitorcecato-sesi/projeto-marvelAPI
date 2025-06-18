// Hooks
  import { BrowserRouter, Route, Routes } from 'react-router-dom'
//.

// Estilos
  import './App.css'
//.

// Páginas
  import Home from './pages/Home'
  import SobreNos from './pages/SobreNos'
//.

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/SobreNos' element={<SobreNos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
