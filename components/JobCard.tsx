import Link from 'next/link';
import type { Job } from '@/lib/jobs';

function formatSalary(job: Job) {
  const fmt = (n: number) =>
    job.salaryUnit === 'yr'
      ? `$${(n / 1000).toFixed(0)}k`
      : `$${n}`;
  return `${fmt(job.salaryMin)}–${fmt(job.salaryMax)}/${job.salaryUnit}`;
}

function daysAgo(n: number) {
  if (n === 0) return 'Today';
  if (n === 1) return 'Yesterday';
  return `${n}d ago`;
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="card block p-5 hover:border-[#0ea5e9] transition-colors group relative"
      style={{ textDecoration: 'none' }}
    >
      {/* Top badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.urgent && (
          <span className="badge" style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316' }}>
            Urgent
          </span>
        )}
        {job.featured && (
          <span className="badge" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>
            Featured
          </span>
        )}
        {job.signOnBonus && (
          <span className="badge" style={{ background: 'rgba(20,184,166,0.12)', color: '#14b8a6' }}>
            ${job.signOnBonus.toLocaleString()} Sign-On
          </span>
        )}
        <span className="badge ml-auto" style={{ background: 'rgba(139,148,158,0.1)', color: '#8b949e' }}>
          {daysAgo(job.postedDays)}
        </span>
      </div>

      {/* Title & employer */}
      <h3 className="font-semibold text-[#e6edf3] text-base leading-snug group-hover:text-[#0ea5e9] transition-colors mb-0.5">
        {job.title}
      </h3>
      <div className="flex items-center gap-1.5 text-sm text-[#8b949e] mb-3">
        <span>{job.employer}</span>
        {job.employerVerified && (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="flex-shrink-0">
            <circle cx="6.5" cy="6.5" r="6.5" fill="#0ea5e9" opacity="0.2" />
            <path d="M4 6.5l1.8 1.8 3.2-3.2" stroke="#0ea5e9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#8b949e] mb-3">
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1C3.57 1 2 2.57 2 4.5c0 2.7 3.5 5.5 3.5 5.5S9 7.2 9 4.5C9 2.57 7.43 1 5.5 1z" stroke="#8b949e" strokeWidth="1" fill="none" />
            <circle cx="5.5" cy="4.5" r="1.2" fill="#8b949e" />
          </svg>
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <rect x="1" y="2" width="9" height="7.5" rx="1" stroke="#8b949e" strokeWidth="1" fill="none" />
            <path d="M1 4.5h9" stroke="#8b949e" strokeWidth="1" />
            <path d="M3.5 1v2M7.5 1v2" stroke="#8b949e" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {job.employmentType}
        </span>
        <span className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle cx="5.5" cy="5.5" r="4.5" stroke="#8b949e" strokeWidth="1" fill="none" />
            <path d="M5.5 3v2.5l1.5 1.5" stroke="#8b949e" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {job.shift}
        </span>
        <span>{job.facilityType}</span>
      </div>

      {/* Credentials */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.credentialsRequired.map((c) => (
          <span
            key={c}
            className="badge"
            style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.2)' }}
          >
            {c}
          </span>
        ))}
        {job.specialty.map((s) => (
          <span
            key={s}
            className="badge"
            style={{ background: 'rgba(139,148,158,0.08)', color: '#8b949e' }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Salary */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-[#e6edf3] text-sm">{formatSalary(job)}</span>
        <span
          className="text-xs font-medium"
          style={{ color: '#0ea5e9' }}
        >
          View Details →
        </span>
      </div>
    </Link>
  );
}
