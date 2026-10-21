import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import styles from "./DetalhesMarketing.module.css";

const DetalhesMarketing = () => {
  return (
    <>
      <Menu />
      <div className={`container mt-5 mb-5 ${styles.paginaContainer}`}>
        <Link to="/cursos" className="btn btn-outline-secondary mb-4">← Voltar para Cursos</Link>
        
        <h1 className="fw-bold text-success mb-3">Área de Marketing Digital</h1>
        <p className="fs-5 text-muted mb-5">
          O Marketing Digital conecta empresas aos clientes através de dados, conteúdo e campanhas de anúncios. É essencial para qualquer negócio moderno que deseja crescer na internet.
        </p>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className={`card h-100 shadow-sm border-0 ${styles.cardEmpresas}`}>
              <div className="card-body">
                <h4 className="fw-bold mb-3">🏢 Empresas Referência</h4>
                <ul className="list-group list-group-flush rounded">
                  <li className="list-group-item bg-transparent">💼 Google Ads</li>
                  <li className="list-group-item bg-transparent">💼 Meta (Instagram/Facebook)</li>
                  <li className="list-group-item bg-transparent">💼 RD Station</li>
                  <li className="list-group-item bg-transparent">💼 HubSpot</li>
                  <li className="list-group-item bg-transparent">💼 Ambev (Marketing de Marca)</li>
                </ul>
                <small className="text-muted mt-3 d-block">
                  Dica: Certificações gratuitas do Google e HubSpot abrem muitas portas de estágio!
                </small>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className={`card h-100 shadow-sm border-0 ${styles.cardCursos}`}>
              <div className="card-body">
                <h4 className="fw-bold mb-3">📚 Onde Estudar (Recomendados)</h4>
                <div className="d-flex flex-column gap-2">
                  <a href="https://skillshop.exceedlms.com/" target="_blank" rel="noreferrer" className="btn btn-outline-success text-start">
                    Google Skillshop (Certificações Grátis) ↗
                  </a>
                  <a href="https://academy.hubspot.com/" target="_blank" rel="noreferrer" className="btn btn-outline-success text-start">
                    HubSpot Academy - Inbound Marketing ↗
                  </a>
                  <a href="https://www.facebook.com/business/learn" target="_blank" rel="noreferrer" className="btn btn-outline-success text-start">
                    Meta Blueprint - Anúncios Online ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalhesMarketing;