import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">About SonoJob</h1>
      <p className="text-[#8b949e] mb-8 text-lg leading-relaxed">
        SonoJob exists because sonographers deserve a job board built for them — not
        adapted from a generic template that treats ultrasound as a subcategory of
        "Allied Health."
      </p>

      <div className="space-y-8 text-[#8b949e] text-sm leading-relaxed">
        <div>
          <h2 className="text-[#e6edf3] font-semibold text-base mb-2">Why we built this</h2>
          <p>
            After years of watching sonographers wade through thousands of irrelevant postings
            on Indeed and LinkedIn — nursing roles, medical assistant jobs, radiology tech
            positions that got tagged "ultrasound" — we decided to build something purpose-built.
            Every listing on SonoJob is a sonographer role. Every filter maps to how sonographers
            actually search for work: by credential, specialty, scan volume, equipment brand, and
            call requirements.
          </p>
        </div>

        <div>
          <h2 className="text-[#e6edf3] font-semibold text-base mb-2">Pay transparency</h2>
          <p>
            We require pay ranges on every listing. Full stop. Sonographers should not have to
            waste an application, a phone screen, and half a day of PTO to find out a job pays
            $28/hr. If an employer won't post salary, they don't post here.
          </p>
        </div>

        <div>
          <h2 className="text-[#e6edf3] font-semibold text-base mb-2">Credential matching</h2>
          <p>
            We built our search around ARDMS, CCI, and ARRT credential designations so
            you can filter by exactly what you hold — RDMS (AB), RVT, RDCS (AE), RMSKS —
            and see only the jobs you're qualified for today.
          </p>
        </div>

        <div>
          <h2 className="text-[#e6edf3] font-semibold text-base mb-2">Contact</h2>
          <p>
            Questions, partnership inquiries, or feedback:{' '}
            <a href="mailto:hello@sonojob.com" style={{ color: '#0ea5e9' }}>hello@sonojob.com</a>
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-10">
        <Link href="/jobs" className="btn-primary">Browse Jobs</Link>
        <Link href="/employers" className="btn-secondary">Post a Job</Link>
      </div>
    </div>
  );
}
