import Menu from "../../components/Menu/Menu";
import styles from "./Proguia.module.css";

const Proguia = () => {
  return (
    <>
      <Menu />
      <div className="container mt-5">
        <div className={`p-5 rounded ${styles.heroSection}`}>
          <h1 className="fw-bold text-primary">Sobre o PROGUIA</h1>
          <p className="lead mt-3">
            A escolha profissional é um momento decisivo. O Proguia é uma plataforma digital desenvolvida para ajudar jovens de 14 a 17 anos a ingressarem no mercado de trabalho com segurança, autoconhecimento e preparação.
          </p>
          <hr />
          <h4>Nossos Objetivos:</h4>
          <ul>
            <li>Orientação através de testes vocacionais;</li>
            <li>Criação de currículos estruturados;</li>
            <li>Trilhas de capacitação para diversas áreas.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Proguia;