import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { profile } from "../data/profile";
import { useLanguage } from "../hooks/useLanguage";
import {
  CONTACT_ERROR,
  validateContact,
  type ContactErrors,
} from "../lib/contact";

type Status = "idle" | "sending" | "success" | "error";

export default function EmailSent({
  endpoint = profile.formEndpoint,
}: {
  endpoint?: string;
}) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    // Quietly discard bot submissions without contacting the external service.
    if (String(data.get("company") || "").trim()) return;

    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const nextErrors = validateContact(email, message, t.contact.errors);
    setErrors(nextErrors);
    setStatus("idle");
    if (Object.keys(nextErrors).length) {
      const field = form.elements.namedItem(
        nextErrors.email ? "email" : "message",
      );
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    data.set("email", email);
    data.set("message", message);
    setStatus("sending");
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(CONTACT_ERROR);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      controllerRef.current = null;
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label={t.contact.form}
    >
      <div className="panel-bar">
        <span>{t.contact.newMessage}</span>
        <span>{t.contact.channel}</span>
      </div>
      <div className="form-body">
        <fieldset disabled={status === "sending"}>
          <legend className="sr-only">{t.contact.legend}</legend>
          <div className="honeypot" aria-hidden="true">
            <label>
              {t.contact.company}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>
          <label className="field-label" htmlFor="contact-email">
            {t.contact.emailLabel} <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={t.contact.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="field-error" role="alert">
              {t.contact.errors.email}
            </p>
          )}
          <label
            className="field-label message-label"
            htmlFor="contact-message"
          >
            {t.contact.messageLabel} <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            minLength={8}
            placeholder={t.contact.messagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="field-error" role="alert">
              {t.contact.errors.message}
            </p>
          )}
          <button
            className="button button-primary send-button"
            type="submit"
            aria-busy={status === "sending"}
          >
            <Send size={16} aria-hidden="true" />
            {status === "sending" ? t.contact.sending : t.contact.send}
          </button>
        </fieldset>
        <div className="form-status" aria-live="polite" aria-atomic="true">
          {status === "success" && (
            <p className="form-success">{t.contact.success}</p>
          )}
          {status === "error" && (
            <p className="field-error">{t.contact.errors.submission}</p>
          )}
        </div>
        <p className="form-note">{t.contact.note}</p>
      </div>
    </form>
  );
}
