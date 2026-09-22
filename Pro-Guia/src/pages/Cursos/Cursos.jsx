import Menu from "../../components/Menu/Menu";
import { Link } from "react-router-dom";
import styles from "./Cursos.module.css";

const Cursos = () => {
  const carreiras = [
    { id: 1, area: "Tecnologia da Informação (TI)", desc: "Programação, Redes e Suporte." },
    { id: 2, area: "Medicina e Saúde", desc: "Enfermagem, Biomedicina e primeiros socorros." },
    { id: 3, area: "Administração", desc: "Gestão de negócios, RH e rotinas administrativas." }
  ];

  return (
    <>
      <Menu />
      <div className={`container mt-5 ${styles.pageContainer}`}>
        <h2 className="mb-4 fw-bold">Trilhas de Capacitação</h2>
        <div className="row">
          {carreiras.map(carreira => (
            <div className="col-md-12 mb-4" key={carreira.id}>
              <div className={`card ${styles.cursoCard}`}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="card-title text-primary">{carreira.area}</h4>
                    <p className="card-text">{carreira.desc}</p>
                  </div>
                  <Link to="#" className="btn btn-primary">Saiba mais ➔</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cursos;