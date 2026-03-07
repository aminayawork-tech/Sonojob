import Link from 'next/link';
import type { Job } from '@/lib/jobs';
import { LocationIcon, BriefcaseIcon, ClockIcon, BuildingIcon } from './Icons';

function formatSalary(job: Job) {
  const fmt = (n: number) =>
    job.salaryUnit === 'yr' ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
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
      className="card block p-5 hover:border-[#0ea5e9] hover:shadow-sm transition-all group"
      style={{ textDecoration: 'none' }}
    >
      {/* Top badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.urgent && (
          <span className="badge" style={{ background: '#ffedd5', color: '#c2410c' }}>
            Urgent
          </span>
        )}
        {job.featured && (
          <span className="badge" style={{ background: '#fef3c7', color: '#b45309' }}>
            Featured
          </span>
        )}
        {job.signOnBonus && (
          <span className="badge" style={{ background: '#ccfbf1', color: '#0f766e' }}>
            ${job.signOnBonus.toLocaleString()} Sign-On
          </span>
        )}
        <span className="badge ml-auto" style={{ background: '#f1f5f9', color: '#64748b' }}>
          {daysAgo(job.postedDays)}
        </span>
      </div>

      {/* Title & employer */}
      <h3 className="font-semibold text-[#0f172a] text-base leading-snug group-hover:text-[#0ea5e9] transition-colors mb-0.5">
        {job.title}
      </h3>
      <div className="flex items-center gap-1.5 text-sm mb-3" style={{ color: '#64748b' }}>
        <span className="text-[#334155] font-medium">{job.employer}</span>
        {job.employerVerified && (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="flex-shrink-0">
            <circle cx="6.5" cy="6.5" r="6.5" fill="#0ea5e9" opacity="0.15" />
            <path d="M4 6.5l1.8 1.8 3.2-3.2" stroke="#0ea5e9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs mb-3" style={{ color: '#64748b' }}>
        <span className="flex items-center gap-1">
          <LocationIcon size={11} color="#94a3b8" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <BriefcaseIcon size={11} color="#94a3b8" />
          {job.employmentType}
        </span>
        <span className="flex items-center gap-1">
          <ClockIcon size={11} color="#94a3b8" />
          {job.shift}
        </span>
        <span className="flex items-center gap-1">
          <BuildingIcon size={11} color="#94a3b8" />
          {job.facilityType}
        </span>
      </div>

      {/* Credentials */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.credentialsRequired.map((c) => (
          <span
            key={c}
            className="badge"
            style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' }}
          >
            {c}
          </span>
        ))}
        {job.specialty.map((s) => (
          <span
            key={s}
            className="badge"
            style={{ background: '#f1f5f9', color: '#475569' }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Salary */}
      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: '#f1f5f9' }}>
        <span className="font-bold text-[#0f172a] text-sm">{formatSalary(job)}</span>
        <span className="text-xs font-medium" style={{ color: '#0ea5e9' }}>
          View Details →
        </span>
      </div>
    </Link>
  );
}
