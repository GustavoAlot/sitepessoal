import { useEffect, useRef } from "react";
import { createStaticSignal, pixelsToAscii } from "../lib/ascii";
import waveVideo from "../assets/ascii-wave.webm";

const staticSignal = createStaticSignal();

export default function AsciiVideo({
  animated = true,
}: {
  animated?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const pre = preRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !canvas || !pre || !wrapper) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    let disposed = false;
    let inViewport = false;
    let frameId = 0;
    let generation = 0;
    let lastFrame = 0;
    let failed = false;

    function drawFrame() {
      if (
        !video ||
        !canvas ||
        !pre ||
        !context ||
        video.readyState < 2 ||
        !video.videoWidth ||
        failed
      )
        return;
      const columns = 80;
      const rows = Math.max(
        1,
        Math.round(((columns * video.videoHeight) / video.videoWidth) * 0.5),
      );
      if (canvas.width !== columns || canvas.height !== rows) {
        canvas.width = columns;
        canvas.height = rows;
      }
      try {
        context.drawImage(video, 0, 0, columns, rows);
        pre.textContent = pixelsToAscii(
          context.getImageData(0, 0, columns, rows).data,
          columns,
        );
      } catch {
        failed = true;
        pre.textContent = staticSignal;
      }
    }

    function shouldAnimate() {
      return animated && inViewport && !document.hidden && !disposed && !failed;
    }

    function draw(now: number) {
      if (!shouldAnimate()) return;
      if (now - lastFrame >= 1000 / 8) {
        drawFrame();
        lastFrame = now;
      }
      frameId = requestAnimationFrame(draw);
    }

    function synchronize() {
      if (!video) return;
      const currentGeneration = ++generation;
      cancelAnimationFrame(frameId);
      if (!shouldAnimate() || video.readyState < 2) {
        video.pause();
        if (!animated) pre!.textContent = staticSignal;
        return;
      }
      void video
        .play()
        .then(() => {
          if (currentGeneration === generation && shouldAnimate())
            frameId = requestAnimationFrame(draw);
        })
        .catch(() => {
          drawFrame();
        });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        synchronize();
      },
      { rootMargin: "80px" },
    );
    observer.observe(wrapper);
    video.addEventListener("loadeddata", synchronize);
    document.addEventListener("visibilitychange", synchronize);

    return () => {
      disposed = true;
      generation++;
      cancelAnimationFrame(frameId);
      observer.disconnect();
      video.removeEventListener("loadeddata", synchronize);
      document.removeEventListener("visibilitychange", synchronize);
      video.pause();
    };
  }, [animated]);

  return (
    <div ref={wrapperRef} className="ascii-wrap" aria-hidden="true">
      <video
        ref={videoRef}
        src={waveVideo}
        muted
        loop
        playsInline
        preload={animated ? "auto" : "none"}
        hidden
      />
      <canvas ref={canvasRef} hidden />
      <pre ref={preRef} className="ascii-art">
        {staticSignal}
      </pre>
    </div>
  );
}
