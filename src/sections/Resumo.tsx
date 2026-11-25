import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiDocker,
  SiGit,
  SiC,
  SiCplusplus,
  SiTailwindcss,
  SiRedis,
} from "react-icons/si";
import { Cloud } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { education, experience } from "../data/profile";
import { useLanguage } from "../hooks/useLanguage";

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
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "AWS", Icon: Cloud },
  { name: "Docker", Icon: SiDocker },
  { name: "Redis", Icon: SiRedis },
];

export default function Resumo() {
  const { t, language } = useLanguage();
  return (
    <section
      id="resumo"
      className="section journey-section"
      aria-label={t.journey.label}
    >
      <div className="section-inner">
        <SectionHeading command={t.journey.command} title={t.journey.title} />
        <div className="journey-layout">
          <div className="about-copy">
            <h3>{t.journey.subtitle}</h3>
            <p>{t.profile.about}</p>
            <p>{t.profile.interests}</p>
            <div className="education-block">
              <span className="eyebrow">{t.journey.education}</span>
              <h4>{education.course[language]}</h4>
              <p>{education.institution[language]}</p>
              <span className="metadata">{education.period[language]}</span>
            </div>
            <p className="languages">
              <span>{t.journey.languages}</span> {t.journey.languageList}
            </p>
          </div>
          <div className="journey-details">
            <h3 className="block-label">{t.journey.experience}</h3>
            <ol className="timeline">
              {experience.map((item) => (
                <li key={item.company}>
                  <span className="metadata">{item.period[language]}</span>
                  <h4>{item.role[language]}</h4>
                  <p>{item.company}</p>
                  <p className="experience-summary">{item.summary[language]}</p>
                </li>
              ))}
            </ol>
            <h3 className="block-label stack-label">{t.journey.tools}</h3>
            <ul className="tech-grid" aria-label={t.journey.technologies}>
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
