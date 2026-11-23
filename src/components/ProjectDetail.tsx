import { SiGithub } from "react-icons/si";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "../data/projects";

export default function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onBack();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onBack();
      }}
    >
      <div className="dialog-content">
        <div className="panel-bar">
          <span>ARQUIVO / {project.id.toUpperCase()}</span>
          <button
            className="icon-button"
            onClick={onBack}
            aria-label="Fechar detalhes"
          >
            <X size={20} />
          </button>
        </div>
        <div className="dialog-body">
          <p className="eyebrow">{project.category}</p>
          <h2 id="project-dialog-title">{project.title}</h2>
          <img
            className="dialog-image"
            src={project.image}
            alt={`Interface do projeto ${project.title}`}
            width="800"
            height="450"
          />
          {project.longDescription.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h3>O que o projeto faz</h3>
          <ul className="feature-list">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <h3>Tecnologias utilizadas</h3>
          <ul className="tags">
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <div className="dialog-actions">
            {project.demo && (
              <a
                className="button button-primary"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Visitar projeto
              </a>
            )}
            {project.repo && (
              <a
                className="button button-secondary"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGithub size={16} aria-hidden="true" />
                Ver código
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
