import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./Admin.module.css";

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/usuarios/me").then(({data}) => {
      if (data?.nivelAcesso === "ADMIN") setUser(data);
      else navigate("/login", {replace:true});
    }).catch(() => navigate("/login", {replace:true})).finally(() => setChecking(false));
  }, [navigate]);
  const sair = async () => {
    try { await api.post("/logout"); } catch {}
    localStorage.removeItem("proguia_logado"); localStorage.removeItem("proguia_id");
    navigate("/login");
  };
  if (checking) return <main className={styles.loading}>Preparando seu painel…</main>;
  if (!user) return <main className={styles.loading}>Verificando acesso…</main>;
  return <div className={styles.shell}>
    <aside className={styles.sidebar}>
      <NavLink to="/" className={styles.brand}><span className={styles.brandMark}>P</span><span>pro<span>guia</span><small>PAINEL ADMIN</small></span></NavLink>
      <p className={styles.navCaption}>ESPAÇO DE TRABALHO</p>
      <nav className={styles.nav}>
        <NavLink end to="/admin" className={({isActive})=>isActive?styles.active:undefined}><span>◫</span> Visão geral</NavLink>
        <NavLink to="/admin/mensagens" className={({isActive})=>isActive?styles.active:undefined}><span>✉</span> Fale conosco</NavLink>
        <NavLink to="/admin/cursos" className={({isActive})=>isActive?styles.active:undefined}><span>▤</span> Cursos</NavLink>
      </nav>
      <div className={styles.sidebarBottom}><div className={styles.avatar}>{(user.nome||"A").slice(0,1).toUpperCase()}</div><div className={styles.userText}><strong>{user.nome || "Administrador"}</strong><small>Administrador</small></div><button onClick={sair} title="Sair" className={styles.exit}>↗</button></div>
    </aside>
    <section className={styles.main}><header className={styles.topbar}><div><span className={styles.liveDot}/> SISTEMA OPERACIONAL</div><a href="/" className={styles.viewSite}>↗ <span>Ver site</span></a></header><div className={styles.content}><Outlet context={{user}} /></div></section>
  </div>;
}