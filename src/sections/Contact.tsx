import { SiGithub } from "react-icons/si";
import { Download, Mail, MessageSquare } from "lucide-react";
import EmailSent from "../components/EmailSent";
import SectionHeading from "../components/SectionHeading";
import { profile } from "../data/profile";

export default function Contact() {
  return (
    <section
      id="contato"
      className="section contact-section"
      aria-label="Contato"
    >
      <div className="section-inner">
        <SectionHeading command="contato" title="Vamos abrir uma conversa?" />
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="availability">
              <span className="status-light" aria-hidden="true" />
              {profile.availability}
            </p>
            <p className="contact-intro">
              Tem uma oportunidade, uma ideia para tirar do papel ou só quer
              trocar uma ideia sobre tecnologia?
            </p>
            <p>Minha caixa de entrada está aberta.</p>
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="contact-links">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGithub size={18} aria-hidden="true" />
                GitHub<span aria-hidden="true">[ + ]</span>
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare size={18} aria-hidden="true" />
                WhatsApp<span aria-hidden="true">[ + ]</span>
              </a>
              <a href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" />
                E-mail<span aria-hidden="true">[ + ]</span>
              </a>
              <a href={profile.resume} download>
                <Download size={18} aria-hidden="true" />
                Currículo em PDF<span aria-hidden="true">[ ↓ ]</span>
              </a>
            </div>
          </div>
          <EmailSent />
        </div>
      </div>
    </section>
  );
}
