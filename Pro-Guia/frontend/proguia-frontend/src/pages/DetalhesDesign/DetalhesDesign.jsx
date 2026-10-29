import { Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import styles from "./DetalhesDesign.module.css";

const empresas = ["Apple", "Figma", "Airbnb", "QuintoAndar", "iFood"];
const cursos = [
  { nome: "Figma Learn — tutoriais oficiais", url: "https://help.figma.com/hc/en-us/categories/360002051073-Figma-Design" },
  { nome: "Design e UX — Curso em Vídeo", url: "https://www.youtube.com/@cursoemvideo" },
  { nome: "Google UX Design — certificado", url: "https://www.coursera.org/google-certificates/ux-design" },
];

export default function DetalhesDesign() {
  return (
    <>
      <Menu />
      <main className={styles.page}>
        <Link to="/cursos" className={styles.back}>← Voltar para cursos</Link>
        <span className={styles.eyebrow}>TRILHA PROFISSIONAL / DESIGN</span>
        <h1 className={styles.title}>Design e experiência do usuário</h1>
        <p className={styles.intro}>
          Design combina criatividade, pesquisa e tecnologia para criar produtos fáceis de usar. Profissionais atuam com identidade visual, interfaces, prototipação e experiência do usuário.
        </p>
        <div className={styles.grid}>
          <section className={styles.card}>
            <h2>🏢 Empresas para conhecer</h2>
            <ul className={styles.list}>{empresas.map((empresa) => <li key={empresa}>↗ {empresa}</li>)}</ul>
            <p className={styles.hint}>Dica: monte um portfólio com projetos próprios para demonstrar seu processo criativo.</p>
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