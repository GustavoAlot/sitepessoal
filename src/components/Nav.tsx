import { useEffect, useMemo, useRef } from "react";
import styles from "./Nav.module.scss";

export type SectionId = "sobre" | "resumo" | "projetos" | "contato";

type Props = {
  ids?: SectionId[];
  active: SectionId;
  onChange: (id: SectionId) => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
};

export default function Nav({
  ids = ["sobre", "resumo", "projetos", "contato"],
  active,
  onChange,
  crtEnabled,
  onToggleCrt,
}: Props) {
  const headerRef = useRef<HTMLElement | null>(null);

  // mede altura da navbar
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVar = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--nav-height", `${h}px`);
    };

    setVar();

    const ro = new ResizeObserver(setVar);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const items = useMemo(
    () => ids.map((id) => ({ id, label: `> ${id.toUpperCase()}` })),
    [ids],
  );

  return (
    <nav
      ref={headerRef}
      className={styles.nav}
      aria-label="Seções do portfólio"
    >
      <div className={styles.inner}>
        {/* LINKS CENTRALIZADOS */}
        <div className={styles.links}>
          {items.map((it) => {
            const isActive = active === it.id;

            return (
              <a
                key={it.id}
                href={`#${it.id}`}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onChange(it.id);

                  document.getElementById(it.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                {it.label}
              </a>
            );
          })}
        </div>

        {/* BOTÃO FX + TOOLTIP */}
        <div className={styles.fxWrapper}>
          <button
            type="button"
            className={styles.fxButton}
            onClick={onToggleCrt}
            aria-pressed={crtEnabled}
          >
            {crtEnabled ? "FX: ON" : "FX: OFF"}
          </button>

          <div className={styles.fxTooltip}>
            {crtEnabled ? "Desativar efeitos CRT" : "Ativar efeitos CRT"}
          </div>
        </div>
      </div>
    </nav>
  );
}
