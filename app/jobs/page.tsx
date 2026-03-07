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
      <h1 className="text-2xl font-bold mb-1">Sonographer Jobs</h1>
      <p className="text-sm mb-8" style={{ color: '#8b949e' }}>
        {results.length} listing{results.length !== 1 ? 's' : ''} found
        {hasFilters ? ' matching your filters' : ''}
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── FILTERS SIDEBAR ── */}
        <aside className="lg:w-64 flex-shrink-0">
          <form method="GET" action="/jobs" className="card p-4 flex flex-col gap-4 sticky top-20">
            <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: '#8b949e' }}>
              Filters
            </h2>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#e6edf3]">Keyword</label>
              <input
                name="q"
                type="text"
                defaultValue={query}
                placeholder="Title, specialty, city…"
                className="text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#e6edf3]">Specialty</label>
              <select name="specialty" defaultValue={specialty} className="text-sm">
                <option value="">All Specialties</option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#e6edf3]">Employment Type</label>
              <select name="employmentType" defaultValue={employmentType} className="text-sm">
                <option value="">All Types</option>
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#e6edf3]">State</label>
              <select name="state" defaultValue={state} className="text-sm">
                <option value="">All States</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#e6edf3]">Facility Type</label>
              <select name="facilityType" defaultValue={facilityType} className="text-sm">
                <option value="">All Facilities</option>
                {FACILITY_TYPES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#e6edf3]">Credential Required</label>
              <select name="credential" defaultValue={credential} className="text-sm">
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
              <a href="/jobs" className="text-xs text-center" style={{ color: '#8b949e' }}>
                Clear all filters
              </a>
            )}
          </form>
        </aside>

        {/* ── RESULTS ── */}
        <div className="flex-1 min-w-0">
          {results.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-semibold text-lg mb-2">No jobs found</h3>
              <p className="text-sm mb-4" style={{ color: '#8b949e' }}>
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
