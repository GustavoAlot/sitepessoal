import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import type { Project } from "../data/projects";
import styles from "./ProjectDetail.module.scss";
/* 👇 importa seu botão CRT */
import { CrtButton, EnvelopeIcon } from "../components/CrtButton";

type Props = {
  project: Project;
  onBack: () => void;
};

const ProjectDetail: React.FC<Props> = ({ project, onBack }) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const body = document.body;
    body.classList.add("detail-open");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onBack(); };
    window.addEventListener("keydown", onKey, { passive: true });
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      body.classList.remove("detail-open");
      body.style.overflow = prevOverflow;
    };
  }, [onBack]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onBack();
  };

  return ReactDOM.createPortal(
    <div
      ref={backdropRef}
      className={styles.fullscreen}
      aria-label={`Detalhes de ${project.title}`}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.container}>
        <button className={styles.backTop} onClick={onBack} aria-label="Voltar para projetos">
          ← Voltar
        </button>

        <div className={styles.cols}>
          {/* Esquerda */}
          <section className={styles.left}>
            {project.title && <h2 className={`${styles.title} matrix-text`}>{project.title}</h2>}

            {(project.longDescription || project.description) && (
              /* 👇 agora essa área rola se for grande */
              <div className={`${styles.desc} ${styles.descScroll}`} role="region" aria-label="Descrição do projeto">
                {(project.longDescription || project.description)!
                  .trim()
                  .split(/\n\s*\n/)
                  .map((para, i) => <p key={i}>{para.trim()}</p>)}
              </div>
            )}

            <div className={styles.actions}>
              <CrtButton
                className="btn-crt--sm btn-crt--auto"
                icon={<EnvelopeIcon />}
                onClick={() => window.open(project.demo!, "_blank", "noopener,noreferrer")}
              >
                VISITAR O SITE
              </CrtButton>


            </div>

            {!!project.tech?.length && (
              <div className={styles.block}>
                <h3 className={styles.blockTitle}>Tecnologias usadas</h3>
                <ul className={styles.chips}>
                  {project.tech.map((t, i) => (
                    <li key={i} className={styles.chip}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Direita */}
          <section className={styles.right}>
            {project.image && (
              <figure className={styles.screenshot}>
                <img src={project.image} alt={`Screenshot de ${project.title}`} />
              </figure>
            )}

            {!!project.features?.length && (
              <div className={styles.featuresBox}>
                <h3 className={styles.blockTitle}>Key features</h3>
                <ul className={styles.list}>
                  {project.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectDetail;
