import type { Project } from "../data/projects";

export default function ProjectCard({
  project,
  onMore,
}: {
  project: Project;
  onMore: (project: Project) => void;
}) {
  return (
    <li className="project-card">
      <div className="project-image">
        <img
          src={project.image}
          alt={`Interface do projeto ${project.title}`}
          loading="lazy"
          width="800"
          height="450"
        />
        <span className="image-label" aria-hidden="true">
          {project.id.toUpperCase()}.PROJECT
        </span>
      </div>
      <div className="project-body">
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="tags" aria-label={`Tecnologias de ${project.title}`}>
          {project.tech.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <button
          className="project-more"
          type="button"
          onClick={() => onMore(project)}
          aria-label={`Explorar projeto ${project.title}`}
        >
          <span>Explorar projeto</span>
          <span aria-hidden="true">[ + ]</span>
        </button>
      </div>
    </li>
  );
}
