import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Menu = () => {
  const [user, setUser] = useState(null);

  const avatarPadrao = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const exibirFoto = (foto) => {
    if (!foto) return avatarPadrao;
    if (foto.startsWith("data:")) return foto;

    const tipo = foto.startsWith("iVBOR") ? "png"
      : foto.startsWith("UklGR") ? "webp"
        : foto.startsWith("R0lGOD") ? "gif"
          : "jpeg";

    return `data:image/${tipo};base64,${foto}`;
  };

  useEffect(() => {
    api.get("/usuarios/me")
      .then((response) => {
        if (response.data?.id) {
          setUser(response.data);
        }
      })
      .catch(() => {
        // Usuário não autenticado
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Link principal do PROGUIA (leva para a Home) */}
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/Proguia">
          PROGUIA
        </Link>

        {/* Botão para menu mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de navegação */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/cursos">
                Cursos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/curriculo">
                Como Fazer Currículo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/fale-conosco">
                Fale Conosco
              </Link>
            </li>
          </ul>

          {/* Área da Conta (Foto de Perfil ou Botões de Login/Cadastro) */}
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <Link to="/perfil" className="text-decoration-none">
                <img
                  src={exibirFoto(user.foto)}
                  alt="Perfil"
                  className="rounded-circle border border-2 border-primary"
                  style={{ width: "42px", height: "42px", objectFit: "cover" }}
                />
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary btn-sm fw-semibold">
                  Login
                </Link>
                <Link to="/cadastro" className="btn btn-primary btn-sm fw-bold">
                  Cadastre-se
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;