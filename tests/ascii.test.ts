import { describe, expect, it } from "vitest";
import {
  ASCII_CHARS,
  brightnessToCharacter,
  createStaticSignal,
  pixelsToAscii,
} from "../src/lib/ascii";

describe("video-to-ASCII conversion", () => {
  it("keeps black pixels empty and maps white to the brightest character", () => {
    expect(brightnessToCharacter(0, 0, 0)).toBe(" ");
    expect(brightnessToCharacter(255, 255, 255)).toBe(ASCII_CHARS.at(-1));
  });

  it("weights green more strongly than red and blue", () => {
    const brightness = (r: number, g: number, b: number) =>
      ASCII_CHARS.indexOf(brightnessToCharacter(r, g, b));
    expect(brightness(0, 255, 0)).toBeGreaterThan(brightness(255, 0, 0));
    expect(brightness(255, 0, 0)).toBeGreaterThan(brightness(0, 0, 255));
  });

  it("preserves row boundaries in an RGBA frame", () => {
    const pixels = new Uint8ClampedArray([
      0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255,
    ]);
    expect(pixelsToAscii(pixels, 2)).toBe(" @\n@ \n");
  });

  it.each([0, -1, 1.5, 3])(
    "rejects invalid widths or incomplete rows (%s)",
    (columns) => {
      expect(() => pixelsToAscii(new Uint8ClampedArray(8), columns)).toThrow(
        RangeError,
      );
    },
  );

  it("provides a nonempty static signal with predictable dimensions", () => {
    const rows = createStaticSignal().split("\n").slice(0, -1);
    expect(rows).toHaveLength(36);
    expect(
      createStaticSignal()
        .split("\n")
        .slice(0, -1)
        .every((row) => row.length === 80),
    ).toBe(true);
    expect(createStaticSignal()).toMatch(/[1tfLCG08@]/);
  });
});
