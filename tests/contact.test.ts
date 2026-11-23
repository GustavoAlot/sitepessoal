import { describe, expect, it } from "vitest";
import { validateContact } from "../src/lib/contact";

describe("contact validation", () => {
  it("accepts an address and a sufficiently long message, ignoring edge whitespace", () => {
    expect(
      validateContact("  gustavo@example.com  ", "  Uma nova oportunidade.  "),
    ).toEqual({});
  });

  it.each([
    "",
    "example.com",
    "user@",
    "user@host",
    "user name@example.com",
    "user@@example.com",
  ])("rejects invalid email %s", (email) => {
    expect(validateContact(email, "Uma mensagem válida.")).toHaveProperty(
      "email",
    );
  });

  it.each(["", "curta", "         ", "   oi   "])(
    "rejects short or whitespace-only messages",
    (message) => {
      expect(validateContact("user@example.com", message)).toHaveProperty(
        "message",
      );
    },
  );
});
