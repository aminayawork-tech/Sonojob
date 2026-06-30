import type { AggregatedJob } from '@/app/api/jobs/search/route';
import { LocationIcon, BriefcaseIcon } from './Icons';

function formatSalary(job: AggregatedJob) {
  if (!job.salaryMin && !job.salaryMax) return null;
  const unit = job.salaryUnit === 'YEAR' || job.salaryUnit === 'yr' ? 'yr' : 'hr';
  const fmt = (n: number) => unit === 'yr' ? `$${(n / 1000).toFixed(0)}k` : `$${Math.round(n)}`;
  if (job.salaryMin && job.salaryMax) return `${fmt(job.salaryMin)}–${fmt(job.salaryMax)}/${unit}`;
  if (job.salaryMin) return `From ${fmt(job.salaryMin)}/${unit}`;
  if (job.salaryMax) return `Up to ${fmt(job.salaryMax)}/${unit}`;
  return null;
}

function timeAgo(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const SOURCE_LABELS: Record<string, string> = {
  jsearch: 'Web',
  usajobs: 'USA Jobs',
  native: 'SonoJob',
};

export default function AggregatedJobCard({ job }: { job: AggregatedJob }) {
  const salary = formatSalary(job);

  return (
    <a
      href={job.applyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card block p-5 hover:border-[#0ea5e9] hover:shadow-sm transition-all group"
      style={{ textDecoration: 'none' }}
    >
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.remote && (
          <span className="badge" style={{ background: '#d1fae5', color: '#065f46' }}>Remote</span>
        )}
        <span
          className="badge ml-auto"
          style={{ background: '#f1f5f9', color: '#64748b' }}
        >
          {SOURCE_LABELS[job.source] ?? job.source}
        </span>
        <span className="badge" style={{ background: '#f1f5f9', color: '#64748b' }}>
          {timeAgo(job.postedAt)}
        </span>
      </div>

      <h3 className="font-semibold text-[#0f172a] text-base leading-snug group-hover:text-[#0ea5e9] transition-colors mb-0.5">
        {job.title}
      </h3>
      <div className="text-sm font-medium text-[#334155] mb-3">{job.employer}</div>

      <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs mb-3" style={{ color: '#64748b' }}>
        <span className="flex items-center gap-1">
          <LocationIcon size={11} color="#94a3b8" />
          {job.location || 'Location not specified'}
        </span>
        <span className="flex items-center gap-1">
          <BriefcaseIcon size={11} color="#94a3b8" />
          {job.employmentType}
        </span>
      </div>

      {job.specialty.length > 0 && job.specialty[0] !== 'General' && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {job.specialty.map((s) => (
            <span key={s} className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>{s}</span>
          ))}
          {job.credentialsRequired.map((c) => (
            <span key={c} className="badge" style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' }}>{c}</span>
          ))}
        </div>
      )}

      {job.description && (
        <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: '#64748b' }}>
          {job.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: '#f1f5f9' }}>
        <span className="font-bold text-sm text-[#0f172a]">
          {salary ?? <span style={{ color: '#94a3b8' }}>Salary not listed</span>}
        </span>
        <span className="text-xs font-medium" style={{ color: '#0ea5e9' }}>
          Apply ↗
        </span>
      </div>
    </a>
  );
}
