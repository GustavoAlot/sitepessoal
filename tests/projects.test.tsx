import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Projects from "../src/sections/Projects";

describe("project exploration", () => {
  it("opens details for the selected project and restores focus when closed", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    const trigger = screen.getByRole("button", {
      name: "Explorar projeto Alot of Cash",
    });
    await user.click(trigger);
    expect(
      screen.getByRole("dialog", { name: "Alot of Cash" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Visitar projeto" }),
    ).toHaveAttribute("href", "https://frontaoc.vercel.app/home");
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByRole("button", { name: "Fechar detalhes" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("handles the native Escape cancellation event", async () => {
    const user = userEvent.setup();
    render(<Projects />);
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
    render(<Projects />);
    await user.click(
      screen.getByRole("button", { name: "Explorar projeto Alot of Cash" }),
    );
    await user.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
