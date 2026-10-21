import Menu from "../../components/Menu/Menu";
import styles from "./Curriculo.module.css";

const Curriculo = () => {
  return (
    <>
      <Menu />
      <div className="container mt-5 mb-5">
        <h1 className="fw-bold text-center text-primary mb-4">Guia Definitivo: Como Fazer um Currículo Matador</h1>
        <p className="lead text-center mb-5">Seu currículo é a sua porta de entrada para o mercado. Aprenda o passo a passo para se destacar, mesmo sem experiência.</p>

        <div className="row">
          <div className="col-md-8">
            <div className="card shadow-sm mb-4 border-0 border-start border-primary border-4">
              <div className="card-body">
                <h4 className="fw-bold">1. Cabeçalho (Dados Pessoais)</h4>
                <p>Seja direto. Nada de colocar números de documentos. O recrutador só precisa saber como falar com você.</p>
                <ul>
                  <li><strong>O que colocar:</strong> Nome completo, Cidade/Estado, Telefone (WhatsApp), E-mail e Link para o LinkedIn.</li>
                  <li><strong>O que NÃO colocar:</strong> CPF, RG, Estado Civil ou foto (a menos que a vaga peça).</li>
                </ul>
              </div>
            </div>

            <div className="card shadow-sm mb-4 border-0 border-start border-success border-4">
              <div className="card-body">
                <h4 className="fw-bold">2. Objetivo Profissional</h4>
                <p>Uma frase curta dizendo o que você busca. Não seja genérico como "Quero somar à empresa".</p>
                <p className="text-muted fst-italic">Exemplo: "Busco minha primeira oportunidade como Jovem Aprendiz na área administrativa."</p>
              </div>
            </div>

            <div className="card shadow-sm mb-4 border-0 border-start border-warning border-4">
              <div className="card-body">
                <h4 className="fw-bold">3. Formação Acadêmica</h4>
                <p>Coloque do mais recente para o mais antigo. Se você ainda está na escola, avise!</p>
                <ul>
                  <li><strong>Exemplo:</strong> Ensino Médio - Escola Estadual João Silva (Cursando o 2º ano - Previsão de término: 2025).</li>
                </ul>
              </div>
            </div>

            <div className="card shadow-sm mb-4 border-0 border-start border-info border-4">
              <div className="card-body">
                <h4 className="fw-bold">4. Cursos e Habilidades</h4>
                <p>Aqui você brilha se não tem experiência. Coloque cursos online, idiomas e pacote office.</p>
                <ul>
                  <li>Lógica de Programação - Curso em Vídeo (40h)</li>
                  <li>Inglês Básico - Duolingo / Autodidata</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className={`card p-4 ${styles.dicasCard} bg-light`}>
              <h5 className="fw-bold text-danger">⚠️ Erros Fatais</h5>
              <hr />
              <ul className="text-muted">
                <li className="mb-2"><strong>Erros de Português:</strong> Revise 3 vezes antes de enviar. Peça para alguém ler.</li>
                <li className="mb-2"><strong>Mentir:</strong> Nunca minta sobre o nível de inglês ou ferramentas. Eles vão testar.</li>
                <li className="mb-2"><strong>Mais de 2 páginas:</strong> Para quem está começando, 1 página é mais que suficiente.</li>
                <li className="mb-2"><strong>Email não profissional:</strong> Nada de "gatinha123@email.com". Use algo como "nome.sobrenome@email.com".</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Curriculo;