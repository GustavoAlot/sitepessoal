import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App";
import LanguageProvider from "../src/i18n/LanguageProvider";
import { profile } from "../src/data/profile";

beforeEach(() => {
  document.documentElement.lang = "pt-BR";
  document.head.innerHTML =
    '<meta name="description"><meta property="og:title"><meta property="og:description"><meta property="og:locale">';
  vi.stubGlobal("matchMedia", () => ({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe = vi.fn();
      disconnect = vi.fn();
    },
  );
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe = vi.fn();
      disconnect = vi.fn();
    },
  );
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

function renderPortfolio() {
  return render(<App />, { wrapper: LanguageProvider });
}

describe("bilingual portfolio", () => {
  it("starts in Portuguese without using the browser's preferred language", () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("en-US");
    renderPortfolio();
    expect(screen.getByRole("button", { name: "Português" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByRole("heading", { name: "O caminho até aqui." }),
    ).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("pt-BR");
  });

  it("translates navigation, content, project details, metadata and validation messages", async () => {
    const user = userEvent.setup();
    renderPortfolio();
    await user.click(screen.getByRole("button", { name: "English" }));
    expect(screen.getByRole("link", { name: /Experience/ })).toHaveAttribute(
      "href",
      "#resumo",
    );
    expect(
      screen.getByRole("heading", { name: "The path so far." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Let's start a conversation." }),
    ).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe("Gustavo Fernandez | Full Stack Developer");
    expect(
      document.querySelector('meta[property="og:locale"]'),
    ).toHaveAttribute("content", "en_US");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByLabelText(/Your email/)).toHaveAccessibleDescription(
      "Enter a valid email address.",
    );
    await user.click(
      screen.getByRole("button", {
        name: "Explore project Solar Energy Simulator",
      }),
    );
    const dialog = screen.getByRole("dialog", {
      name: "Solar Energy Simulator",
    });
    expect(
      within(dialog).getByRole("heading", { name: "What the project does" }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("link", { name: "View documentation" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/GustavoAlot/calculadora_energia_solar",
    );
  });

  it("restores an explicit language choice after remounting", async () => {
    const user = userEvent.setup();
    const first = renderPortfolio();
    await user.click(screen.getByRole("button", { name: "English" }));
    expect(localStorage.getItem("portfolio:language")).toBe("en");
    first.unmount();
    renderPortfolio();
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(screen.getByRole("button", { name: "Português" }));
    expect(
      screen.getByRole("heading", { name: "O caminho até aqui." }),
    ).toBeInTheDocument();
  });

  it("remains usable when persistent storage is blocked", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Blocked");
    });
    renderPortfolio();
    await userEvent.click(screen.getByRole("button", { name: "English" }));
    expect(document.documentElement.lang).toBe("en");
  });

  it("updates an existing validation error when the page language changes", async () => {
    const user = userEvent.setup();
    renderPortfolio();
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    await user.click(screen.getByRole("button", { name: "English" }));
    expect(screen.getByLabelText(/Your message/)).toHaveAccessibleDescription(
      "Write a message with at least 8 characters.",
    );
    expect(
      screen.queryByText("Informe um e-mail válido."),
    ).not.toBeInTheDocument();
  });

  it("links LinkedIn and aligns the timeline with the new resumes", () => {
    renderPortfolio();
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      profile.linkedin,
    );
    expect(screen.getByText("Ago 2025 — nov 2026")).toBeInTheDocument();
    expect(screen.getByText("2021 — dez 2025 · Concluído")).toBeInTheDocument();
  });
});

describe("resume language selection", () => {
  it("offers both PDFs on the Portuguese site, with descriptive download filenames", async () => {
    renderPortfolio();
    await userEvent.click(
      screen.getByRole("button", { name: "Baixar currículo" }),
    );
    const portuguese = screen.getByRole("link", {
      name: "Baixar currículo em português",
    });
    const english = screen.getByRole("link", {
      name: "Download resume in English",
    });
    expect(portuguese).toHaveAttribute("href", profile.resumes.pt);
    expect(portuguese).toHaveAttribute(
      "download",
      "Gustavo_Fernandez_Full_Stack.pdf",
    );
    expect(english).toHaveAttribute("href", profile.resumes.en);
    expect(english).toHaveAttribute(
      "download",
      "Gustavo_Fernandez_Full_Stack_EN.pdf",
    );
  });

  it("allows the Portuguese PDF to be selected while browsing in English", async () => {
    const user = userEvent.setup();
    renderPortfolio();
    await user.click(screen.getByRole("button", { name: "English" }));
    await user.click(screen.getByRole("button", { name: "Resume in PDF" }));
    expect(
      screen.getByRole("link", { name: "Baixar currículo em português" }),
    ).toHaveAttribute("href", profile.resumes.pt);
    expect(
      screen.getByRole("link", { name: "Download resume in English" }),
    ).toHaveAttribute("href", profile.resumes.en);
  });

  it("closes with Escape and returns focus to its trigger", async () => {
    const user = userEvent.setup();
    renderPortfolio();
    const trigger = screen.getByRole("button", { name: "Baixar currículo" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(
      screen.queryByRole("link", { name: "Download resume in English" }),
    ).not.toBeInTheDocument();
  });

  it("closes when clicking outside the selector", async () => {
    renderPortfolio();
    const trigger = screen.getByRole("button", { name: "Baixar currículo" });
    await userEvent.click(trigger);
    fireEvent.pointerDown(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
