export const ASCII_CHARS = " .,:;i1tfLCG08@";

export function brightnessToCharacter(
  red: number,
  green: number,
  blue: number,
): string {
  const brightness = Math.max(
    0,
    Math.min(1, (red * 0.299 + green * 0.587 + blue * 0.114) / 255),
  );
  const normalized = Math.max(0, (brightness - 0.1) / 0.9);
  return ASCII_CHARS[Math.floor(normalized * (ASCII_CHARS.length - 1))];
}

export function pixelsToAscii(
  pixels: Uint8ClampedArray,
  columns: number,
): string {
  if (
    !Number.isInteger(columns) ||
    columns < 1 ||
    pixels.length % (columns * 4) !== 0
  ) {
    throw new RangeError("Pixel data must contain complete RGBA rows.");
  }
  let result = "";
  for (let pixel = 0; pixel < pixels.length; pixel += 4) {
    result += brightnessToCharacter(
      pixels[pixel],
      pixels[pixel + 1],
      pixels[pixel + 2],
    );
    if ((pixel / 4 + 1) % columns === 0) result += "\n";
  }
  return result;
}

// A static signal remains visible before decoding, with reduced motion, or if WebM is unsupported.
export function createStaticSignal(columns = 80, rows = 36): string {
  let result = "";
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = (column / (columns - 1) - 0.5) * 2.45;
      const y = (row / (rows - 1) - 0.5) * 2.25;
      const radius = x * x + y * y;
      if (radius > 1) {
        result += " ";
        continue;
      }
      const z = Math.sqrt(1 - radius);
      const longitude = Math.atan2(x, z);
      const grid = Math.sin(longitude * 15) * Math.cos(y * 24);
      const light = Math.max(
        0.05,
        z * 0.55 - x * 0.25 - y * 0.15 + grid * 0.16,
      );
      result +=
        ASCII_CHARS[
          Math.min(
            ASCII_CHARS.length - 1,
            Math.floor(light * ASCII_CHARS.length),
          )
        ];
    }
    result += "\n";
  }
  return result;
}
