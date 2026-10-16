import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import api from '../../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const email = formData.email.trim().toLowerCase();
      const response = await api.post('/usuarios/login', {
        username: email,
        password: formData.senha
      });

      localStorage.setItem("proguia_logado", email);
      localStorage.setItem("proguia_id", String(response.data.id));
      
      alert("Login realizado com sucesso!");
      navigate('/perfil');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("E-mail ou senha incorretos.");
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
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
              
            <input type="password" className="form-control mb-4" placeholder="Digite sua senha" required 
              onChange={(e) => setFormData({...formData, senha: e.target.value} )} />
              
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