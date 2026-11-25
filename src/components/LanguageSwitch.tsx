import { useLanguage } from "../hooks/useLanguage";

export default function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="language-switch" role="group" aria-label={t.nav.language}>
      <button
        type="button"
        lang="pt-BR"
        aria-label="Português"
        aria-pressed={language === "pt"}
        onClick={() => setLanguage("pt")}
      >
        PT
      </button>
      <button
        type="button"
        lang="en"
        aria-label="English"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
