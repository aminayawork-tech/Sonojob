import { LocationIcon, BriefcaseIcon } from './Icons';

export type AggregatedJob = {
  id: string;
  title: string;
  employer: string;
  location: string;
  employmentType: string;
  specialty: string[];
  credentialsRequired: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  salaryUnit: string | null;
  remote: boolean;
  description: string;
  applyUrl: string;
  postedAt: string;
  source: string;
};

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
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const SOURCE_LABELS: Record<string, string> = {
  jsearch: 'Web', usajobs: 'USA Jobs', native: 'SonoJob',
};

export default function AggregatedJobCard({ job }: { job: AggregatedJob }) {
  const salary = formatSalary(job);

  return (
    <a
      href={job.applyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card block p-5 hover:border-[#d25244] hover:shadow-sm transition-all group"
      style={{ textDecoration: 'none' }}
    >
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.remote && (
          <span className="badge" style={{ background: '#d1fae5', color: '#065f46' }}>Remote</span>
        )}
        <span className="badge ml-auto" style={{ background: '#f4f4f4', color: '#9a9a98' }}>
          {SOURCE_LABELS[job.source] ?? job.source}
        </span>
        <span className="badge" style={{ background: '#f4f4f4', color: '#9a9a98' }}>
          {timeAgo(job.postedAt)}
        </span>
      </div>

      <h3 className="font-semibold text-[#1a1a18] text-base leading-snug group-hover:text-[#d25244] transition-colors mb-0.5">
        {job.title}
      </h3>
      <div className="text-sm font-medium text-[#3d3d3b] mb-3">{job.employer}</div>

      <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs mb-3" style={{ color: '#9a9a98' }}>
        <span className="flex items-center gap-1">
          <LocationIcon size={11} color="#e4e4e3" />
          {job.location || 'Location not specified'}
        </span>
        <span className="flex items-center gap-1">
          <BriefcaseIcon size={11} color="#e4e4e3" />
          {job.employmentType}
        </span>
      </div>

      {job.specialty.length > 0 && job.specialty[0] !== 'General' && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {job.specialty.map((s) => (
            <span key={s} className="badge" style={{ background: '#f4f4f4', color: '#3d3d3b' }}>{s}</span>
          ))}
          {job.credentialsRequired.map((c) => (
            <span key={c} className="badge" style={{ background: '#fae8e7', color: '#b03e33', border: '1px solid #f0c0bb' }}>{c}</span>
          ))}
        </div>
      )}

      {job.description && (
        <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: '#9a9a98' }}>
          {job.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: '#f4f4f4' }}>
        <span className="font-bold text-sm text-[#1a1a18]">
          {salary ?? <span style={{ color: '#9a9a98' }}>Salary not listed</span>}
        </span>
        <span className="text-xs font-medium" style={{ color: '#d25244' }}>Apply ↗</span>
      </div>
    </a>
  );
}
