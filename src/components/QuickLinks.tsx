import { memo } from "react";
import styles from "./QuickLinks.module.scss";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { FiMail, FiDownload } from "react-icons/fi";

type Props = {
  githubUrl: string;
  whatsappUrl: string;
  emailAddress: string;
  cvUrl: string;
};

function toMailto(email: string) {
  return `mailto:${email}`;
}

function QuickLinks({ githubUrl, whatsappUrl, emailAddress, cvUrl }: Props) {
  return (
    <aside className={styles.card} aria-label="Acessos rápidos">
      <h3 className={styles.title}>Acessos rápidos</h3>
      <p className={styles.subtitle}>
        Me encontre nas redes ou baixe meu CV em PDF.
      </p>

      <div className={styles.list}>
        <a className={styles.crtBtn} href={cvUrl} download>
          <span className={styles.ico} aria-hidden="true">
            <FiDownload />
          </span>
          <span className={styles.label}>Baixar CV</span>
        </a>

        <a
          className={styles.crtBtn}
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.ico} aria-hidden="true">
            <SiGithub />
          </span>
          <span className={styles.label}>GitHub</span>
        </a>

        <a
          className={styles.crtBtn}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.ico} aria-hidden="true">
            <SiWhatsapp />
          </span>
          <span className={styles.label}>WhatsApp</span>
        </a>

        <a className={styles.crtBtn} href={toMailto(emailAddress)}>
          <span className={styles.ico} aria-hidden="true">
            <FiMail />
          </span>
          <span className={styles.label}>E-mail</span>
        </a>
      </div>
    </aside>
  );
}

export default memo(QuickLinks);
