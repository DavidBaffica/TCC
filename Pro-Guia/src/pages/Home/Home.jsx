import React from 'react';
import Navbar from '../../componentes/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      
      <div className="page-container">
       
        <div className="base-card large">
          
          <div className="home-header">
            <h1>Bem-vindo ao ProGuia</h1>
            <p className="footer-text">
              O seu portal de orientação para o futuro profissional.
            </p>
          </div>

          <div className="articles-section">
            
            <article>
              <h2>O Mercado de Trabalho Atual: Tecnologia em Foco</h2>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Equipe trabalhando com tecnologia" 
              />
              <p>
                Hoje em dia, a tecnologia permeia quase todas as áreas de atuação. Não importa se você é de exatas, humanas ou biológicas: a fluência digital tornou-se um requisito básico. A inteligência artificial, automação e a análise de dados estão transformando a maneira como trabalhamos, exigindo profissionais cada vez mais adaptáveis.
              </p>
            </article>

            <article>
              <h2>A Ascensão das Soft Skills</h2>
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80" 
                alt="Reunião de negócios e comunicação" 
              />
              <p>
                Enquanto as habilidades técnicas (Hard Skills) conseguem a entrevista para você, são as habilidades comportamentais (Soft Skills) que garantem a vaga e a promoção. Inteligência emocional, capacidade de resolver problemas, comunicação clara e trabalho em equipe são hoje mais valorizados pelas empresas do que nunca.
              </p>
            </article>

            <article>
              <h2>Aprendizado Contínuo (Lifelong Learning)</h2>
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" 
                alt="Pessoa estudando online no notebook" 
              />
              <p>
                A ideia de estudar apenas até terminar a faculdade ficou no passado. O mercado exige agora o conceito de "Lifelong Learning", ou seja, o aprendizado contínuo ao longo da vida. Estar disposto a se reinventar, fazer novos cursos rápidos e acompanhar as tendências da sua área é o que manterá seu currículo sempre relevante e atrativo para os recrutadores.
              </p>
            </article>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;