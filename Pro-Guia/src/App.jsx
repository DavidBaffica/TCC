import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Cadastro from "./pages/Cadastro/Cadastro"
import Home from "./pages/Home/Home"
import Perfil from './pages/Perfil/Perfil';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
