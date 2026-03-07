import Link from 'next/link';
import { jobs, SPECIALTIES } from '@/lib/jobs';
import JobCard from '@/components/JobCard';

const SPECIALTY_ICONS: Record<string, string> = {
  'Abdominal': '🫁',
  'OB/GYN': '🤰',
  'Vascular': '🩸',
  'Cardiac/Echo': '❤️',
  'MSK': '🦴',
  'Breast': '🎗️',
  'Pediatric': '👶',
  'Neurosonology': '🧠',
  'Small Parts': '🔬',
};

const STATS = [
  { value: '2,400+', label: 'Active Listings' },
  { value: '1,100+', label: 'Verified Employers' },
  { value: '50', label: 'States Covered' },
  { value: '$38–72', label: 'Typical Hourly Range' },
];

export default function HomePage() {
  const featured = jobs.filter((j) => j.featured);
  const urgent = jobs.filter((j) => j.urgent);

  return (
    <div className="sono-wave-bg">
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <div
          className="inline-flex items-center gap-2 badge mb-6"
          style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.2)', fontSize: '0.75rem' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] animate-pulse inline-block" />
          Built exclusively for the ultrasound community
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-5">
          Find your next{' '}
          <span style={{ color: '#0ea5e9' }}>sonographer</span> job
        </h1>
        <p className="text-lg md:text-xl text-[#8b949e] max-w-2xl mx-auto mb-10">
          Search thousands of ultrasound positions by specialty, credential, and location.
          No generic job-board noise — only sonography roles.
        </p>

        {/* Search bar */}
        <form action="/jobs" method="GET" className="max-w-2xl mx-auto">
          <div className="flex gap-2 p-1.5 rounded-xl border" style={{ background: '#161b22', borderColor: '#30363d' }}>
            <input
              name="q"
              type="text"
              placeholder="Title, specialty, city, or employer…"
              className="flex-1 bg-transparent border-none text-[#e6edf3] placeholder-[#8b949e] text-sm px-3 py-2 outline-none"
            />
            <button type="submit" className="btn-primary text-sm px-5 py-2 rounded-lg flex-shrink-0">
              Search Jobs
            </button>
          </div>
        </form>

        {/* Quick filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {['Abdominal', 'OB/GYN', 'Vascular', 'Cardiac/Echo', 'Travel/Contract'].map((tag) => (
            <Link
              key={tag}
              href={`/jobs?specialty=${encodeURIComponent(tag)}`}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-[#0ea5e9] hover:text-[#e6edf3]"
              style={{ borderColor: '#30363d', color: '#8b949e', textDecoration: 'none' }}
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-y" style={{ borderColor: '#30363d', background: '#161b22' }}>
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold" style={{ color: '#0ea5e9' }}>{s.value}</div>
              <div className="text-sm mt-1" style={{ color: '#8b949e' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* URGENT */}
      {urgent.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pt-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse inline-block" />
              Urgent / Travel Openings
            </h2>
            <Link href="/jobs?employmentType=Travel%2FContract" className="text-sm" style={{ color: '#0ea5e9', textDecoration: 'none' }}>
              See all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urgent.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        </section>
      )}

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-4 pt-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Featured Jobs</h2>
          <Link href="/jobs" className="text-sm" style={{ color: '#0ea5e9', textDecoration: 'none' }}>
            View all jobs →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </section>

      {/* BROWSE BY SPECIALTY */}
      <section className="max-w-7xl mx-auto px-4 pt-16">
        <h2 className="text-xl font-bold mb-5">Browse by Specialty</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {SPECIALTIES.map((spec) => {
            const count = jobs.filter((j) => j.specialty.includes(spec)).length;
            return (
              <Link
                key={spec}
                href={`/jobs?specialty=${encodeURIComponent(spec)}`}
                className="card p-4 flex flex-col items-center gap-2 text-center hover:border-[#0ea5e9] transition-colors group"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-2xl">{SPECIALTY_ICONS[spec] ?? '🔊'}</span>
                <span className="text-sm font-medium group-hover:text-[#0ea5e9] transition-colors text-[#e6edf3]">
                  {spec}
                </span>
                <span className="text-xs" style={{ color: '#8b949e' }}>{count} job{count !== 1 ? 's' : ''}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* WHY SONOJOB */}
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-8">
        <h2 className="text-xl font-bold text-center mb-10">Why SonoJob?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🎯',
              title: 'Specialty-Specific',
              body: "Every listing is for a sonographer. No filtering through nursing or radiology tech roles."
            },
            {
              icon: '🔐',
              title: 'Credential Matching',
              body: "Filter by RDMS, RVT, RDCS, and more. Find jobs that match exactly what you're registered for."
            },
            {
              icon: '💰',
              title: 'Salary Transparency',
              body: "Pay ranges required on every listing. No wasted applications on undisclosed compensation."
            },
          ].map((item) => (
            <div key={item.title} className="card p-6 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold mb-2 text-[#e6edf3]">{item.title}</h3>
              <p className="text-sm" style={{ color: '#8b949e' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EMPLOYER CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div
          className="card p-8 md:p-12 text-center"
          style={{ borderColor: 'rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.04)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Hiring a sonographer?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: '#8b949e' }}>
            Post to SonoJob and reach credentialed sonographers actively looking for their next role.
            Listings start at $99/month.
          </p>
          <Link href="/employers/post" className="btn-amber text-base px-7 py-3">
            Post a Job — $99/mo
          </Link>
        </div>
      </section>
    </div>
  );
}
