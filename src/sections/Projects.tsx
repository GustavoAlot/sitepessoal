import { SiGithub } from "react-icons/si";
import { useCallback, useState } from "react";

import { projects, type Project } from "../data/projects";
import { profile } from "../data/profile";
import ProjectCard from "../components/ProjectCard";
import ProjectDetail from "../components/ProjectDetail";
import SectionHeading from "../components/SectionHeading";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const closeDetail = useCallback(() => setSelected(null), []);

  return (
    <section
      id="projetos"
      className="section projects-section"
      aria-label="Projetos selecionados"
    >
      <div className="section-inner">
        <SectionHeading
          command="projetos"
          title="Ideias que viraram código."
          description="Uma seleção do que venho construindo, entre soluções do dia a dia e novas possibilidades."
        />
        <ul className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onMore={setSelected}
            />
          ))}
        </ul>
        <a
          className="github-strip"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGithub size={23} aria-hidden="true" />
          <span>
            <strong>O laboratório continua no GitHub.</strong>
            <span>Estudos, trabalhos acadêmicos e outros experimentos.</span>
          </span>
          <span className="github-strip-action">
            Explorar repositórios <span aria-hidden="true">[ + ]</span>
          </span>
        </a>
      </div>
      {selected && <ProjectDetail project={selected} onBack={closeDetail} />}
    </section>
  );
}
