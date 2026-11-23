import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import CRTOverlay from "./components/CRTOverlay";
import Footer from "./components/Footers";
import Sobre from "./sections/Sobre";
import Resumo from "./sections/Resumo";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import { useEffectsPreference } from "./hooks/useEffectsPreference";
import { navigation, type SectionId } from "./data/navigation";
import "./styles/theme.css";

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("sobre");
  const { effectsEnabled, reducedMotion, toggleEffects } =
    useEffectsPreference();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id as SectionId);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app" data-effects={effectsEnabled ? "on" : "off"}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <CRTOverlay enabled={effectsEnabled} />
      <Nav
        active={activeSection}
        crtEnabled={effectsEnabled}
        reducedMotion={reducedMotion}
        onToggleCrt={toggleEffects}
      />
      <main id="conteudo" tabIndex={-1}>
        <Sobre effectsEnabled={effectsEnabled} />
        <Resumo />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
