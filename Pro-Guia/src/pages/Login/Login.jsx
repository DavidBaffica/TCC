import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];


    const usuarioValido = usuariosCadastrados.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (usuarioValido) {

      navigate('/home');
    } else {

      alert('E-mail ou senha incorretos!');
    }
  };

  return (
    <div className="app-container">
      <div className="base-card">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              className="form-input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </div>
          <button type="submit" className="btn btn-primary">Entrar</button>
        </form>
        <p className="footer-text">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;