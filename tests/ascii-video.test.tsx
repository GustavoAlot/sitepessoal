import { act, fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AsciiVideo from "../src/components/AsciiVideo";

let observeVisibility: IntersectionObserverCallback;
const disconnect = vi.fn();

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        observeVisibility = callback;
      }
      observe = vi.fn();
      disconnect = disconnect;
    },
  );
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn(() => 1),
  );
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    drawImage: vi.fn(),
    getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(80 * 23 * 4) })),
  } as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "readyState", "get").mockReturnValue(2);
});

async function setInViewport(visible: boolean) {
  await act(async () => {
    observeVisibility(
      [{ isIntersecting: visible } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

describe("ASCII playback lifecycle", () => {
  it("plays in the viewport, pauses outside it, and cleans up on unmount", async () => {
    const { unmount } = render(<AsciiVideo />);
    await setInViewport(true);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledOnce();
    expect(requestAnimationFrame).toHaveBeenCalledOnce();
    await setInViewport(false);
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(cancelAnimationFrame).toHaveBeenCalled();
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("keeps a static signal without playing when effects are disabled", async () => {
    const { container } = render(<AsciiVideo animated={false} />);
    await setInViewport(true);
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    expect(requestAnimationFrame).not.toHaveBeenCalled();
    expect(container.querySelector("pre")?.textContent).toMatch(/[1tfLCG08@]/);
  });

  it("pauses when the browser tab becomes hidden", async () => {
    render(<AsciiVideo />);
    await setInViewport(true);
    vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    fireEvent(document, new Event("visibilitychange"));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  it("does not start an animation after unmounting during a pending play request", async () => {
    let resolvePlay: () => void = () => {};
    vi.mocked(HTMLMediaElement.prototype.play).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolvePlay = resolve;
        }),
    );
    const { unmount } = render(<AsciiVideo />);
    await setInViewport(true);
    unmount();
    await act(async () => {
      resolvePlay();
    });
    expect(requestAnimationFrame).not.toHaveBeenCalled();
  });
});
