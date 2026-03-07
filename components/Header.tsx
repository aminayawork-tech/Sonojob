'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const path = usePathname();
  const active = (href: string) =>
    path === href
      ? 'text-[#0f172a] font-semibold'
      : 'text-[#64748b] hover:text-[#0f172a]';

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: 'rgba(248,250,252,0.95)', backdropFilter: 'blur(12px)', borderColor: '#e2e8f0' }}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Logo size="md" />

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/jobs" className={`transition-colors ${active('/jobs')}`}>
            Find Jobs
          </Link>
          <Link href="/employers" className={`transition-colors ${active('/employers')}`}>
            For Employers
          </Link>
          <Link href="/about" className={`transition-colors ${active('/about')}`}>
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/employers/post" className="btn-amber text-sm py-1.5 px-4">
            Post a Job
          </Link>
        </div>
      </div>
    </header>
  );
}
