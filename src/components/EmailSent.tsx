import { useState } from "react";
import styles from "./EmailSent.module.scss";
import { CrtButton, EnvelopeIcon } from "../components/CrtButton";

type Status = "idle" | "sending" | "ok" | "error";

type Props = {
  /** Endpoint do Formspree (padrão do seu exemplo) */
  endpoint?: string;
};

export default function EmailSent({ endpoint = "https://formspree.io/f/xjkoqjlb" }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot anti-spam
    if ((data.get("company") as string)?.trim()) {
      setStatus("ok");
      form.reset();
      return;
    }

    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    // validações simples
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("idle");
      setErrorMsg("Informe um e-mail válido.");
      return;
    }
    if (!message || message.length < 8) {
      setStatus("idle");
      setErrorMsg("Escreva uma mensagem com pelo menos 8 caracteres.");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!res.ok) {
        let errText = "Não foi possível enviar agora. Tente novamente em instantes.";
        try {
          const j = await res.json();
          if (j?.errors?.[0]?.message) errText = j.errors[0].message;
        } catch {}
        throw new Error(errText);
      }

      setStatus("ok");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Erro inesperado ao enviar.");
      console.error(err);
    }
  }

  const isSending = status === "sending";

  return (
    <section className={styles.wrap}>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* honeypot (não remover name="company") */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className={styles.honeypot} />

        <label className={styles.label}>
          Seu e-mail
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="voce@exemplo.com"
            required
            aria-invalid={!!errorMsg || undefined}
            autoComplete="email"
          />
        </label>

        <label className={styles.label}>
          Mensagem
          <textarea
            className={styles.textarea}
            name="message"
            rows={6}
            placeholder="Escreva sua mensagem..."
            required
          />
        </label>

        {/* status */}
        {errorMsg && (
          <div className={styles.error} role="alert" aria-live="polite">
            {errorMsg}
          </div>
        )}
        {status === "ok" && (
          <div className={styles.success} role="status" aria-live="polite">
            Mensagem enviada, obrigado pelo contato!
          </div>
        )}

        <CrtButton
          className="btn-crt--sm btn-crt--auto"
          type="submit"
          icon={<EnvelopeIcon />}
          disabled={isSending}
          aria-busy={isSending}
        >
          {isSending ? "Enviando..." : "Enviar"}
        </CrtButton>
      </form>
    </section>
  );
}
