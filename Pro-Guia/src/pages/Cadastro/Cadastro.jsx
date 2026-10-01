import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: '', cpf: '', telefone: '', idade: '', email: '', senha: '' });

  const handleCadastro = (e) => {
    e.preventDefault();
    
    // Puxa a lista de usuários ou cria uma lista vazia
    const usuariosSalvos = JSON.parse(localStorage.getItem("proguia_usuarios")) || [];
    
    // Verifica se já existe o email ou CPF
    const emailExiste = usuariosSalvos.find(user => user.email === formData.email);
    const cpfExiste = usuariosSalvos.find(user => user.cpf === formData.cpf);

    if (emailExiste) {
      return alert("Erro: Este e-mail já está em uso por outra conta!");
    }
    if (cpfExiste) {
      return alert("Erro: Este CPF já está cadastrado!");
    }

    // Salva o novo usuário na lista
    usuariosSalvos.push(formData);
    localStorage.setItem("proguia_usuarios", JSON.stringify(usuariosSalvos));
    
    // Define este usuário como o logado atual
    localStorage.setItem("proguia_logado", formData.email);
    
    alert("Conta criada com sucesso! Você foi logado automaticamente.");
    navigate("/");
  };

  return (
    <>
      <Menu />
      <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: "80vh" }}>
        <div className="card p-5 shadow" style={{ maxWidth: "500px", width: "100%" }}>
          <h2 className="fw-bold text-primary text-center mb-4">Crie sua Conta</h2>
          <form onSubmit={handleCadastro}>
            <input type="text" className="form-control mb-3" placeholder="Nome Completo" required 
              onChange={(e) => setFormData({...formData, nome: e.target.value})} />
            
            <input type="text" className="form-control mb-3" placeholder="CPF (Apenas números)" required maxLength="11"
              onChange={(e) => setFormData({...formData, cpf: e.target.value})} />
              
            <input type="tel" className="form-control mb-3" placeholder="Telefone / WhatsApp" required 
              onChange={(e) => setFormData({...formData, telefone: e.target.value})} />

            <input type="number" className="form-control mb-3" placeholder="Idade" required 
              onChange={(e) => setFormData({...formData, idade: e.target.value})} />
              
            <input type="email" className="form-control mb-3" placeholder="E-mail" required 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
              
            <input type="password" className="form-control mb-4" placeholder="Senha" required 
              onChange={(e) => setFormData({...formData, senha: e.target.value})} />
              
            <button type="submit" className="btn btn-success w-100 fw-bold mb-3">Concluir e Entrar</button>
          </form>
          <p className="text-center text-muted small">
            Já possui conta? <Link to="/login">Faça login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Cadastro;