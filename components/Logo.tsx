import Link from 'next/link';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { text: 'text-xl', icon: 20 },
    md: { text: 'text-2xl', icon: 26 },
    lg: { text: 'text-4xl', icon: 40 },
  };
  const s = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-2 no-underline group">
      {/* Ultrasound probe / wave icon */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Probe body */}
        <rect x="10" y="2" width="6" height="12" rx="3" fill="#0ea5e9" />
        {/* Probe tip */}
        <ellipse cx="13" cy="15" rx="3.5" ry="2" fill="#0ea5e9" opacity="0.9" />
        {/* Wave arcs */}
        <path
          d="M6.5 17 Q13 22 19.5 17"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M4 20 Q13 26.5 22 20"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>

      {/* Wordmark */}
      <span className={`font-bold tracking-tight ${s.text} leading-none`}>
        <span style={{ color: '#0ea5e9' }}>Sono</span>
        <span style={{ color: '#f59e0b' }}>Job</span>
      </span>
    </Link>
  );
}
