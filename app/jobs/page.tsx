import { filterJobs, SPECIALTIES, CREDENTIALS } from '@/lib/jobs';
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

  const results = filterJobs({ query, specialty, employmentType, state, facilityType, credential });
  const hasFilters = !!(query || specialty || employmentType || state || facilityType || credential);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-1 text-[#0f172a]">Sonographer Jobs</h1>
      <p className="text-sm mb-8" style={{ color: '#64748b' }}>
        {results.length} listing{results.length !== 1 ? 's' : ''} found
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
              <input
                name="q"
                type="text"
                defaultValue={query}
                placeholder="Title, specialty, city…"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">Specialty</label>
              <select name="specialty" defaultValue={specialty}>
                <option value="">All Specialties</option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">Employment Type</label>
              <select name="employmentType" defaultValue={employmentType}>
                <option value="">All Types</option>
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">State</label>
              <select name="state" defaultValue={state}>
                <option value="">All States</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">Facility Type</label>
              <select name="facilityType" defaultValue={facilityType}>
                <option value="">All Facilities</option>
                {FACILITY_TYPES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#334155]">Credential Required</label>
              <select name="credential" defaultValue={credential}>
                <option value="">Any Credential</option>
                {CREDENTIALS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary text-sm justify-center">
              Apply Filters
            </button>

            {hasFilters && (
              <a href="/jobs" className="text-xs text-center" style={{ color: '#94a3b8' }}>
                Clear all filters
              </a>
            )}
          </form>
        </aside>

        {/* RESULTS */}
        <div className="flex-1 min-w-0">
          {results.length === 0 ? (
            <div className="card p-12 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: '#f1f5f9' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#94a3b8" strokeWidth="1.5" />
                  <path d="M16.5 16.5L21 21" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#0f172a]">No jobs found</h3>
              <p className="text-sm mb-4" style={{ color: '#64748b' }}>
                Try adjusting your filters or clearing them to see all listings.
              </p>
              <a href="/jobs" className="btn-secondary text-sm">
                Clear Filters
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {results.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
