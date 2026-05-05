import { useEffect, useState } from "react";
import styles from "./BootLoading.module.scss";

type Props = {
  duration?: number;
};

export default function BootLoading({ duration = 1300 }: Props) {
  const [done, setDone] = useState(false);
  const [blocks, setBlocks] = useState(0);

  useEffect(() => {
    const totalBlocks = 18;
    const stepTime = duration / totalBlocks;

    const interval = window.setInterval(() => {
      setBlocks((current) => {
        if (current >= totalBlocks) {
          window.clearInterval(interval);
          window.setTimeout(() => setDone(true), 180);
          return current;
        }

        return current + 1;
      });
    }, stepTime);

    return () => window.clearInterval(interval);
  }, [duration]);

  if (done) return null;

  return (
    <div className={styles.overlay} aria-label="Carregando interface">
      <div className={styles.window}>
        <div className={styles.titlebar}>
          <span>SYSTEM_BOOT.EXE</span>
          <button type="button" aria-label="Fechar" disabled>
            ×
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.loading}>Loading...</p>

          <div className={styles.progress} aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => (
              <span
                key={index}
                className={index < blocks ? styles.active : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
