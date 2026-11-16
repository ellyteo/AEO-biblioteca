import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import DashBoard from './pages/DashBoard'
import Livros from './pages/Livros'
import Autores from './pages/Autores'
import Categorias from './pages/categorias'
import Emprestimos from './pages/Emprestimos'
import PrivateRoute from './routes/PrivateRoute'
function App() {

  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/bibliotecario" element={<DashBoard />} />
          <Route path="/bibliotecario/livros" element={<Livros />} />
          <Route path="/bibliotecario/autores" element={<Autores />} />
          <Route path="/bibliotecario/categorias" element={<Categorias />} />
          <Route path="/bibliotecario/emprestimos" element={<Emprestimos />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
