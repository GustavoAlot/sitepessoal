import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useEffectsPreference } from "../src/hooks/useEffectsPreference";

function mockMotion(matches: boolean) {
  const query = new EventTarget();
  Object.assign(query, {
    matches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
  });
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => query),
  );
  return query as EventTarget & { matches: boolean };
}

describe("visual effect preferences", () => {
  it("persists the toggle across mounts", () => {
    mockMotion(false);
    const first = renderHook(useEffectsPreference);
    expect(first.result.current.effectsEnabled).toBe(true);
    act(() => first.result.current.toggleEffects());
    expect(first.result.current.effectsEnabled).toBe(false);
    expect(localStorage.getItem("portfolio:effects")).toBe("off");
    first.unmount();
    expect(renderHook(useEffectsPreference).result.current.effectsEnabled).toBe(
      false,
    );
  });

  it("honors reduced motion even when effects were previously enabled", () => {
    localStorage.setItem("portfolio:effects", "on");
    mockMotion(true);
    const { result } = renderHook(useEffectsPreference);
    expect(result.current.effectsEnabled).toBe(false);
    act(() => result.current.toggleEffects());
    expect(result.current.effectsEnabled).toBe(false);
  });

  it("responds to changes in system preferences", () => {
    const query = mockMotion(false);
    const { result } = renderHook(useEffectsPreference);
    act(() => {
      query.matches = true;
      query.dispatchEvent(new Event("change"));
    });
    expect(result.current.effectsEnabled).toBe(false);
  });

  it("still works when storage is unavailable", () => {
    mockMotion(false);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage blocked");
    });
    const { result } = renderHook(useEffectsPreference);
    expect(result.current.effectsEnabled).toBe(true);
    act(() => result.current.toggleEffects());
    expect(result.current.effectsEnabled).toBe(false);
  });
});
