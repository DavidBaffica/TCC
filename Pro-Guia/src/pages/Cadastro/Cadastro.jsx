import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmaSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className="app-container">
      <div className="base-card">
        <h2>Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input 
              type="text" 
              className="form-input"
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              className="form-input"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
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
            />
          </div>
          <div className="form-group">
            <label>Confirmar Senha</label>
            <input 
              type="password" 
              className="form-input"
              value={confirmaSenha} 
              onChange={(e) => setConfirmaSenha(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
        <p className="footer-text">
          Já tem uma conta? <Link to="/">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;