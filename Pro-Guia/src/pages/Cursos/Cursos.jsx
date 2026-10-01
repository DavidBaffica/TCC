import Menu from "../../components/Menu/Menu";
import { Link } from "react-router-dom";
import styles from "./Cursos.module.css";

const Cursos = () => {
  // Adicionei as áreas que criamos e a propriedade 'path' que guarda a rota de cada uma
  const carreiras = [
    { 
      id: 1, 
      area: "Tecnologia da Informação (TI)", 
      desc: "Programação, desenvolvimento de sistemas, inteligência artificial e segurança de dados.",
      path: "/cursos/tecnologia" // Rota para a página de TI
    },
    { 
      id: 2, 
      area: "Design e UI/UX", 
      desc: "Criação de interfaces para aplicativos, sites, identidade visual e experiência do usuário.",
      path: "/cursos/design" // Rota para a página de Design
    },
    { 
      id: 3, 
      area: "Marketing Digital e Negócios", 
      desc: "Gestão de mídias sociais, tráfego pago, SEO, escrita persuasiva e vendas online.",
      path: "/cursos/marketing" // Rota para a página de Marketing
    }
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
                  {/* Aqui está a mágica: o 'to' puxa o 'path' correspondente de cada item */}
                  <Link to={carreira.path} className="btn btn-primary">
                    Saiba mais ➔
                  </Link>
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