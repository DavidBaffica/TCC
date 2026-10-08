import Menu from "../../components/Menu/Menu";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <Menu />

      {/* 1. Hero com Imagem Estática de Fundo */}
      <section className={styles.heroSection}>
        <div className="container text-center text-white py-5">
          <h1 className="display-4 fw-bold">O Futuro Começa nas Suas Escolhas</h1>
          <p className="lead">Descubra sua vocação, aprenda a fazer um currículo profissional e encontre os melhores cursos.</p>
        </div>
      </section>

      <div className="container mt-5">

        {/* 2. Carrossel de Destaques Funcional */}
        <div id="homeCarousel" className="carousel slide mb-5 shadow rounded overflow-hidden" data-bs-ride="carousel" data-bs-interval="4000">
          
          {/* Indicadores do Carrossel */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          {/* Imagens do Carrossel */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80"
                className="d-block w-100"
                alt="Tecnologia"
                style={{ height: "380px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-60 rounded p-3">
                <h5 className="fw-bold">Área de Tecnologia em Alta</h5>
                <p>Mais de 500 mil vagas abertas para desenvolvedores e especialistas em TI.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80"
                className="d-block w-100"
                alt="Estudos e Qualificação"
                style={{ height: "380px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-60 rounded p-3">
                <h5 className="fw-bold">Cursos Gratuitos e Recomendados</h5>
                <p>Aprenda novas habilidades sem pagar nada e impulsione seu currículo.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"
                className="d-block w-100"
                alt="Mercado de Trabalho"
                style={{ height: "380px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-60 rounded p-3">
                <h5 className="fw-bold">Primeiro Emprego e Jovem Aprendiz</h5>
                <p>Dicas de entrevistas e como estruturar suas experiências acadêmicas.</p>
              </div>
            </div>
          </div>

          {/* Botões de Avançar / Voltar */}
          <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Próximo</span>
          </button>
        </div>

        {/* 3. Acesso Rápido */}
        <div className="row text-center mb-5">
          <div className="col-md-4 mb-3">
            <Link to="/cursos" className={`btn btn-primary w-100 py-4 fw-bold fs-5 ${styles.quickBtn}`}>
              🎓 Explorar Cursos
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link to="/curriculo" className={`btn btn-success w-100 py-4 fw-bold fs-5 ${styles.quickBtn}`}>
              📄 Como Fazer Currículo
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link to="/fale-conosco" className={`btn btn-warning w-100 py-4 fw-bold fs-5 text-dark ${styles.quickBtn}`}>
              💬 Fale Conosco
            </Link>
          </div>
        </div>

        {/* 4. Informações Interessantes */}
        <section className="mb-5 bg-light p-5 rounded shadow-sm">
          <h2 className="fw-bold text-center mb-4">Você Sabia?</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-3">
              <h1 className="text-primary fw-bold">70%</h1>
              <p className="text-muted">Dos jovens têm dúvidas sobre qual carreira escolher após terminar os estudos.</p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <h1 className="text-success fw-bold">6 Segundos</h1>
              <p className="text-muted">É a média de tempo que um recrutador leva para a primeira análise de um currículo.</p>
            </div>
            <div className="col-md-4 text-center mb-3">
              <h1 className="text-warning fw-bold">+2.5 Mi</h1>
              <p className="text-muted">De oportunidades na área de tecnologia e inovação previstas nos próximos anos.</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;