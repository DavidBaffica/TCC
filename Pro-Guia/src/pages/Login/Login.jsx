import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const usuariosSalvos = JSON.parse(localStorage.getItem("proguia_usuarios")) || [];
    
    // Procura um usuário que tenha o mesmo email e senha digitados
    const usuarioEncontrado = usuariosSalvos.find(user => user.email === email && user.senha === senha);

    if (usuarioEncontrado) {
      localStorage.setItem("proguia_logado", usuarioEncontrado.email);
      navigate("/perfil");
    } else {
      alert("E-mail ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <>
      <Menu />
      <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: "80vh" }}>
        <div className="card p-5 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Acessar PROGUIA</h2>
          </div>
          <form onSubmit={handleLogin}>
            <input type="email" className="form-control mb-3" placeholder="Digite seu e-mail" required 
              onChange={(e) => setEmail(e.target.value)} />
              
            <input type="password" className="form-control mb-4" placeholder="Digite sua senha" required 
              onChange={(e) => setSenha(e.target.value)} />
              
            <button type="submit" className="btn btn-primary w-100 fw-bold mb-3">Entrar</button>
            <p className="text-center text-muted small">
              Ainda não tem conta? <Link to="/cadastro" className="fw-bold">Cadastre-se</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;