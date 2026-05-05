import { useMemo, useState } from "react";
import styles from "./Projects.module.scss";
import type { Project } from "../data/projects";
import { projects as baseProjects } from "../data/projects";
import ProjectDetail from "../components/ProjectDetail";
import ProjectCard from "../components/ProjectCard";
import "../components/CrtButton.scss";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  const projects = useMemo(
    () =>
      baseProjects.map((p) => ({
        ...p,
        tech: (p.tech ?? ["React", "Node.js", "MongoDB"]).filter(Boolean),
        features: (p.features ?? []).filter(
          (f) => typeof f === "string" && f.trim() !== "",
        ),
      })),
    [],
  );

  return (
    <section id="projetos" className={`section ${styles.projects}`}>
      <div className="section__inner">
        <pre className={styles.asciiTitle}>
          {` ______                 _        _                
| ___ \\               (_)      | |              
| |_/ / _ __   ___     _   ___ | |_   ___   ___ 
|  __/ | '__| / _ \\  | | / _ \\| __| / _ \\ / __|
| |    | |   | (_) | | ||  __/| |_ | (_) |\\__ \\
\\_|    |_|    \\___/  | | \\___| \\__| \\___/ |___/
                     _/  |                         
                    |__/                         `}
        </pre>
        <ul className={styles.grid} aria-label="Lista de projetos">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} onMore={setSelected} />
          ))}
        </ul>
      </div>

      {selected && (
        <ProjectDetail project={selected} onBack={() => setSelected(null)} />
      )}
    </section>
  );
}
