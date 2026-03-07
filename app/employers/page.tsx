import Link from 'next/link';

const PLANS = [
  {
    name: 'Single Listing',
    price: '$99',
    period: '/month',
    features: [
      '1 active job listing',
      'Searchable by specialty & credential',
      'Candidate email alerts',
      'Mobile-optimized listing',
      '30-day listing duration',
    ],
    cta: 'Post One Job',
    highlighted: false,
  },
  {
    name: 'Team Plan',
    price: '$249',
    period: '/month',
    features: [
      'Up to 5 active listings',
      'Verified employer badge',
      'Priority placement in results',
      'Candidate management dashboard',
      'Featured homepage exposure',
      '60-day listing duration',
    ],
    cta: 'Start Team Plan',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited listings',
      'Dedicated account manager',
      'ATS integration support',
      'Bulk CSV import',
      'Branded employer profile page',
      'Analytics & reporting dashboard',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const STEPS = [
  { n: '01', title: 'Create Your Listing', body: 'Enter job details including specialty, credentials required, shift, pay range, and facility info. Our form is built specifically for sonography roles.' },
  { n: '02', title: 'Get Verified', body: 'Our team verifies employer legitimacy within 24 hours. Verified listings see 3× more qualified applications.' },
  { n: '03', title: 'Reach Sonographers', body: 'Your listing goes live on SonoJob and is sent to our subscriber list of credentialed sonographers actively job-seeking.' },
  { n: '04', title: 'Hire Great Talent', body: 'Review applicants, message candidates, and make your hire — all through the SonoJob dashboard.' },
];

export default function EmployersPage() {
  return (
    <div>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <div
          className="inline-flex items-center gap-2 badge mb-6"
          style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.75rem' }}
        >
          For Employers & Recruiters
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
          Hire credentialed sonographers <br className="hidden md:block" />
          <span style={{ color: '#f59e0b' }}>faster than any other board</span>
        </h1>
        <p className="text-lg text-[#8b949e] max-w-2xl mx-auto mb-10">
          SonoJob is the only job board built exclusively for ultrasound professionals.
          Every applicant is a sonographer — no irrelevant resumes, no noise.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/employers/post" className="btn-amber text-base px-7 py-3">
            Post a Job — Start at $99/mo
          </Link>
          <a href="mailto:hello@sonojob.com" className="btn-secondary text-base px-7 py-3">
            Talk to Sales
          </a>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y" style={{ borderColor: '#30363d', background: '#161b22' }}>
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '18,000+', label: 'Registered Sonographers' },
            { value: '72%', label: 'Are Actively Looking' },
            { value: '4.2 days', label: 'Avg. Time to First Apply' },
            { value: '94%', label: 'Credential Verified' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold" style={{ color: '#f59e0b' }}>{s.value}</div>
              <div className="text-sm mt-1" style={{ color: '#8b949e' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {STEPS.map((step) => (
            <div key={step.n} className="card p-6 flex gap-4">
              <div
                className="text-2xl font-bold flex-shrink-0 w-10"
                style={{ color: 'rgba(245,158,11,0.4)' }}
              >
                {step.n}
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-[#e6edf3]">{step.title}</h3>
                <p className="text-sm" style={{ color: '#8b949e' }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-5xl mx-auto px-4 py-8 pb-16">
        <h2 className="text-2xl font-bold text-center mb-3">Transparent Pricing</h2>
        <p className="text-center text-[#8b949e] mb-10 text-sm">No surprise fees. Cancel anytime.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="card p-6 flex flex-col"
              style={plan.highlighted ? { borderColor: '#f59e0b', background: 'rgba(245,158,11,0.04)' } : {}}
            >
              {plan.highlighted && (
                <div
                  className="badge mb-4 self-start"
                  style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}
                >
                  Most Popular
                </div>
              )}
              <div className="font-semibold text-lg mb-1 text-[#e6edf3]">{plan.name}</div>
              <div className="mb-5">
                <span className="text-3xl font-bold text-[#e6edf3]">{plan.price}</span>
                <span className="text-sm" style={{ color: '#8b949e' }}>{plan.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#8b949e' }}>
                    <span style={{ color: '#f59e0b' }} className="flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.name === 'Enterprise' ? 'mailto:hello@sonojob.com' : '/employers/post'}
                className={plan.highlighted ? 'btn-amber justify-center' : 'btn-secondary justify-center'}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <div className="card p-8 text-center" style={{ borderColor: 'rgba(14,165,233,0.2)' }}>
          <p className="text-lg mb-4" style={{ color: '#e6edf3' }}>
            "We posted on three general boards with zero qualified responses. Two days after posting on SonoJob, we had five RVT applicants. We hired within 10 days."
          </p>
          <div className="text-sm" style={{ color: '#8b949e' }}>
            — Imaging Director, Regional Vascular Center, Nashville TN
          </div>
        </div>
      </section>
    </div>
  );
}
