import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="base-card">
        <h1>Bem-vindo! 🎉</h1>
        <p className="footer-text" style={{ marginBottom: '20px' }}>
          Você acessou o painel principal com sucesso.
        </p>
        <button onClick={() => navigate('/')} className="btn btn-danger">
          Sair da Conta
        </button>
      </div>
    </div>
  );
};

export default Home;