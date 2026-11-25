import { profile } from "../data/profile";
import { useLanguage } from "../hooks/useLanguage";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <a className="footer-brand" href="#sobre">
            GF / TERMINAL_
          </a>
          <p>{t.footer.tagline}</p>
        </div>
        <div className="footer-end">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#sobre">{t.footer.back} [ ↑ ]</a>
        </div>
      </div>
    </footer>
  );
}
