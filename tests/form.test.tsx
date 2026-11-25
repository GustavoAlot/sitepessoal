import LanguageProvider from "../src/i18n/LanguageProvider";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import EmailSent from "../src/components/EmailSent";

async function fillForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Seu e-mail/), "visitor@example.com");
  await user.type(
    screen.getByLabelText(/Sua mensagem/),
    "Quero conversar sobre uma oportunidade.",
  );
  return user;
}

describe("contact form", () => {
  it("associates validation errors with the correct fields without submitting", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<EmailSent />, { wrapper: LanguageProvider });
    await userEvent.click(
      screen.getByRole("button", { name: "Enviar mensagem" }),
    );
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/Seu e-mail/)).toHaveAccessibleDescription(
      "Informe um e-mail válido.",
    );
    expect(screen.getByLabelText(/Seu e-mail/)).toHaveFocus();
    expect(screen.getByLabelText(/Sua mensagem/)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("submits to the configured endpoint and clears the form only on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    render(<EmailSent endpoint="https://formspree.io/f/test" />, {
      wrapper: LanguageProvider,
    });
    const user = await fillForm();
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(await screen.findByText(/Mensagem enviada/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Seu e-mail/)).toHaveValue("");
    const [endpoint, request] = fetchMock.mock.calls[0];
    expect(endpoint).toBe("https://formspree.io/f/test");
    expect(request.body.get("email")).toBe("visitor@example.com");
    expect(request.method).toBe("POST");
  });

  it.each(["http", "network"])(
    "keeps the message and allows retry after a %s failure",
    async (failure) => {
      const fetchMock =
        failure === "http"
          ? vi.fn().mockResolvedValue({ ok: false })
          : vi.fn().mockRejectedValue(new Error("Offline"));
      vi.stubGlobal("fetch", fetchMock);
      render(<EmailSent />, { wrapper: LanguageProvider });
      const user = await fillForm();
      await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));
      expect(
        await screen.findByText(/Não foi possível enviar/),
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/Sua mensagem/)).toHaveValue(
        "Quero conversar sobre uma oportunidade.",
      );
      expect(
        screen.getByRole("button", { name: "Enviar mensagem" }),
      ).toBeEnabled();
    },
  );

  it("prevents duplicate requests while a submission is pending", async () => {
    let resolve: (value: { ok: boolean }) => void = () => {};
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise((done) => {
            resolve = done;
          }),
      ),
    );
    render(<EmailSent />, { wrapper: LanguageProvider });
    const user = await fillForm();
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(
      screen.getByRole("button", { name: /Enviando mensagem/ }),
    ).toBeDisabled();
    fireEvent.submit(screen.getByRole("form"));
    expect(fetch).toHaveBeenCalledTimes(1);
    resolve({ ok: true });
    await waitFor(() =>
      expect(screen.getByText(/Mensagem enviada/)).toBeInTheDocument(),
    );
  });

  it("discards honeypot submissions without contacting Formspree", () => {
    vi.stubGlobal("fetch", vi.fn());
    render(<EmailSent />, { wrapper: LanguageProvider });
    fireEvent.change(screen.getByLabelText("Empresa"), {
      target: { value: "Spam" },
    });
    fireEvent.submit(screen.getByRole("form"));
    expect(fetch).not.toHaveBeenCalled();
  });
});
