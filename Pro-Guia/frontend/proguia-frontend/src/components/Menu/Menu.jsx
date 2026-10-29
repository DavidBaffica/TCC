import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import api from "../../services/api";
import styles from "./Menu.module.css";
export default function Menu(){
 const [user,setUser]=useState(null),[open,setOpen]=useState(false);
 useEffect(()=>{api.get("/usuarios/me").then(({data})=>{if(data?.id)setUser(data)}).catch(()=>setUser(null))},[]);
 const foto=f=>!f?"https://cdn-icons-png.flaticon.com/512/149/149071.png":f.startsWith("data:")?f:`data:image/jpeg;base64,${f}`;
 return <header className={styles.nav}><div className={styles.inner}>
  <Link to="/" className={styles.brand}><span className={styles.mark}>P</span><span>pro<span>guia</span></span></Link>
  <button className={styles.toggle} onClick={()=>setOpen(v=>!v)} aria-label="Abrir menu">{open?"×":"☰"}</button>
  <nav className={`${styles.links} ${open?styles.linksOpen:""}`}>
   <NavLink to="/" end className={({isActive})=>isActive?styles.current:undefined} onClick={()=>setOpen(false)}>Início</NavLink>
   <NavLink to="/cursos" className={({isActive})=>isActive?styles.current:undefined} onClick={()=>setOpen(false)}>Explorar cursos</NavLink>
   <NavLink to="/curriculo" onClick={()=>setOpen(false)}>Currículo</NavLink>
   <NavLink to="/fale-conosco" onClick={()=>setOpen(false)}>Fale conosco</NavLink>
  </nav>
  <div className={styles.account}>{user?.nivelAcesso==="ADMIN"&&<Link className={styles.admin} to="/admin">Painel admin ↗</Link>}{user?<Link to="/perfil" title="Meu perfil"><img className={styles.profile} src={foto(user.foto)} alt="Perfil"/></Link>:<><Link className={styles.login} to="/login">Entrar</Link><Link className={styles.signup} to="/cadastro">Criar conta</Link></>}</div>
 </div></header>
}