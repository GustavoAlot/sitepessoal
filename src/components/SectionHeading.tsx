type Props = { command: string; title: string; description?: string };

export default function SectionHeading({ command, title, description }: Props) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span aria-hidden="true">~/</span>
        {command}
      </p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
