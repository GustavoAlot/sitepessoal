import { SiGithub } from "react-icons/si";
import { Download } from "lucide-react";
import AsciiVideo from "../components/AsciiVideo";
import { profile } from "../data/profile";

export default function Sobre({ effectsEnabled }: { effectsEnabled: boolean }) {
  return (
    <section id="sobre" className="hero section" aria-labelledby="hero-title">
      <div className="section-inner">
        <div className="hero-kicker">
          <span>PORTFÓLIO PESSOAL</span>
          <span>DESENVOLVIMENTO & EXPERIMENTAÇÃO</span>
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
              {profile.role}
              <span className="role-line" aria-hidden="true" />
            </p>
            <p className="hero-summary">{profile.introduction}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">
                Explorar projetos
              </a>
              <a
                className="button button-secondary"
                href={profile.resume}
                download
              >
                <Download size={16} aria-hidden="true" />
                Baixar currículo
              </a>
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
                SINAL_VISUAL
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
              <span>VÍDEO CONVERTIDO EM CARACTERES</span>
              <span
                aria-label={
                  effectsEnabled ? "Animação ativa" : "Imagem estática"
                }
              >
                {effectsEnabled ? "[ PLAY ]" : "[ PAUSE ]"}
              </span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <span className="availability">
            <span className="status-light" aria-hidden="true" />
            {profile.availability}
          </span>
          <a href="#resumo">
            Conheça minha trajetória <span aria-hidden="true">[ + ]</span>
          </a>
        </div>
      </div>
    </section>
  );
}
