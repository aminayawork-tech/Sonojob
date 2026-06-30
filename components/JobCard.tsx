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
      className="card block p-5 hover:border-[#5cb167] hover:shadow-sm transition-all group"
      style={{ textDecoration: 'none' }}
    >
      {/* Top badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.urgent && (
          <span className="badge" style={{ background: '#ffedd5', color: '#c2410c' }}>Urgent</span>
        )}
        {job.featured && (
          <span className="badge" style={{ background: '#ebf5ec', color: '#3d9b4a' }}>Featured</span>
        )}
        {job.signOnBonus && (
          <span className="badge" style={{ background: '#d1fae5', color: '#065f46' }}>
            ${job.signOnBonus.toLocaleString()} Sign-On
          </span>
        )}
        <span className="badge ml-auto" style={{ background: '#f4f4f4', color: '#9a9a98' }}>
          {daysAgo(job.postedDays)}
        </span>
      </div>

      {/* Title & employer */}
      <h3 className="font-semibold text-base leading-snug group-hover:text-[#3d9b4a] transition-colors mb-0.5" style={{ color: '#5cb167' }}>
        {job.title}
      </h3>
      <div className="flex items-center gap-1.5 text-sm mb-3" style={{ color: '#9a9a98' }}>
        <span className="text-[#3d3d3b] font-medium">{job.employer}</span>
        {job.employerVerified && (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="flex-shrink-0">
            <circle cx="6.5" cy="6.5" r="6.5" fill="#5cb167" opacity="0.15" />
            <path d="M4 6.5l1.8 1.8 3.2-3.2" stroke="#5cb167" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs mb-3" style={{ color: '#9a9a98' }}>
        <span className="flex items-center gap-1">
          <LocationIcon size={11} color="#e4e4e3" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <BriefcaseIcon size={11} color="#e4e4e3" />
          {job.employmentType}
        </span>
        <span className="flex items-center gap-1">
          <ClockIcon size={11} color="#e4e4e3" />
          {job.shift}
        </span>
        <span className="flex items-center gap-1">
          <BuildingIcon size={11} color="#e4e4e3" />
          {job.facilityType}
        </span>
      </div>

      {/* Credentials */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.credentialsRequired.map((c) => (
          <span
            key={c}
            className="badge"
            style={{ background: '#ebf5ec', color: '#3d9b4a', border: '1px solid #c2e5c4' }}
          >
            {c}
          </span>
        ))}
        {job.specialty.map((s) => (
          <span key={s} className="badge" style={{ background: '#f4f4f4', color: '#3d3d3b' }}>
            {s}
          </span>
        ))}
      </div>

      {/* Salary */}
      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: '#f4f4f4' }}>
        <span className="font-bold text-sm" style={{ color: '#5cb167' }}>{formatSalary(job)}</span>
        <span className="text-xs font-medium" style={{ color: '#5cb167' }}>View Details →</span>
      </div>
    </Link>
  );
}
