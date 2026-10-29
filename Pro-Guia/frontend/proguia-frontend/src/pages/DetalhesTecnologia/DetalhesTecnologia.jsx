import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import styles from "./DetalhesTecnologia.module.css";

const empresas = ["Google", "Microsoft", "Nubank", "Mercado Livre", "Itaú Tech"];
const cursos = [
  { nome: "Curso em Vídeo — lógica e programação", url: "https://www.cursoemvideo.com/" },
  { nome: "Rocketseat — Discover", url: "https://app.rocketseat.com.br/" },
  { nome: "DIO — bootcamps de programação", url: "https://www.dio.me/" },
];

export default function DetalhesTecnologia() {
  return (
    <>
      <Menu />
      <main className={styles.page}>
        <Link to="/cursos" className={styles.back}>← Voltar para cursos</Link>
        <span className={styles.eyebrow}>TRILHA PROFISSIONAL / TECNOLOGIA</span>
        <h1 className={styles.title}>Tecnologia e programação</h1>
        <p className={styles.intro}>
          O mercado de tecnologia envolve criação de sites, aplicativos, inteligência artificial e segurança da informação. É uma área ampla, com oportunidades para diferentes perfis e níveis de experiência.
        </p>
        <div className={styles.grid}>
          <section className={styles.card}>
            <h2>🏢 Empresas para conhecer</h2>
            <ul className={styles.list}>{empresas.map((empresa) => <li key={empresa}>↗ {empresa}</li>)}</ul>
            <p className={styles.hint}>Dica: acompanhe as páginas de carreira dessas empresas para encontrar estágios e vagas júnior.</p>
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