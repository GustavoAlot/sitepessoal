import "./styles/theme.css";

import Nav from "./components/Nav";
import Sobre from "./sections/Sobre";
import Resumo from "./sections/Resumo";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import NextSectionJump from "./components/NextSectionJump";
import CRTOverlay from "./components/CRTOverlay";
import BootLoading from "./components/BootLoading";

import { useEffect, useState } from "react";

type SectionId = "sobre" | "resumo" | "projetos" | "contato";

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("sobre");
  const [crtEnabled, setCrtEnabled] = useState(true);

  useEffect(() => {
    const ids: SectionId[] = ["sobre", "resumo", "projetos", "contato"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const navH =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--nav-height",
        ),
      ) || 0;

    const ratios = new Map<Element, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          ratios.set(entry.target, entry.intersectionRatio);

        let best: HTMLElement | null = null;
        let bestRatio = 0;

        for (const el of sections) {
          const r = ratios.get(el) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = el;
          }
        }

        if (best && best.id !== activeSection)
          setActiveSection(best.id as SectionId);
      },
      {
        root: null,
        rootMargin: `-${Math.ceil(navH)}px 0px 0px 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeSection]);

  return (
    <div className="app">
      <CRTOverlay enabled={crtEnabled} />
      <BootLoading />

      <Nav
        ids={["sobre", "resumo", "projetos", "contato"]}
        active={activeSection}
        onChange={setActiveSection}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled((v) => !v)}
      />

      <main>
        <Sobre />
        <Resumo />
        <Projects />
        <Contact />

        <NextSectionJump
          ids={["sobre", "resumo", "projetos", "contato"]}
          active={activeSection}
          onChange={setActiveSection}
          labelNext="Continuar"
          labelRestart="Voltar ao topo"
        />
      </main>
    </div>
  );
}
