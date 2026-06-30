import Link from 'next/link';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <Link href="/" className="flex items-center group" style={{ textDecoration: 'none' }}>
      <span className={`font-extrabold tracking-tight ${sizes[size]} leading-none`}>
        <span style={{ color: '#1a1a18' }}>Sono</span>
        <span style={{ color: '#5cb167' }}>Job</span>
      </span>
    </Link>
  );
}
