import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Resumo.module.scss";
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

type Tech = { name: string; icon: ReactNode };
type Item = { title: string; time?: string; meta: ReactNode };

const TECHS: Tech[] = [
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Python", icon: <SiPython /> },
  { name: "React", icon: <SiReact /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "MySQL", icon: <SiMysql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Git", icon: <SiGit /> },
  { name: "C", icon: <SiC /> },
  { name: "C++", icon: <SiCplusplus /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
];

const LEFT: Item[] = [
  {
    title: "Formação",
    time: "Ciência da Computação (2021 — 2026)",
    meta: "Universidade Federal de Alfenas",
  },
  {
    title: "Experiência",
    time: "Polygon Soluções (Abr 2025 — Out 2025)",
    meta: "Estagiário de Desenvolvimento Front-end",
  },
  {
    title: "Experiência",
    time: "Fator3 Ventures (Set 2025 — Presente)",
    meta: "Desenvolvedor Fullstack Jr",
  },
  {
    title: "Línguas",
    meta: (
      <ul className={styles.langList}>
        <li>Português</li>
        <li>
          Inglês <span className={styles.langLevel}>(avançado)</span>
        </li>
      </ul>
    ),
  },
];

export default function Resumo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="resumo"
      ref={sectionRef}
      className={`section ${styles.resumo} ${ready ? styles.ready : ""}`}
    >
      <div className="section__inner">
        <pre className={styles.asciiTitle}>
          {`______                                     
| ___ \\                                    
| |_/ /  ___  ___  _   _  _ __ ___    ___  
|    /  / _ \\/ __|| | | || '_ \` _ \\  / _ \\ 
| |\\ \\ |  __/\\__ \\| |_| || | | | | || (_) |
\\_| \\_| \\___||___/ \\__,_||_| |_| |_| \\___/`}
        </pre>

        <div className={styles.panel}>
          <div className={styles.left}>
            {LEFT.map((it, i) => (
              <div key={i} className={styles.block}>
                <h4 className={styles.role}>{it.title}</h4>
                {it.time && <span className={styles.time}>{it.time}</span>}
                <div className={styles.meta}>{it.meta}</div>
              </div>
            ))}
          </div>

          <div className={styles.right}>
            <ul className={styles.techGrid} aria-label="Tecnologias">
              {TECHS.map((t) => (
                <li
                  key={t.name}
                  className={styles.techItem}
                  tabIndex={0}
                  aria-label={t.name}
                >
                  <div className={styles.icon}>{t.icon}</div>
                  <span className={styles.techName}>{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
