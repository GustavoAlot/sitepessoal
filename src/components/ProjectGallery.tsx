import { useState } from "react";
import type { ProjectScreenshot } from "../data/projects";
import { useLanguage } from "../hooks/useLanguage";

export default function ProjectGallery({
  screenshots,
}: {
  screenshots: ProjectScreenshot[];
}) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const screenshot = screenshots[index];
  if (!screenshot) return null;
  return (
    <div
      className="project-gallery"
      role="group"
      aria-label={t.projects.gallery}
    >
      <figure>
        <img
          className="dialog-image"
          src={screenshot.src}
          alt={screenshot.caption}
          width={screenshot.width}
          height={screenshot.height}
        />
        <figcaption>{screenshot.caption}</figcaption>
      </figure>
      {screenshots.length > 1 && (
        <div className="gallery-controls">
          <button
            type="button"
            onClick={() => setIndex((value) => value - 1)}
            disabled={index === 0}
          >
            {t.projects.previous}
          </button>
          <span role="status" aria-live="polite">
            {t.projects.screenshot} {index + 1} {t.projects.of}{" "}
            {screenshots.length}
          </span>
          <button
            type="button"
            onClick={() => setIndex((value) => value + 1)}
            disabled={index === screenshots.length - 1}
          >
            {t.projects.next}
          </button>
        </div>
      )}
    </div>
  );
}
