import { useLayoutEffect, useRef } from "react";
import { Monitor, Power } from "lucide-react";
import { navigation, type SectionId } from "../data/navigation";
import { useLanguage } from "../hooks/useLanguage";
import LanguageSwitch from "./LanguageSwitch";

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
  const { t } = useLanguage();
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
        <a className="identity" href="#sobre" aria-label={t.nav.home}>
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
        <nav className="nav-links" aria-label={t.nav.label}>
          {navigation.map(({ id }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              <span aria-hidden="true">/</span>
              {t.navigation[id]}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <LanguageSwitch />
          <button
            className="effects-toggle"
            type="button"
            aria-pressed={crtEnabled}
            onClick={onToggleCrt}
            aria-label={t.nav.effects}
            disabled={reducedMotion}
            title={reducedMotion ? t.nav.reducedMotion : t.nav.effectsToggle}
          >
            <Power size={15} aria-hidden="true" />
            <span>
              FX{" "}
              <span className="effects-state">{crtEnabled ? "ON" : "OFF"}</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
