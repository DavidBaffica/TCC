import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import styles from "./DetalhesTecnologia.module.css";

const DetalhesTecnologia = () => {
  return (
    <>
      <Menu />
      <div className={`container mt-5 mb-5 ${styles.paginaContainer}`}>
        <Link to="/cursos" className="btn btn-outline-secondary mb-4">← Voltar para Cursos</Link>
        
        <h1 className="fw-bold text-primary mb-3">Área de Tecnologia e Programação</h1>
        <p className="fs-5 text-muted mb-5">
          O mercado de tecnologia é o que mais cresce no mundo. Envolve criação de sites, aplicativos, inteligência artificial e segurança da informação. Permite trabalho remoto e tem salários iniciais atrativos.
        </p>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className={`card h-100 shadow-sm border-0 ${styles.cardEmpresas}`}>
              <div className="card-body">
                <h4 className="fw-bold mb-3">🏢 Empresas Referência</h4>
                <ul className="list-group list-group-flush rounded">
                  <li className="list-group-item bg-transparent">💼 Google</li>
                  <li className="list-group-item bg-transparent">💼 Microsoft</li>
                  <li className="list-group-item bg-transparent">💼 Nubank</li>
                  <li className="list-group-item bg-transparent">💼 Mercado Livre</li>
                  <li className="list-group-item bg-transparent">💼 Itaú Tech</li>
                </ul>
                <small className="text-muted mt-3 d-block">
                  Dica: Siga o LinkedIn destas empresas para acompanhar oportunidades de estágio e vagas júnior!
                </small>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className={`card h-100 shadow-sm border-0 ${styles.cardCursos}`}>
              <div className="card-body">
                <h4 className="fw-bold mb-3">📚 Onde Estudar (Recomendados)</h4>
                <div className="d-flex flex-column gap-2">
                  <a href="https://www.cursoemvideo.com/" target="_blank" rel="noreferrer" className="btn btn-outline-primary text-start">
                    Curso em Vídeo - Lógica (Gratuito) ↗
                  </a>
                  <a href="https://app.rocketseat.com.br/" target="_blank" rel="noreferrer" className="btn btn-outline-primary text-start">
                    Rocketseat - Discover (Gratuito) ↗
                  </a>
                  <a href="https://www.dio.me/" target="_blank" rel="noreferrer" className="btn btn-outline-primary text-start">
                    DIO - Bootcamps de Programação ↗
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

export default DetalhesTecnologia;