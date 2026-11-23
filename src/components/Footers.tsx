import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <a className="footer-brand" href="#sobre">
            GF / TERMINAL_
          </a>
          <p>Um pouco de nostalgia. Muitas linhas de código.</p>
        </div>
        <div className="footer-end">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#sobre">Voltar ao início [ ↑ ]</a>
        </div>
      </div>
    </footer>
  );
}
