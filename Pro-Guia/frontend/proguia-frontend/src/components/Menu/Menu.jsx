
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import api from "../../services/api";
import styles from "./Menu.module.css";

export default function Menu() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api
      .get("/usuarios/me")
      .then(({ data }) => {
        if (data?.id) {
          setUser(data);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const foto = (arquivo) => {
    if (!arquivo) {
      return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }

    return arquivo.startsWith("data:")
      ? arquivo
      : `data:image/jpeg;base64,${arquivo}`;
  };

  const fecharMenu = () => setOpen(false);

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.mark}>P</span>
          <span>
            pro<span>guia</span>
          </span>
        </Link>

        <button
          className={styles.toggle}
          onClick={() => setOpen((valor) => !valor)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          {open ? "×" : "☰"}
        </button>

        <nav
          className={`${styles.links} ${open ? styles.linksOpen : ""}`}
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? styles.current : undefined
            }
            onClick={fecharMenu}
          >
            Início
          </NavLink>

          <NavLink
            to="/cursos"
            className={({ isActive }) =>
              isActive ? styles.current : undefined
            }
            onClick={fecharMenu}
          >
            Explorar cursos
          </NavLink>

          <NavLink to="/curriculo" onClick={fecharMenu}>
            Currículo
          </NavLink>

          <NavLink
            to="/proguia"
            className={({ isActive }) =>
              isActive ? styles.current : undefined
            }
            onClick={fecharMenu}
          >
            Pro Guia
          </NavLink>

          <NavLink to="/fale-conosco" onClick={fecharMenu}>
            Fale conosco
          </NavLink>
        </nav>

        <div className={styles.account}>
          {user?.nivelAcesso === "ADMIN" && (
            <Link className={styles.admin} to="/admin">
              Painel admin ↗
            </Link>
          )}

          {user ? (
            <Link to="/perfil" title="Meu perfil">
              <img
                className={styles.profile}
                src={foto(user.foto)}
                alt="Perfil"
              />
            </Link>
          ) : (
            <>
              <Link className={styles.login} to="/login">
                Entrar
              </Link>

              <Link className={styles.signup} to="/cadastro">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
