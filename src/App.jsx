// Hooks
  import { BrowserRouter, Route, Routes } from 'react-router-dom'
//.

// Estilos
  import './App.css'
//.

// Páginas
  import Header from './components/Header'
//.

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
