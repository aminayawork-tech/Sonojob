import { getJob, jobs } from '@/lib/jobs';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

function formatSalary(job: NonNullable<ReturnType<typeof getJob>>) {
  const fmt = (n: number) =>
    job.salaryUnit === 'yr' ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
  return `${fmt(job.salaryMin)} – ${fmt(job.salaryMax)} / ${job.salaryUnit}`;
}

function daysAgo(n: number) {
  if (n === 0) return 'Today';
  if (n === 1) return 'Yesterday';
  return `${n} days ago`;
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back */}
      <Link href="/jobs" className="text-sm mb-6 inline-flex items-center gap-1.5" style={{ color: '#8b949e', textDecoration: 'none' }}>
        ← Back to Jobs
      </Link>

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* ── MAIN ── */}
        <article className="flex-1 min-w-0">
          {/* Header */}
          <div className="card p-6 mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {job.urgent && (
                <span className="badge" style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316' }}>Urgent</span>
              )}
              {job.featured && (
                <span className="badge" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>Featured</span>
              )}
              {job.signOnBonus && (
                <span className="badge" style={{ background: 'rgba(20,184,166,0.12)', color: '#14b8a6' }}>
                  ${job.signOnBonus.toLocaleString()} Sign-On Bonus
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
            <div className="flex items-center gap-1.5 mb-4" style={{ color: '#8b949e' }}>
              <span className="font-medium" style={{ color: '#e6edf3' }}>{job.employer}</span>
              {job.employerVerified && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="7" fill="#0ea5e9" opacity="0.2" />
                  <path d="M4.5 7l2 2 3.5-3.5" stroke="#0ea5e9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <span>·</span>
              <span>{job.location}</span>
            </div>

            {/* Key details grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Employment Type', value: job.employmentType },
                { label: 'Shift', value: job.shift },
                { label: 'Facility', value: job.facilityType },
                { label: 'Scan Volume', value: job.scanVolume },
                { label: 'On-Call', value: job.onCall ? 'Required' : 'Not Required' },
                { label: 'Experience', value: job.experience },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg p-3" style={{ background: '#1c2128' }}>
                  <div className="text-xs mb-0.5" style={{ color: '#8b949e' }}>{label}</div>
                  <div className="text-sm font-medium text-[#e6edf3]">{value}</div>
                </div>
              ))}
            </div>

            {/* Salary */}
            <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)' }}>
              <div>
                <div className="text-xs mb-0.5" style={{ color: '#8b949e' }}>Compensation</div>
                <div className="text-xl font-bold" style={{ color: '#0ea5e9' }}>{formatSalary(job)}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="card p-6 mb-4">
            <h2 className="font-semibold mb-3">About This Role</h2>
            <p className="text-sm leading-relaxed" style={{ color: '#8b949e' }}>{job.description}</p>
          </div>

          {/* Benefits */}
          <div className="card p-6 mb-4">
            <h2 className="font-semibold mb-3">Benefits & Compensation</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {job.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm" style={{ color: '#8b949e' }}>
                  <span style={{ color: '#0ea5e9' }} className="mt-0.5 flex-shrink-0">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4">Requirements</h2>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#8b949e' }}>
                  Required Credentials
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.credentialsRequired.map((c) => (
                    <span
                      key={c}
                      className="badge"
                      style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.2)' }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {job.credentialsPreferred.length > 0 && (
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#8b949e' }}>
                    Preferred Credentials
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.credentialsPreferred.map((c) => (
                      <span
                        key={c}
                        className="badge"
                        style={{ background: 'rgba(139,148,158,0.08)', color: '#8b949e' }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#8b949e' }}>
                  Equipment / Systems
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.equipment.map((e) => (
                    <span key={e} className="badge" style={{ background: 'rgba(139,148,158,0.08)', color: '#8b949e' }}>
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#8b949e' }}>
                  Team Size
                </div>
                <p className="text-sm" style={{ color: '#e6edf3' }}>{job.teamSize}</p>
              </div>
            </div>
          </div>
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="lg:w-72 flex-shrink-0 flex flex-col gap-4">
          {/* Apply CTA */}
          <div className="card p-5 sticky top-20">
            <div className="text-xs mb-1" style={{ color: '#8b949e' }}>Posted {daysAgo(job.postedDays)}</div>
            <div className="font-bold text-lg mb-4" style={{ color: '#0ea5e9' }}>{formatSalary(job)}</div>

            <button className="btn-primary w-full justify-center text-base py-3 mb-2">
              Apply Now
            </button>
            <button className="btn-secondary w-full justify-center text-sm">
              Save Job
            </button>

            <hr className="my-4" style={{ borderColor: '#30363d' }} />

            <div className="text-xs space-y-2" style={{ color: '#8b949e' }}>
              <div className="flex justify-between">
                <span>Employer</span>
                <span className="text-[#e6edf3] font-medium">{job.employer}</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span className="text-[#e6edf3]">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Type</span>
                <span className="text-[#e6edf3]">{job.employmentType}</span>
              </div>
              {job.signOnBonus && (
                <div className="flex justify-between">
                  <span>Sign-On Bonus</span>
                  <span style={{ color: '#14b8a6' }} className="font-semibold">
                    ${job.signOnBonus.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Specialties */}
          <div className="card p-5">
            <div className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#8b949e' }}>
              Specialties
            </div>
            <div className="flex flex-wrap gap-2">
              {job.specialty.map((s) => (
                <Link
                  key={s}
                  href={`/jobs?specialty=${encodeURIComponent(s)}`}
                  className="badge hover:border-[#0ea5e9] transition-colors"
                  style={{ background: 'rgba(14,165,233,0.06)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.15)', textDecoration: 'none' }}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
