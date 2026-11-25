import { SiGithub } from "react-icons/si";
import { useCallback, useState } from "react";
import { getProjects } from "../data/projects";
import { profile } from "../data/profile";
import { useLanguage } from "../hooks/useLanguage";
import ProjectCard from "../components/ProjectCard";
import ProjectDetail from "../components/ProjectDetail";
import SectionHeading from "../components/SectionHeading";

export default function Projects() {
  const { t, language } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeDetail = useCallback(() => setSelectedId(null), []);
  const projects = getProjects(language);
  const selected = projects.find((project) => project.id === selectedId);

  return (
    <section
      id="projetos"
      className="section projects-section"
      aria-label={t.projects.label}
    >
      <div className="section-inner">
        <SectionHeading
          command={t.projects.command}
          title={t.projects.title}
          description={t.projects.description}
        />
        <ul className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onMore={(item) => setSelectedId(item.id)}
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
            <strong>{t.projects.laboratory}</strong>
            <span>{t.projects.studies}</span>
          </span>
          <span className="github-strip-action">
            {t.projects.repositories} <span aria-hidden="true">[ + ]</span>
          </span>
        </a>
      </div>
      {selected && <ProjectDetail project={selected} onBack={closeDetail} />}
    </section>
  );
}
