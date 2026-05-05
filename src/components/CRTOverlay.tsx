type Props = {
  enabled: boolean;
};

export default function CRTOverlay({ enabled }: Props) {
  if (!enabled) return null;

  return (
    <>
      <div className="crt-interlaced" aria-hidden="true" />
      <div className="crt-noise" aria-hidden="true" />
    </>
  );
}
