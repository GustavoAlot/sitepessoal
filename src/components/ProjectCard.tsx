import * as React from "react";
import styles from "./ProjectCard.module.scss";
import type { Project } from "../data/projects";
import { CrtButton} from "../components/CrtButton";

type Props = {
  project: Project;
  onMore?: (p: Project) => void;
  onFallback?: (p: Project) => void;
};

export default function ProjectCard({ project, onMore, onFallback }: Props) {
  const p = React.useMemo(
    () => ({
      ...project,
      tech: (project.tech ?? ["React", "Node.js", "MongoDB"]).filter(Boolean),
      features: (project.features ?? []).filter((f) => typeof f === "string" && f.trim() !== ""),
    }),
    [project]
  );

  // handler defensivo: evita que qualquer <a> navegue
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onMore) return onMore(p);
    onFallback?.(p);
  };

  return (
    <li className={styles.card} data-slot="project-card">
      {p.image && (
        <figure className={styles.cover}>
          <img src={p.image} alt={`Screenshot de ${p.title}`} loading="lazy" />
        </figure>
      )}

      <div className={styles.body}>
        <div className={styles.text}>
          <h3 className={styles.title}>{p.title}</h3>
          {p.description && <p className={styles.desc}>{p.description}</p>}
        </div>

        <div className={styles.footer}>
          <CrtButton
            fullWidth
            type="button"                 //  garante que é botão, não link
            onClick={handleClick}         //  impede navegação e abre detalhe
            aria-label={`Saiba mais sobre ${p.title}`}
          >
            SAIBA MAIS
          </CrtButton>
        </div>
      </div>
    </li>
  );
}
  