// All icons are 24x24 SVGs unless otherwise noted
type IconProps = { size?: number; className?: string; color?: string };

export function AbdominalIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="12" rx="8" ry="9" stroke={color} strokeWidth="1.5" />
      <path d="M8 9c1-1.5 2-2 4-2s3 .5 4 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 13c.5 2 1.5 3.5 4 3.5s3.5-1.5 4-3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 11h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function OBGYNIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="3.5" stroke={color} strokeWidth="1.5" />
      <path d="M12 11.5v5M10 15h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="12" cy="19" rx="4" ry="2" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

export function VascularIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12c0-3 2-5 4-5 1 0 2 .5 3 1.5S14 10 15 10c2 0 4-2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 12c0 3 2 5 4 5 1 0 2-.5 3-1.5S14 14 15 14c2 0 4 2 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="5" cy="12" r="1.5" fill={color} />
      <circle cx="19" cy="6" r="1.5" fill={color} />
      <circle cx="19" cy="18" r="1.5" fill={color} />
    </svg>
  );
}

export function CardiacIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 20S4 14.5 4 9a4 4 0 0 1 8-0.8A4 4 0 0 1 20 9c0 5.5-8 11-8 11z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M3 12h3l2-3 2 6 2-4 1.5 2H21" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

export function MSKIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8 4C8 4 7 7 8 9s3 3 3 5v6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 4C16 4 17 7 16 9s-3 3-3 5v6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 20h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 6h10" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function BreastIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 16C4 12 6 8 10 8c2 0 2 2 2 2s0-2 2-2c4 0 6 4 6 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 16c2 2 4 3 8 3s6-1 8-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="12" r="1.5" fill={color} opacity="0.4" />
      <circle cx="14" cy="12" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

export function PediatricIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.5" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 6.5c.5-.5 1-.8 1.5-.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M13 6c.5.3 1 .8 1.2 1" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function NeuroIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 4C8 4 5 7 5 10.5c0 2 .8 3.5 2 4.5v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2c1.2-1 2-2.5 2-4.5C19 7 16 4 12 4z" stroke={color} strokeWidth="1.5" />
      <path d="M9 10.5c1-1 2-1.5 3-1.5s2 .5 3 1.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M10 18v2M14 18v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SmallPartsIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="6" stroke={color} strokeWidth="1.5" />
      <path d="M15.5 15.5L20 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11" cy="11" r="2.5" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export function TargetIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

export function CredentialIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="4" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="11" r="2.5" stroke={color} strokeWidth="1.5" />
      <path d="M13 9h5M13 13h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 18v-1.5a2 2 0 0 1 4 0V18" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function SalaryIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M12 7v1.5M12 15.5V17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 9.5C9.5 8.7 10.6 8 12 8s2.5.7 2.5 1.8c0 2-5 1.5-5 4 0 1.2 1.1 2.2 2.5 2.2s2.5-1 2.5-2.2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LocationIcon({ size = 16, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1.5C5.8 1.5 4 3.3 4 5.5 4 8.5 8 14 8 14s4-5.5 4-8.5C12 3.3 10.2 1.5 8 1.5z" stroke={color} strokeWidth="1.2" />
      <circle cx="8" cy="5.5" r="1.5" fill={color} />
    </svg>
  );
}

export function ClockIcon({ size = 16, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.2" />
      <path d="M8 5v3.5l2 2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function BuildingIcon({ size = 16, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="3" width="12" height="11" rx="1" stroke={color} strokeWidth="1.2" />
      <path d="M5 14V9h6v5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <rect x="5" y="5" width="2" height="2" rx="0.3" fill={color} opacity="0.6" />
      <rect x="9" y="5" width="2" height="2" rx="0.3" fill={color} opacity="0.6" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 16, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="1.5" y="5" width="13" height="9" rx="1.5" stroke={color} strokeWidth="1.2" />
      <path d="M5 5V4a2 2 0 0 1 6 0v1" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M1.5 9h13" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

export function CheckIcon({ size = 16, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 8l3.5 3.5 6.5-7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ size = 16, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1.5l1.8 3.7 4.1.6-3 2.9.7 4-3.6-1.9L4.4 12.7l.7-4-3-2.9 4.1-.6z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldCheckIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3L4 6v6c0 5 3.5 8.5 8 9.5 4.5-1 8-4.5 8-9.5V6L12 3z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.5 12l2.5 2.5 4.5-4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UsersIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="7" r="3.5" stroke={color} strokeWidth="1.5" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 3.5a3.5 3.5 0 0 1 0 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LightningIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13 2L4 14h8l-1 8 9-12h-8z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function ChartIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 20V14M8 20V8M12 20V11M16 20V5M20 20V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ProbeIcon({ size = 24, className = '', color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="9" y="2" width="6" height="11" rx="3" stroke={color} strokeWidth="1.5" />
      <ellipse cx="12" cy="14" rx="3.5" ry="2" stroke={color} strokeWidth="1.3" />
      <path d="M7 16.5Q12 21 17 16.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M4.5 19.5Q12 25 19.5 19.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}
