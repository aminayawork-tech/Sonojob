'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const path = usePathname();
  const active = (href: string) =>
    path === href
      ? 'text-[#1a1a18] font-semibold'
      : 'text-[#9a9a98] hover:text-[#1a1a18]';

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: 'rgba(218,214,208,0.95)', backdropFilter: 'blur(12px)', borderColor: '#c8c4be' }}
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
          <Link href="/employers/post" className="btn-primary text-sm py-1.5 px-4">
            Post a Job
          </Link>
        </div>
      </div>
    </header>
  );
}
