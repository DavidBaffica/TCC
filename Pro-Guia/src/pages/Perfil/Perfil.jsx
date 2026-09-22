import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";

const Perfil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const avatarPadrao = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    const emailLogado = localStorage.getItem("proguia_logado");
    const usuarios = JSON.parse(localStorage.getItem("proguia_usuarios")) || [];
    const usuarioAtual = usuarios.find(u => u.email === emailLogado);

    if (usuarioAtual) {
      setUser(usuarioAtual);
      setEditForm(usuarioAtual);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Função para carregar a nova foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvarEdicao = (e) => {
    e.preventDefault();
    let usuarios = JSON.parse(localStorage.getItem("proguia_usuarios")) || [];
    
    usuarios = usuarios.map(u => u.email === user.email ? editForm : u);
    
    localStorage.setItem("proguia_usuarios", JSON.stringify(usuarios));
    setUser(editForm);
    setIsEditing(false);
    alert("Perfil atualizado com sucesso!");
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("proguia_logado");
    navigate("/login");
  };

  const handleExcluir = () => {
    if (window.confirm("Tem certeza que deseja excluir sua conta permanentemente?")) {
      let usuarios = JSON.parse(localStorage.getItem("proguia_usuarios")) || [];
      usuarios = usuarios.filter(u => u.email !== user.email);
      
      localStorage.setItem("proguia_usuarios", JSON.stringify(usuarios));
      localStorage.removeItem("proguia_logado");
      navigate("/");
    }
  };

  if (!user) return null;

  return (
    <>
      <Menu />
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center p-4 shadow-sm">
              <div className="position-relative mx-auto mb-3" style={{ width: "120px", height: "120px" }}>
                <img
                  src={isEditing ? (editForm.foto || avatarPadrao) : (user.foto || avatarPadrao)}
                  alt="Foto de Perfil"
                  className="rounded-circle w-100 h-100 border border-3 border-primary"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {!isEditing ? (
                <>
                  <h3 className="fw-bold">{user.nome}</h3>
                  <p className="text-muted mb-1">{user.email}</p>
                  <p className="text-muted mb-1">CPF: {user.cpf} | Tel: {user.telefone}</p>

                  <div className="d-flex flex-column gap-2 mt-4">
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary fw-semibold">Editar Perfil</button>
                    <button onClick={handleLogout} className="btn btn-outline-secondary fw-semibold">Sair da Conta (Logout)</button>
                    <button onClick={handleExcluir} className="btn btn-outline-danger btn-sm mt-2">Excluir Conta Permanentemente</button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSalvarEdicao} className="text-start mt-3">
                  {/* Botão de alterar a foto */}
                  <label className="form-label fw-semibold">Alterar Foto de Perfil</label>
                  <input type="file" accept="image/*" className="form-control mb-3" onChange={handleFotoChange} />

                  <label className="form-label fw-semibold">Nome Completo</label>
                  <input type="text" className="form-control mb-2" value={editForm.nome} onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })} required />
                  
                  <label className="form-label fw-semibold">Telefone</label>
                  <input type="tel" className="form-control mb-3" value={editForm.telefone} onChange={(e) => setEditForm({ ...editForm, telefone: e.target.value })} required />
                  
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success w-100 fw-bold">Salvar</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary w-100">Cancelar</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;