import { useState } from "react";
import Menu from "../../components/Menu/Menu";

const FaleConosco = () => {
  const [mensagemForm, setMensagemForm] = useState({ nome: '', email: '', assunto: '', texto: '' });

  const handleEnviarMensagem = (e) => {
    e.preventDefault();
    
    // Puxa as mensagens antigas ou cria uma lista vazia
    const mensagensSalvas = JSON.parse(localStorage.getItem("proguia_mensagens")) || [];
    
    // Adiciona a nova reclamação/mensagem
    mensagensSalvas.push(mensagemForm);
    
    // Salva no LocalStorage
    localStorage.setItem("proguia_mensagens", JSON.stringify(mensagensSalvas));
    
    alert("Mensagem enviada e salva com sucesso! Entraremos em contato em breve.");
    
    // Limpa o formulário após o envio
    setMensagemForm({ nome: '', email: '', assunto: '', texto: '' });
  };

  return (
    <>
      <Menu />
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 border-top border-primary border-4 bg-light">
              <div className="card-body p-5">
                <h2 className="fw-bold mb-4 text-center">Fale Conosco</h2>
                <p className="text-muted text-center mb-4">
                  Dúvidas sobre cursos, currículos ou reclamações? Envie uma mensagem.
                </p>
                <form onSubmit={handleEnviarMensagem}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Nome Completo</label>
                    <input type="text" className="form-control" placeholder="Digite seu nome" required 
                      value={mensagemForm.nome} onChange={(e) => setMensagemForm({...mensagemForm, nome: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">E-mail</label>
                    <input type="email" className="form-control" placeholder="seuemail@exemplo.com" required 
                      value={mensagemForm.email} onChange={(e) => setMensagemForm({...mensagemForm, email: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Assunto</label>
                    <select className="form-select" required value={mensagemForm.assunto} 
                      onChange={(e) => setMensagemForm({...mensagemForm, assunto: e.target.value})}>
                      <option value="">Selecione um assunto...</option>
                      <option value="duvida">Dúvida sobre Carreiras</option>
                      <option value="suporte">Suporte Técnico</option>
                      <option value="reclamacao">Reclamação</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Sua Mensagem</label>
                    <textarea className="form-control" rows="4" placeholder="Escreva aqui..." required 
                      value={mensagemForm.texto} onChange={(e) => setMensagemForm({...mensagemForm, texto: e.target.value})}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaleConosco;