import { useEffect, useRef, useState } from "react";
import styles from "./NextSectionJump.module.scss";
import { CrtButton } from "../components/CrtButton";

type SectionId = "sobre" | "resumo" | "projetos" | "contato";

type Props = {
  ids?: SectionId[];
  active: SectionId;
  labelNext?: string;
  labelRestart?: string;
  onChange?: (id: SectionId) => void;
};

export default function NextSectionJump({
  ids = ["sobre", "resumo", "projetos", "contato"],
  active,
  labelNext,
  labelRestart,
  onChange,
}: Props) {
  const [reduced, setReduced] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    navRef.current = document.querySelector("nav");
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const apply = () => setReduced(mq.matches);
    apply();

    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  function getNavH(): number {
    const cssVar = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--nav-height",
      ),
    );

    return (
      navRef.current?.getBoundingClientRect().height ??
      (Number.isFinite(cssVar) ? cssVar : 0)
    );
  }

  function scrollToId(id: SectionId) {
    const target = document.getElementById(id);
    if (!target) return;

    const navH = getNavH();
    const top = target.getBoundingClientRect().top + window.scrollY - navH;

    window.scrollTo({
      top,
      behavior: reduced ? "auto" : "smooth",
    });

    onChange?.(id);
  }

  function handleNext() {
    const currentIdx = ids.indexOf(active);
    const safeIdx = currentIdx >= 0 ? currentIdx : 0;
    const nextIdx = (safeIdx + 1) % ids.length;

    scrollToId(ids[nextIdx]);
  }

  function handlePrev() {
    const currentIdx = ids.indexOf(active);
    const safeIdx = currentIdx >= 0 ? currentIdx : 0;
    const prevIdx = (safeIdx - 1 + ids.length) % ids.length;

    scrollToId(ids[prevIdx]);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target?.tagName;

      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }

      if (e.code === "Space" || e.key === "PageDown" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "PageUp" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, reduced, ids]);

  const isLast = active === ids[ids.length - 1];

  const btnLabel = isLast
    ? (labelRestart ?? "Voltar ao topo")
    : (labelNext ?? "Próxima seção");

  return (
    <div className={`${styles.fab} ${reduced ? styles.noAnim : ""}`}>
      <CrtButton
        className="btn-crt--sm btn-crt--auto"
        onClick={handleNext}
        aria-label={btnLabel}
        title={btnLabel}
      >
        {btnLabel}
      </CrtButton>

      <button
        type="button"
        className={styles.nextBtn}
        onClick={handlePrev}
        aria-label="Seção anterior"
        title="Anterior (PgUp/↑)"
      >
        {"<<"}
      </button>
    </div>
  );
}
