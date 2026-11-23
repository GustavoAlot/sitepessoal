import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiC,
  SiCplusplus,
  SiTailwindcss,
} from "react-icons/si";
import SectionHeading from "../components/SectionHeading";
import { education, experience, profile } from "../data/profile";

const technologies = [
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Python", Icon: SiPython },
  { name: "MySQL", Icon: SiMysql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Git", Icon: SiGit },
  { name: "C", Icon: SiC },
  { name: "C++", Icon: SiCplusplus },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
];

export default function Resumo() {
  return (
    <section
      id="resumo"
      className="section journey-section"
      aria-label="Sobre mim e trajetória"
    >
      <div className="section-inner">
        <SectionHeading command="sobre-mim" title="O caminho até aqui." />
        <div className="journey-layout">
          <div className="about-copy">
            <h3>Curiosidade como ponto de partida.</h3>
            <p>{profile.about}</p>
            <p>{profile.interests}</p>
            <div className="education-block">
              <span className="eyebrow">FORMAÇÃO</span>
              <h4>{education.course}</h4>
              <p>{education.institution}</p>
              <span className="metadata">{education.period}</span>
            </div>
            <p className="languages">
              <span>IDIOMAS</span> Português <span aria-hidden="true">/</span>{" "}
              Inglês avançado
            </p>
          </div>
          <div className="journey-details">
            <h3 className="block-label">EXPERIÊNCIA</h3>
            <ol className="timeline">
              {experience.map((item) => (
                <li key={item.company}>
                  <span className="metadata">{item.period}</span>
                  <h4>{item.role}</h4>
                  <p>{item.company}</p>
                </li>
              ))}
            </ol>
            <h3 className="block-label stack-label">FERRAMENTAS DE TRABALHO</h3>
            <ul className="tech-grid" aria-label="Tecnologias">
              {technologies.map(({ name, Icon }) => (
                <li key={name}>
                  <Icon aria-hidden="true" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
