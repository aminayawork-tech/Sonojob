import { SPECIALTIES, CREDENTIALS, jobs as staticJobs } from '@/lib/jobs';
import JobCard from '@/components/JobCard';
import AggregatedJobCard from '@/components/AggregatedJobCard';
import type { AggregatedJob } from '@/app/api/jobs/search/route';

const EMPLOYMENT_TYPES = ['Full-Time', 'Part-Time', 'PRN', 'Travel/Contract'];
const FACILITY_TYPES = ['Hospital', 'Outpatient', 'Mobile', 'VA/Military', 'Clinic'];
const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
];

type SearchParams = { [key: string]: string | string[] | undefined };

async function fetchAggregatedJobs(params: {
  q: string; specialty: string; state: string; employmentType: string;
}): Promise<AggregatedJob[]> {
  const apiKey = process.env.JSEARCH_API_KEY;
  if (!apiKey) return [];

  const url = new URL('http://localhost:3000/api/jobs/search');
  if (params.q) url.searchParams.set('q', params.q);
  if (params.specialty) url.searchParams.set('specialty', params.specialty);
  if (params.state) url.searchParams.set('location', params.state);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.jobs ?? [];
  } catch {
    return [];
  }
}

export default async function JobsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const get = (k: string) => (Array.isArray(sp[k]) ? (sp[k] as string[])[0] : sp[k]) ?? '';

  const query = get('q');
  const specialty = get('specialty');
  const employmentType = get('employmentType');
  const state = get('state');
  const facilityType = get('facilityType');
  const credential = get('credential');
  const hasFilters = !!(query || specialty || employmentType || state || facilityType || credential);

  const hasApiKey = !!process.env.JSEARCH_API_KEY;

  // Filter static/native jobs (employer-posted directly on SonoJob)
  const nativeJobs = staticJobs.filter((job) => {
    if (query) {
      const q = query.toLowerCase();
      if (!job.title.toLowerCase().includes(q) &&
          !job.employer.toLowerCase().includes(q) &&
          !job.location.toLowerCase().includes(q) &&
          !job.specialty.some((s) => s.toLowerCase().includes(q))) return false;
    }
    if (specialty && !job.specialty.includes(specialty)) return false;
    if (employmentType && job.employmentType !== employmentType) return false;
    if (state && job.state !== state) return false;
    if (facilityType && job.facilityType !== facilityType) return false;
    if (credential && !job.credentialsRequired.includes(credential)) return false;
    return true;
  });

  // Fetch aggregated jobs from APIs
  const aggregatedJobs = await fetchAggregatedJobs({ q: query, specialty, state, employmentType });

  const totalCount = nativeJobs.length + aggregatedJobs.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-[#0f172a]">Sonographer Jobs</h1>
        <a
          href="/sonographers/verify"
          className="btn-primary text-sm px-4 py-2"
        >
          Verify My Credentials
        </a>
      </div>
      <p className="text-sm mb-8" style={{ color: '#64748b' }}>
        {hasApiKey
          ? `${totalCount} listing${totalCount !== 1 ? 's' : ''} found — ${nativeJobs.length} direct + ${aggregatedJobs.length} aggregated`
          : `${nativeJobs.length} direct employer listing${nativeJobs.length !== 1 ? 's' : ''}`}
        {hasFilters ? ' matching your filters' : ''}
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* FILTERS SIDEBAR */}
        <aside className="lg:w-64 flex-shrink-0">
          <form method="GET" action="/jobs" className="card p-4 flex flex-col gap-4 sticky top-20">
            <h2 className="font-semibold text-xs uppercase tracking-wider" style={{ color: '#94a3b8' }}>
              Filter Jobs
            </h2>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">Keyword</label>
              <input name="q" type="text" defaultValue={query} placeholder="Title, specialty, city…" />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">Specialty</label>
              <select name="specialty" defaultValue={specialty}>
                <option value="">All Specialties</option>
                {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">Employment Type</label>
              <select name="employmentType" defaultValue={employmentType}>
                <option value="">All Types</option>
                {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">State</label>
              <select name="state" defaultValue={state}>
                <option value="">All States</option>
                {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">Facility Type</label>
              <select name="facilityType" defaultValue={facilityType}>
                <option value="">All Facilities</option>
                {FACILITY_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">Credential Required</label>
              <select name="credential" defaultValue={credential}>
                <option value="">Any Credential</option>
                {CREDENTIALS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <button type="submit" className="btn-primary text-sm justify-center">Apply Filters</button>

            {hasFilters && (
              <a href="/jobs" className="text-xs text-center" style={{ color: '#94a3b8' }}>Clear all filters</a>
            )}
          </form>
        </aside>

        {/* RESULTS */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Native / direct postings */}
          {nativeJobs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="badge"
                  style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', textTransform: 'none', fontSize: '0.7rem' }}
                >
                  Direct Postings
                </span>
                <span className="text-xs" style={{ color: '#94a3b8' }}>Posted directly by employers on SonoJob</span>
              </div>
              <div className="flex flex-col gap-4">
                {nativeJobs.map((job) => <JobCard key={job.id} job={job} />)}
              </div>
            </div>
          )}

          {/* Aggregated jobs from APIs */}
          {hasApiKey && aggregatedJobs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="badge"
                  style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', textTransform: 'none', fontSize: '0.7rem' }}
                >
                  From Across the Web
                </span>
                <span className="text-xs" style={{ color: '#94a3b8' }}>Aggregated from LinkedIn, Indeed, ZipRecruiter, USAJOBS &amp; more</span>
              </div>
              <div className="flex flex-col gap-4">
                {aggregatedJobs.map((job) => <AggregatedJobCard key={job.id} job={job} />)}
              </div>
            </div>
          )}

          {/* No API key — show setup notice */}
          {!hasApiKey && (
            <div
              className="rounded-lg p-4 text-sm flex items-start gap-3"
              style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#0ea5e9" strokeWidth="1.2" />
                <path d="M8 7v4M8 5.5v.5" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <div style={{ color: '#0369a1' }}>
                <strong>API integration ready.</strong> Add <code className="text-xs bg-blue-50 px-1 rounded">JSEARCH_API_KEY</code> to <code className="text-xs bg-blue-50 px-1 rounded">.env.local</code> to pull live jobs from LinkedIn, Indeed, ZipRecruiter, and USAJOBS.
              </div>
            </div>
          )}

          {/* Empty state */}
          {totalCount === 0 && (
            <div className="card p-12 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#f1f5f9' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#94a3b8" strokeWidth="1.5" />
                  <path d="M16.5 16.5L21 21" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#0f172a]">No jobs found</h3>
              <p className="text-sm mb-4" style={{ color: '#64748b' }}>Try adjusting your filters.</p>
              <a href="/jobs" className="btn-secondary text-sm">Clear Filters</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
