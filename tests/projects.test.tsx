import LanguageProvider from "../src/i18n/LanguageProvider";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Projects from "../src/sections/Projects";

describe("project exploration", () => {
  it("shows the updated AOC screenshots and public demo boundary", async () => {
    const user = userEvent.setup();
    render(<Projects />, { wrapper: LanguageProvider });
    await user.click(
      screen.getByRole("button", { name: "Explorar projeto Alot of Cash" }),
    );
    expect(
      screen.getByText(
        /Conexões reais e o bot Telegram ficam no ambiente pessoal/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Visão geral mensal/ }),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("aoc-overview-desktop.jpg"),
    );
    await user.click(screen.getByRole("button", { name: "Próxima" }));
    expect(
      screen.getByRole("img", {
        name: "Carteira de investimentos em modo sandbox.",
      }),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("aoc-investments-desktop.jpg"),
    );
    expect(screen.getByRole("status")).toHaveTextContent("Captura 2 de 3");
    await user.click(screen.getByRole("button", { name: "Próxima" }));
    expect(
      screen.getByRole("img", { name: /Visão geral no celular/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Próxima" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Anterior" }));
    expect(screen.getByRole("status")).toHaveTextContent("Captura 2 de 3");
  });

  it("opens details for the selected project and restores focus when closed", async () => {
    const user = userEvent.setup();
    render(<Projects />, { wrapper: LanguageProvider });
    const trigger = screen.getByRole("button", {
      name: "Explorar projeto Alot of Cash",
    });
    await user.click(trigger);
    expect(
      screen.getByRole("dialog", { name: "Alot of Cash" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Visitar projeto" }),
    ).toHaveAttribute("href", "https://frontaoc.vercel.app/login");
    const dialog = screen.getByRole("dialog", { name: "Alot of Cash" });
    expect(
      within(dialog).getByRole("link", { name: "Ver documentação" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/GustavoAlot/AOC_monitoramento_financeiro",
    );
    expect(within(dialog).getAllByRole("link")).toHaveLength(2);
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByRole("button", { name: "Fechar detalhes" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("handles the native Escape cancellation event", async () => {
    const user = userEvent.setup();
    render(<Projects />, { wrapper: LanguageProvider });
    await user.click(
      screen.getByRole("button", {
        name: "Explorar projeto Simulador de Energia Solar",
      }),
    );
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { bubbles: false, cancelable: true }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the dialog backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<Projects />, { wrapper: LanguageProvider });
    await user.click(
      screen.getByRole("button", { name: "Explorar projeto Alot of Cash" }),
    );
    await user.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
