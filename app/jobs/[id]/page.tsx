import { getJob, jobs, type Job } from '@/lib/jobs';
import { fetchJobById } from '@/lib/fetchJobs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckIcon } from '@/components/Icons';

export const dynamicParams = true;

export async function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

function formatSalary(job: Job) {
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
  const job = getJob(id) ?? await fetchJobById(id);
  if (!job) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        href="/jobs"
        className="text-sm mb-6 inline-flex items-center gap-1.5"
        style={{ color: '#9a9a98', textDecoration: 'none' }}
      >
        ← Back to Jobs
      </Link>

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* MAIN */}
        <article className="flex-1 min-w-0">
          {/* Header card */}
          <div className="card p-6 mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {job.urgent && (
                <span className="badge" style={{ background: '#ffedd5', color: '#c2410c' }}>Urgent</span>
              )}
              {job.featured && (
                <span className="badge" style={{ background: '#fae8e7', color: '#b03e33' }}>Featured</span>
              )}
              {job.signOnBonus && (
                <span className="badge" style={{ background: '#ccfbf1', color: '#0f766e' }}>
                  ${job.signOnBonus.toLocaleString()} Sign-On Bonus
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold mb-1 text-[#1a1a18]">{job.title}</h1>
            <div className="flex items-center gap-1.5 mb-4" style={{ color: '#9a9a98' }}>
              <span className="font-medium text-[#1a1a18]">{job.employer}</span>
              {job.employerVerified && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="7" fill="#d25244" opacity="0.15" />
                  <path d="M4.5 7l2 2 3.5-3.5" stroke="#d25244" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
                <div key={label} className="rounded-lg p-3" style={{ background: '#f4f4f4', border: '1px solid #e4e4e3' }}>
                  <div className="text-xs mb-0.5" style={{ color: '#9a9a98' }}>{label}</div>
                  <div className="text-sm font-medium text-[#1a1a18]">{value}</div>
                </div>
              ))}
            </div>

            {/* Salary */}
            <div
              className="flex items-center gap-3 p-4 rounded-lg"
              style={{ background: '#fae8e7', border: '1px solid #f0c0bb' }}
            >
              <div>
                <div className="text-xs mb-0.5" style={{ color: '#9a9a98' }}>Compensation</div>
                <div className="text-xl font-bold" style={{ color: '#b03e33' }}>{formatSalary(job)}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="card p-6 mb-4">
            <h2 className="font-semibold mb-3 text-[#1a1a18]">About This Role</h2>
            <p className="text-sm leading-relaxed" style={{ color: '#3d3d3b' }}>{job.description}</p>
          </div>

          {/* Benefits */}
          <div className="card p-6 mb-4">
            <h2 className="font-semibold mb-3 text-[#1a1a18]">Benefits & Compensation</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {job.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm" style={{ color: '#3d3d3b' }}>
                  <span className="mt-0.5 flex-shrink-0">
                    <CheckIcon size={14} color="#d25244" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4 text-[#1a1a18]">Requirements</h2>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#9a9a98' }}>
                  Required Credentials
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.credentialsRequired.map((c) => (
                    <span
                      key={c}
                      className="badge"
                      style={{ background: '#fae8e7', color: '#b03e33', border: '1px solid #f0c0bb' }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {job.credentialsPreferred.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#9a9a98' }}>
                    Preferred Credentials
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.credentialsPreferred.map((c) => (
                      <span
                        key={c}
                        className="badge"
                        style={{ background: '#f4f4f4', color: '#3d3d3b' }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#9a9a98' }}>
                  Equipment / Systems
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.equipment.map((e) => (
                    <span key={e} className="badge" style={{ background: '#f4f4f4', color: '#3d3d3b' }}>
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#9a9a98' }}>
                  Team Size
                </div>
                <p className="text-sm" style={{ color: '#1a1a18' }}>{job.teamSize}</p>
              </div>
            </div>
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="lg:w-72 flex-shrink-0 flex flex-col gap-4">
          <div className="card p-5 sticky top-20">
            <div className="text-xs mb-1" style={{ color: '#9a9a98' }}>Posted {daysAgo(job.postedDays)}</div>
            <div className="font-bold text-lg mb-4" style={{ color: '#b03e33' }}>{formatSalary(job)}</div>

            <button className="btn-primary w-full justify-center text-base py-3 mb-2">
              Apply Now
            </button>
            <button className="btn-secondary w-full justify-center text-sm">
              Save Job
            </button>

            <hr className="my-4" style={{ borderColor: '#f4f4f4' }} />

            <div className="text-xs space-y-2.5" style={{ color: '#9a9a98' }}>
              <div className="flex justify-between">
                <span>Employer</span>
                <span className="text-[#1a1a18] font-medium">{job.employer}</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span className="text-[#1a1a18]">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Type</span>
                <span className="text-[#1a1a18]">{job.employmentType}</span>
              </div>
              {job.signOnBonus && (
                <div className="flex justify-between">
                  <span>Sign-On Bonus</span>
                  <span style={{ color: '#0f766e' }} className="font-semibold">
                    ${job.signOnBonus.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Specialties */}
          <div className="card p-5">
            <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#9a9a98' }}>
              Specialties
            </div>
            <div className="flex flex-wrap gap-2">
              {job.specialty.map((s) => (
                <Link
                  key={s}
                  href={`/jobs?specialty=${encodeURIComponent(s)}`}
                  className="badge hover:border-[#d25244] transition-colors"
                  style={{ background: '#fae8e7', color: '#b03e33', border: '1px solid #f0c0bb', textDecoration: 'none' }}
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
