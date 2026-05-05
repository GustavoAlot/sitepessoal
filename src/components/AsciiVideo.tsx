import { useEffect, useRef } from "react";
import styles from "./AsciiVideo.module.scss";
import waveVideo from "../assets/ascii-wave.webm";

const ASCII_CHARS =
  " .'`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

function getRefs(
  video: HTMLVideoElement | null,
  canvas: HTMLCanvasElement | null,
  pre: HTMLPreElement | null,
) {
  if (!video || !canvas || !pre) return null;

  const context = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!context) return null;

  return {
    video,
    canvas,
    pre,
    ctx: context,
  };
}

export default function AsciiVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const refs = getRefs(videoRef.current, canvasRef.current, preRef.current);

    if (!refs) return;

    const { video, canvas, pre, ctx } = refs;

    let raf = 0;
    let lastTime = 0;

    const fps = 6;
    const frameInterval = 1000 / fps;
    const backgroundThreshold = 0.14;

    function draw(now: number) {
      if (!video.videoWidth || !video.videoHeight) {
        raf = requestAnimationFrame(draw);
        return;
      }

      if (now - lastTime < frameInterval) {
        raf = requestAnimationFrame(draw);
        return;
      }

      lastTime = now;

      const cols = window.innerWidth < 700 ? 110 : 100;
      const scale = video.videoHeight / video.videoWidth;
      const rows = Math.max(18, Math.floor(cols * scale * 0.5));

      canvas.width = cols;
      canvas.height = rows;

      ctx.drawImage(video, 0, 0, cols, rows);

      const { data } = ctx.getImageData(0, 0, cols, rows);

      let ascii = "";

      for (let y = 0; y < rows; y++) {
        let line = "";

        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

          if (brightness < backgroundThreshold) {
            line += " ";
            continue;
          }

          const normalized =
            (brightness - backgroundThreshold) / (1 - backgroundThreshold);

          const charIndex = Math.max(
            0,
            Math.min(
              ASCII_CHARS.length - 1,
              Math.floor(normalized * (ASCII_CHARS.length - 1)),
            ),
          );

          line += ASCII_CHARS[charIndex];
        }

        ascii += line + "\n";
      }

      pre.textContent = ascii;
      raf = requestAnimationFrame(draw);
    }

    async function start() {
      try {
        await video.play();
      } catch {
        // autoplay pode falhar em alguns navegadores
      }

      raf = requestAnimationFrame(draw);
    }

    video.addEventListener("loadeddata", start);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadeddata", start);
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <video
        ref={videoRef}
        src={waveVideo}
        muted
        loop
        playsInline
        preload="auto"
        className={styles.hiddenVideo}
      />

      <canvas ref={canvasRef} className={styles.hiddenCanvas} />

      <pre ref={preRef} className={styles.ascii} />
    </div>
  );
}
