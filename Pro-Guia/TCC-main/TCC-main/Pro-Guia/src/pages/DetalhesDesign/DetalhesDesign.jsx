import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import styles from "./DetalhesDesign.module.css";

const DetalhesDesign = () => {
  return (
    <>
      <Menu />
      <div className={`container mt-5 mb-5 ${styles.paginaContainer}`}>
        <Link to="/cursos" className="btn btn-outline-secondary mb-4">← Voltar para Cursos</Link>
        
        <h1 className="fw-bold text-danger mb-3">Área de Design e UI/UX</h1>
        <p className="fs-5 text-muted mb-5">
          A área de Design une sensibilidade estética, psicologia e tecnologia para criar produtos fáceis de usar. Profissionais desenham desde logotipos até telas interativas de grandes aplicativos.
        </p>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className={`card h-100 shadow-sm border-0 ${styles.cardEmpresas}`}>
              <div className="card-body">
                <h4 className="fw-bold mb-3">🏢 Empresas Referência</h4>
                <ul className="list-group list-group-flush rounded">
                  <li className="list-group-item bg-transparent">💼 Apple</li>
                  <li className="list-group-item bg-transparent">💼 Figma</li>
                  <li className="list-group-item bg-transparent">💼 Airbnb</li>
                  <li className="list-group-item bg-transparent">💼 QuintoAndar</li>
                  <li className="list-group-item bg-transparent">💼 iFood</li>
                </ul>
                <small className="text-muted mt-3 d-block">
                  Dica: Monte um portfólio no Behance ou Figma para apresentar nessas empresas!
                </small>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className={`card h-100 shadow-sm border-0 ${styles.cardCursos}`}>
              <div className="card-body">
                <h4 className="fw-bold mb-3">📚 Onde Estudar (Recomendados)</h4>
                <div className="d-flex flex-column gap-2">
                  <a href="https://help.figma.com/hc/en-us/categories/360002051073-Figma-Design" target="_blank" rel="noreferrer" className="btn btn-outline-danger text-start">
                    Figma Learn - Tutoriais Oficiais ↗
                  </a>
                  <a href="https://www.youtube me/cursoemvideo" target="_blank" rel="noreferrer" className="btn btn-outline-danger text-start">
                    Design & UX - Canais do YouTube ↗
                  </a>
                  <a href="https://www.coursera.org/google-certificates/ux-design" target="_blank" rel="noreferrer" className="btn btn-outline-danger text-start">
                    Google UX Design (Certificado) ↗
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

export default DetalhesDesign;