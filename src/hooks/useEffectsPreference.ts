import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio:effects";

export function useEffectsPreference() {
  const [preference, setPreference] = useState<boolean | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === "on" ? true : stored === "off" ? false : null;
    } catch {
      return null;
    }
  });
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const effectsEnabled = !reducedMotion && preference !== false;

  function toggleEffects() {
    const next = !effectsEnabled;
    setPreference(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      // The control also works when the browser blocks persistent storage.
    }
  }

  return { effectsEnabled, reducedMotion, toggleEffects };
}
