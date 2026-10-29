import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import styles from "./DetalhesMarketing.module.css";

const empresas = ["Google Ads", "Meta (Instagram e Facebook)", "RD Station", "HubSpot", "Ambev — marketing de marca"];
const cursos = [
  { nome: "Google Skillshop — certificações", url: "https://skillshop.exceedlms.com/" },
  { nome: "HubSpot Academy — inbound marketing", url: "https://academy.hubspot.com/" },
  { nome: "Meta Blueprint — anúncios online", url: "https://www.facebook.com/business/learn" },
];

export default function DetalhesMarketing() {
  return (
    <>
      <Menu />
      <main className={styles.page}>
        <Link to="/cursos" className={styles.back}>← Voltar para cursos</Link>
        <span className={styles.eyebrow}>TRILHA PROFISSIONAL / MARKETING</span>
        <h1 className={styles.title}>Marketing digital e negócios</h1>
        <p className={styles.intro}>
          Marketing digital conecta empresas e pessoas por meio de conteúdo, dados, estratégia e campanhas. É uma área dinâmica para quem gosta de comunicação, análise e criatividade.
        </p>
        <div className={styles.grid}>
          <section className={styles.card}>
            <h2>🏢 Empresas para conhecer</h2>
            <ul className={styles.list}>{empresas.map((empresa) => <li key={empresa}>↗ {empresa}</li>)}</ul>
            <p className={styles.hint}>Dica: certificações e projetos próprios ajudam a demonstrar suas habilidades.</p>
          </section>
          <section className={styles.card}>
            <h2>📚 Onde começar a estudar</h2>
            <div className={styles.links}>{cursos.map((curso) => <a key={curso.url} href={curso.url} target="_blank" rel="noreferrer">{curso.nome} ↗</a>)}</div>
          </section>
        </div>
      </main>
    </>
  );
}