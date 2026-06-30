import Link from 'next/link';
import { jobs, SPECIALTIES } from '@/lib/jobs';
import JobCard from '@/components/JobCard';
import {
  AbdominalIcon, OBGYNIcon, VascularIcon, CardiacIcon, MSKIcon,
  BreastIcon, PediatricIcon, NeuroIcon, SmallPartsIcon,
  TargetIcon, CredentialIcon, SalaryIcon,
} from '@/components/Icons';
import type { ComponentType } from 'react';

type IconFC = ComponentType<{ size?: number; color?: string }>;

const SPECIALTY_ICONS: Record<string, IconFC> = {
  'Abdominal': AbdominalIcon,
  'OB/GYN': OBGYNIcon,
  'Vascular': VascularIcon,
  'Cardiac/Echo': CardiacIcon,
  'MSK': MSKIcon,
  'Breast': BreastIcon,
  'Pediatric': PediatricIcon,
  'Neurosonology': NeuroIcon,
  'Small Parts': SmallPartsIcon,
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
    <div>
      {/* HERO */}
      <section
        className="border-b"
        style={{ borderColor: '#e5e5e4', background: '#ffffff' }}
      >
        <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
          <div
            className="inline-flex items-center gap-2 badge mb-6"
            style={{ background: '#ebf5ec', color: '#3d9b4a', border: '1px solid #c2e5c4', fontSize: '0.75rem' }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#5cb167' }} />
            Built exclusively for the ultrasound community
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-5 text-[#1a1a18]">
            Find your next{' '}
            <span style={{ color: '#5cb167' }}>sonographer</span> job
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8" style={{ color: '#3d3d3b' }}>
            Search thousands of ultrasound positions by specialty, credential, and location.
            No generic job-board noise — only sonography roles.
          </p>

          {/* CTA split */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="/sonographers/verify" className="btn-primary text-base px-7 py-3">
              Verify My ARDMS Credentials
            </Link>
            <Link href="/jobs" className="btn-secondary text-base px-7 py-3">
              Browse All Jobs
            </Link>
          </div>

          {/* Search bar */}
          <form action="/jobs" method="GET" className="max-w-2xl mx-auto">
            <div
              className="flex gap-2 p-1.5 rounded-xl border shadow-sm"
              style={{ background: '#fff', borderColor: '#e4e4e3' }}
            >
              <input
                name="q"
                type="text"
                placeholder="Title, specialty, city, or employer…"
                className="flex-1 bg-transparent border-none text-[#1a1a18] text-sm px-3 py-2 outline-none"
                style={{ boxShadow: 'none', color: '#1a1a18' }}
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
                className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-[#5cb167] hover:text-[#5cb167]"
                style={{ borderColor: '#e4e4e3', color: '#9a9a98', textDecoration: 'none', background: '#fff' }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b" style={{ borderColor: '#e4e4e3', background: '#fff' }}>
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold" style={{ color: '#5cb167' }}>{s.value}</div>
              <div className="text-sm mt-1" style={{ color: '#9a9a98' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* URGENT */}
      {urgent.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pt-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#1a1a18] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: '#5cb167' }} />
              Urgent / Travel Openings
            </h2>
            <Link href="/jobs?employmentType=Travel%2FContract" className="text-sm font-medium" style={{ color: '#5cb167', textDecoration: 'none' }}>
              See all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urgent.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        </section>
      )}

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-4 pt-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#1a1a18]">Featured Jobs</h2>
          <Link href="/jobs" className="text-sm font-medium" style={{ color: '#5cb167', textDecoration: 'none' }}>
            View all jobs →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </section>

      {/* BROWSE BY SPECIALTY */}
      <section className="max-w-7xl mx-auto px-4 pt-14">
        <h2 className="text-xl font-bold mb-5 text-[#1a1a18]">Browse by Specialty</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {SPECIALTIES.map((spec) => {
            const count = jobs.filter((j) => j.specialty.includes(spec)).length;
            const Icon = SPECIALTY_ICONS[spec] ?? SmallPartsIcon;
            return (
              <Link
                key={spec}
                href={`/jobs?specialty=${encodeURIComponent(spec)}`}
                className="card p-4 flex flex-col items-center gap-2.5 text-center hover:border-[#5cb167] hover:shadow-sm transition-all group"
                style={{ textDecoration: 'none' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#ebf5ec' }}>
                  <Icon size={20} color="#3d9b4a" />
                </div>
                <span className="text-sm font-medium group-hover:text-[#5cb167] transition-colors text-[#1a1a18]">
                  {spec}
                </span>
                <span className="text-xs" style={{ color: '#9a9a98' }}>
                  {count} job{count !== 1 ? 's' : ''}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* WHY SONOJOB */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-8">
        <h2 className="text-xl font-bold text-center mb-10 text-[#1a1a18]">Why SonoJob?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { Icon: TargetIcon,    iconBg: '#ebf5ec', iconColor: '#3d9b4a', title: 'Specialty-Specific',    body: "Every listing is for a sonographer. No filtering through nursing or radiology tech roles." },
            { Icon: CredentialIcon, iconBg: '#f4f4f4', iconColor: '#3d3d3b', title: 'Credential Matching',   body: "Filter by RDMS, RVT, RDCS, and more. Find jobs that match exactly what you're registered for." },
            { Icon: SalaryIcon,    iconBg: '#d1fae5', iconColor: '#059669', title: 'Salary Transparency',   body: "Pay ranges required on every listing. No wasted applications on undisclosed compensation." },
          ].map((item) => (
            <div key={item.title} className="card p-6 text-center hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: item.iconBg }}>
                <item.Icon size={24} color={item.iconColor} />
              </div>
              <h3 className="font-semibold mb-2 text-[#1a1a18]">{item.title}</h3>
              <p className="text-sm" style={{ color: '#9a9a98' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EMPLOYER CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div
          className="rounded-2xl p-8 md:p-12 text-center border"
          style={{ borderColor: '#c2e5c4', background: 'linear-gradient(135deg, #ebf5ec 0%, #fff 100%)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#1a1a18]">
            Hiring a sonographer?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: '#3d3d3b' }}>
            Post to SonoJob and reach credentialed sonographers actively looking for their next role.
            Listings start at $99/month.
          </p>
          <Link href="/employers/post" className="btn-primary text-base px-7 py-3">
            Post a Job — $99/mo
          </Link>
        </div>
      </section>
    </div>
  );
}
