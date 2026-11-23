import { useLayoutEffect, useRef } from "react";
import { Monitor, Power } from "lucide-react";
import { navigation, type SectionId } from "../data/navigation";

type Props = {
  active: SectionId;
  crtEnabled: boolean;
  reducedMotion: boolean;
  onToggleCrt: () => void;
};

export default function Nav({
  active,
  crtEnabled,
  reducedMotion,
  onToggleCrt,
}: Props) {
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const root = document.documentElement;
    const previousHeight = root.style.getPropertyValue("--header-height");
    const updateHeight = () => {
      root.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`,
      );
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);

    return () => {
      observer.disconnect();
      if (previousHeight)
        root.style.setProperty("--header-height", previousHeight);
      else root.style.removeProperty("--header-height");
    };
  }, []);

  return (
    <header ref={headerRef} className="site-header">
      <div className="header-inner">
        <a
          className="identity"
          href="#sobre"
          aria-label="Gustavo Fernandez — início"
        >
          <span className="identity-mark" aria-hidden="true">
            <Monitor size={21} />
          </span>
          <span>
            GF<span className="identity-divider">/</span>TERMINAL
            <span className="cursor" aria-hidden="true">
              _
            </span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              <span aria-hidden="true">/</span>
              {label}
            </a>
          ))}
        </nav>
        <button
          className="effects-toggle"
          type="button"
          aria-pressed={crtEnabled}
          onClick={onToggleCrt}
          aria-label="Efeitos visuais"
          disabled={reducedMotion}
          title={
            reducedMotion
              ? "Efeitos desativados pela preferência de movimento reduzido do sistema"
              : "Ativar ou desativar os efeitos visuais"
          }
        >
          <Power size={15} aria-hidden="true" />
          <span>
            FX{" "}
            <span className="effects-state">{crtEnabled ? "ON" : "OFF"}</span>
          </span>
        </button>
      </div>
    </header>
  );
}
