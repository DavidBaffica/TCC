import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminHome from "./AdminHome";
import AdminMensagens from "./AdminMensagens";
import AdminCursos from "./AdminCursos";
export default function AdminRoutes(){return <Routes><Route element={<AdminLayout/>}><Route index element={<AdminHome/>}/><Route path="mensagens" element={<AdminMensagens/>}/><Route path="cursos" element={<AdminCursos/>}/></Route></Routes>}