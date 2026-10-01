import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cursos from "../pages/Cursos/Cursos";
import Curriculo from "../pages/Curriculo/Curriculo";
import Proguia from "../pages/Proguia/Proguia";
import FaleConosco from "../pages/FaleConosco/FaleConosco";
import Perfil from "../pages/Perfil/Perfil";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import DetalhesTecnologia from "../pages/DetalhesTecnologia/DetalhesTecnologia";



function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/curriculo" element={<Curriculo />} />
        <Route path="/proguia" element={<Proguia />} />
        <Route path="/fale-conosco" element={<FaleConosco />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cursos/tecnologia" element={<DetalhesTecnologia />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;