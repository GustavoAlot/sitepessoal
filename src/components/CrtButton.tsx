import * as React from "react";

export type CrtButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  fullWidth?: boolean;
  invalid?: boolean;
};

export const CrtButton = React.forwardRef<HTMLButtonElement, CrtButtonProps>(
  ({ children, icon, className = "", fullWidth, invalid, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="button"
        aria-invalid={invalid || undefined}
        className={
          `btn-crt${fullWidth ? " is-full" : ""}${icon ? " has-icon" : ""}` +
          (className ? ` ${className}` : "")
        }
        type="button"
        {...props}
      >
        {icon ? <span className="btn-ico-wrap">{icon}</span> : null}
        <span className="btn-label">{children}</span>
      </button>
    );
  }
);
CrtButton.displayName = "CrtButton";

/** Ícone de envelope (opcional) — usa currentColor */
export const EnvelopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="btn-ico" {...p}>
    <rect width="20" height="16" x="2" y="4" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

