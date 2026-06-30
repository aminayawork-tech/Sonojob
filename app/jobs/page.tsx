import { SPECIALTIES, CREDENTIALS } from '@/lib/jobs';
import { fetchLiveJobs } from '@/lib/fetchJobs';
import JobCard from '@/components/JobCard';

const EMPLOYMENT_TYPES = ['Full-Time', 'Part-Time', 'PRN', 'Travel/Contract'];
const FACILITY_TYPES = ['Hospital', 'Outpatient', 'Mobile', 'VA/Military', 'Clinic'];
const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
];

type SearchParams = { [key: string]: string | string[] | undefined };

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

  const results = await fetchLiveJobs({ query, specialty, employmentType, state, facilityType, credential });

  const nativeJobs = results.filter((j) => !j.id.startsWith('jsearch-') && !j.id.startsWith('usajobs-'));
  const liveJobs = results.filter((j) => j.id.startsWith('jsearch-') || j.id.startsWith('usajobs-'));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-[#1a1a18]">Sonographer Jobs</h1>
        <a href="/sonographers/verify" className="btn-primary text-sm px-4 py-2">
          Verify My Credentials
        </a>
      </div>
      <p className="text-sm mb-8" style={{ color: '#9a9a98' }}>
        {results.length} listing{results.length !== 1 ? 's' : ''}
        {hasApiKey && liveJobs.length > 0 && ` — ${nativeJobs.length} direct + ${liveJobs.length} from the web`}
        {hasFilters ? ' matching your filters' : ''}
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* FILTERS SIDEBAR */}
        <aside className="lg:w-64 flex-shrink-0">
          <form method="GET" action="/jobs" className="card p-4 flex flex-col gap-4 sticky top-20">
            <h2 className="font-semibold text-xs uppercase tracking-wider" style={{ color: '#9a9a98' }}>
              Filter Jobs
            </h2>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">Keyword</label>
              <input name="q" type="text" defaultValue={query} placeholder="Title, specialty, city…" />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">Specialty</label>
              <select name="specialty" defaultValue={specialty}>
                <option value="">All Specialties</option>
                {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">Employment Type</label>
              <select name="employmentType" defaultValue={employmentType}>
                <option value="">All Types</option>
                {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">State</label>
              <select name="state" defaultValue={state}>
                <option value="">All States</option>
                {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">Facility Type</label>
              <select name="facilityType" defaultValue={facilityType}>
                <option value="">All Facilities</option>
                {FACILITY_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">Credential Required</label>
              <select name="credential" defaultValue={credential}>
                <option value="">Any Credential</option>
                {CREDENTIALS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <button type="submit" className="btn-primary text-sm justify-center">Apply Filters</button>
            {hasFilters && (
              <a href="/jobs" className="text-xs text-center" style={{ color: '#9a9a98' }}>Clear all filters</a>
            )}
          </form>
        </aside>

        {/* RESULTS */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Direct / native postings */}
          {nativeJobs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="badge" style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', textTransform: 'none', fontSize: '0.7rem' }}>
                  Direct Postings
                </span>
                <span className="text-xs" style={{ color: '#9a9a98' }}>Posted directly by employers on SonoJob</span>
              </div>
              <div className="flex flex-col gap-4">
                {nativeJobs.map((job) => <JobCard key={job.id} job={job} />)}
              </div>
            </div>
          )}

          {/* Live aggregated jobs */}
          {liveJobs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="badge" style={{ background: '#ebf5ec', color: '#3d9b4a', border: '1px solid #c2e5c4', textTransform: 'none', fontSize: '0.7rem' }}>
                  From Across the Web
                </span>
                <span className="text-xs" style={{ color: '#9a9a98' }}>
                  Aggregated from LinkedIn, Indeed, ZipRecruiter, USAJOBS &amp; more
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {liveJobs.map((job) => <JobCard key={job.id} job={job} />)}
              </div>
            </div>
          )}

          {/* API key setup notice */}
          {!hasApiKey && (
            <div className="rounded-lg p-4 text-sm flex items-start gap-3" style={{ background: '#ebf5ec', border: '1px solid #c2e5c4' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#5cb167" strokeWidth="1.2" />
                <path d="M8 7v4M8 5v.5" stroke="#5cb167" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <div style={{ color: '#3d9b4a' }}>
                <strong>Live jobs ready.</strong> Add <code className="text-xs px-1 rounded" style={{ background: '#c2e5c4' }}>JSEARCH_API_KEY</code> to <code className="text-xs px-1 rounded" style={{ background: '#c2e5c4' }}>.env.local</code> to pull real-time sonographer jobs from LinkedIn, Indeed, ZipRecruiter, USAJOBS, and more.
              </div>
            </div>
          )}

          {/* Empty state */}
          {results.length === 0 && (
            <div className="card p-12 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#ede9e3' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#9a9a98" strokeWidth="1.5" />
                  <path d="M16.5 16.5L21 21" stroke="#9a9a98" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#1a1a18]">No jobs found</h3>
              <p className="text-sm mb-4" style={{ color: '#9a9a98' }}>Try adjusting your filters.</p>
              <a href="/jobs" className="btn-secondary text-sm">Clear Filters</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
