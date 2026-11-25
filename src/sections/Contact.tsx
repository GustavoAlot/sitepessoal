import { SiGithub } from "react-icons/si";
import { BriefcaseBusiness, Mail, MessageSquare } from "lucide-react";
import EmailSent from "../components/EmailSent";
import ResumeDownload from "../components/ResumeDownload";
import SectionHeading from "../components/SectionHeading";
import { profile } from "../data/profile";
import { useLanguage } from "../hooks/useLanguage";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section
      id="contato"
      className="section contact-section"
      aria-label={t.contact.label}
    >
      <div className="section-inner">
        <SectionHeading command={t.contact.command} title={t.contact.title} />
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="availability">
              <span className="status-light" aria-hidden="true" />
              {t.profile.availability}
            </p>
            <p className="contact-intro">{t.contact.introduction}</p>
            <p>{t.contact.inbox}</p>
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
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BriefcaseBusiness size={18} aria-hidden="true" />
                LinkedIn<span aria-hidden="true">[ + ]</span>
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
                {t.contact.email}
                <span aria-hidden="true">[ + ]</span>
              </a>
              <ResumeDownload variant="contact" />
            </div>
          </div>
          <EmailSent />
        </div>
      </div>
    </section>
  );
}
