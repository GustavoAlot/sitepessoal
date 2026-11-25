import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { profile } from "../data/profile";
import { useLanguage } from "../hooks/useLanguage";

export default function ResumeDownload({
  variant = "button",
}: {
  variant?: "button" | "contact";
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const handleOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target))
        setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`resume-download resume-download--${variant}`}>
      <button
        ref={triggerRef}
        className={
          variant === "button"
            ? "button button-secondary"
            : "resume-contact-button"
        }
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        <Download size={16} aria-hidden="true" />
        {variant === "button" ? t.resume.button : t.resume.contact}
        <ChevronDown size={15} aria-hidden="true" />
      </button>
      {open && (
        <div
          id={id}
          className="resume-options"
          role="group"
          aria-label={t.resume.choose}
        >
          <a
            href={profile.resumes.pt}
            download="Gustavo_Fernandez_Full_Stack.pdf"
            hrefLang="pt-BR"
            lang="pt-BR"
            aria-label={t.resume.downloadPortuguese}
            onClick={() => setOpen(false)}
          >
            {t.resume.portuguese}
          </a>
          <a
            href={profile.resumes.en}
            download="Gustavo_Fernandez_Full_Stack_EN.pdf"
            hrefLang="en"
            lang="en"
            aria-label={t.resume.downloadEnglish}
            onClick={() => setOpen(false)}
          >
            {t.resume.english}
          </a>
        </div>
      )}
    </div>
  );
}
