import type { Project } from "../data/projects";
import { useLanguage } from "../hooks/useLanguage";

export default function ProjectCard({
  project,
  onMore,
}: {
  project: Project;
  onMore: (project: Project) => void;
}) {
  const { t } = useLanguage();
  return (
    <li className="project-card">
      <div className="project-image">
        <img
          src={project.image}
          alt={`${t.projects.interface} ${project.title}`}
          loading="lazy"
          width="1440"
          height="1000"
        />
        <span className="image-label" aria-hidden="true">
          {project.id.toUpperCase()}.PROJECT
        </span>
      </div>
      <div className="project-body">
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul
          className="tags"
          aria-label={`${t.projects.technologies} ${project.title}`}
        >
          {project.tech.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <button
          className="project-more"
          type="button"
          onClick={() => onMore(project)}
          aria-label={`${t.projects.explore} ${project.title}`}
        >
          <span>{t.projects.explore}</span>
          <span aria-hidden="true">[ + ]</span>
        </button>
      </div>
    </li>
  );
}
