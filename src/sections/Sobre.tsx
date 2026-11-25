import { SiGithub } from "react-icons/si";
import AsciiVideo from "../components/AsciiVideo";
import ResumeDownload from "../components/ResumeDownload";
import { profile } from "../data/profile";
import { useLanguage } from "../hooks/useLanguage";

export default function Sobre({ effectsEnabled }: { effectsEnabled: boolean }) {
  const { t } = useLanguage();
  return (
    <section id="sobre" className="hero section" aria-labelledby="hero-title">
      <div className="section-inner">
        <div className="hero-kicker">
          <span>{t.hero.portfolio}</span>
          <span>{t.hero.experimentation}</span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="terminal-prompt">
              <span aria-hidden="true">guest@gustavo:~$</span> whoami
            </p>
            <h1 id="hero-title">
              GUSTAVO
              <br />
              <span>FERNANDEZ</span>
              <span className="cursor title-cursor" aria-hidden="true">
                _
              </span>
            </h1>
            <p className="hero-role">
              {t.profile.role}
              <span className="role-line" aria-hidden="true" />
            </p>
            <p className="hero-summary">{t.profile.introduction}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">
                {t.hero.explore}
              </a>
              <ResumeDownload />
            </div>
            <a
              className="hero-github"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub size={16} aria-hidden="true" />
              github.com/GustavoAlot
            </a>
          </div>
          <div className="signal-panel">
            <div className="panel-bar">
              <span>
                <span className="panel-square" aria-hidden="true" />{" "}
                {t.hero.signal}
              </span>
              <span>ASCII / WEBM</span>
            </div>
            <div className="signal-screen">
              <div
                className="screen-crosshair crosshair-top"
                aria-hidden="true"
              >
                +
              </div>
              <AsciiVideo animated={effectsEnabled} />
              <div
                className="screen-crosshair crosshair-bottom"
                aria-hidden="true"
              >
                +
              </div>
              <span className="signal-caption" aria-hidden="true">
                A LITTLE HUMAN IN THE MACHINE.
              </span>
            </div>
            <div className="panel-bar panel-bar-bottom">
              <span>{t.hero.conversion}</span>
              <span
                aria-label={effectsEnabled ? t.hero.playing : t.hero.paused}
              >
                {effectsEnabled ? "[ PLAY ]" : "[ PAUSE ]"}
              </span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <span className="availability">
            <span className="status-light" aria-hidden="true" />
            {t.profile.availability}
          </span>
          <a href="#resumo">
            {t.hero.journey} <span aria-hidden="true">[ + ]</span>
          </a>
        </div>
      </div>
    </section>
  );
}
