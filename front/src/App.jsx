import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/Home'
import PrivateRoute from './routes/PrivateRoute'
function App() {

  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/bibliotecario" element={<Home />} />
        </Route>
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
