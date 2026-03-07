import { SPECIALTIES, CREDENTIALS, EQUIPMENT_BRANDS } from '@/lib/jobs';

export default function PostJobPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-1">Post a Job</h1>
      <p className="text-sm mb-8" style={{ color: '#8b949e' }}>
        Fill out the form below. All salary fields are required — we mandate pay transparency.
      </p>

      <form className="card p-6 flex flex-col gap-6">
        {/* Basic Info */}
        <section>
          <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: '#8b949e' }}>
            Basic Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1.5">Job Title *</label>
              <input type="text" placeholder="e.g. General Sonographer — OB/GYN & Abdominal" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Employer / Facility Name *</label>
              <input type="text" placeholder="Your organization name" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Facility Type *</label>
              <select>
                <option value="">Select…</option>
                {['Hospital', 'Outpatient', 'Mobile', 'VA/Military', 'Clinic'].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">City, State *</label>
              <input type="text" placeholder="e.g. Orlando, FL" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Employment Type *</label>
              <select>
                <option value="">Select…</option>
                {['Full-Time', 'Part-Time', 'PRN', 'Travel/Contract'].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <hr style={{ borderColor: '#30363d' }} />

        {/* Specialty & Credentials */}
        <section>
          <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: '#8b949e' }}>
            Specialty & Credentials
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5">Primary Specialty *</label>
              <select>
                <option value="">Select…</option>
                {SPECIALTIES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Additional Specialty</label>
              <select>
                <option value="">None / Select…</option>
                {SPECIALTIES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Required Credential *</label>
              <select>
                <option value="">Select…</option>
                {CREDENTIALS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Preferred Credential</label>
              <select>
                <option value="">None / Select…</option>
                {CREDENTIALS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Experience Required</label>
              <input type="text" placeholder="e.g. 2+ years post-registry" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Ultrasound Equipment / Brand</label>
              <select>
                <option value="">Select primary brand…</option>
                {EQUIPMENT_BRANDS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
        </section>

        <hr style={{ borderColor: '#30363d' }} />

        {/* Schedule & Pay */}
        <section>
          <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: '#8b949e' }}>
            Schedule & Compensation
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5">Shift *</label>
              <input type="text" placeholder="e.g. Days (Mon–Fri)" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Scan Volume</label>
              <input type="text" placeholder="e.g. 18–22 patients/day" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Pay Min ($/hr or $/yr) *</label>
              <input type="number" placeholder="38" min="0" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Pay Max *</label>
              <input type="number" placeholder="46" min="0" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Pay Unit *</label>
              <select>
                <option value="hr">Per Hour ($/hr)</option>
                <option value="yr">Per Year ($/yr)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Sign-On Bonus ($)</label>
              <input type="number" placeholder="Optional" min="0" />
            </div>
          </div>
        </section>

        <hr style={{ borderColor: '#30363d' }} />

        {/* Description */}
        <section>
          <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: '#8b949e' }}>
            Job Description
          </h2>
          <div>
            <label className="block text-xs font-medium mb-1.5">
              Full Description * <span style={{ color: '#8b949e' }}>(be specific — equipment, team size, culture)</span>
            </label>
            <textarea
              rows={6}
              placeholder="Describe the role, team, equipment, expectations, and what makes your opportunity stand out…"
              className="resize-y"
            />
          </div>
        </section>

        <hr style={{ borderColor: '#30363d' }} />

        {/* Contact */}
        <section>
          <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: '#8b949e' }}>
            Contact & Billing
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5">Contact Name *</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Contact Email *</label>
              <input type="email" placeholder="you@hospital.org" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1.5">Listing Plan *</label>
              <div className="grid sm:grid-cols-3 gap-3 mt-1">
                {[
                  { name: 'Single', price: '$99/mo', desc: '1 listing' },
                  { name: 'Team', price: '$249/mo', desc: 'Up to 5 listings', popular: true },
                  { name: 'Enterprise', price: 'Custom', desc: 'Unlimited' },
                ].map((p) => (
                  <label
                    key={p.name}
                    className="card p-3 cursor-pointer hover:border-[#f59e0b] transition-colors flex items-center gap-2"
                    style={p.popular ? { borderColor: 'rgba(245,158,11,0.4)' } : {}}
                  >
                    <input type="radio" name="plan" value={p.name.toLowerCase()} className="w-auto border-none bg-transparent p-0" />
                    <div>
                      <div className="text-sm font-medium text-[#e6edf3]">{p.name}</div>
                      <div className="text-xs" style={{ color: '#8b949e' }}>{p.price} · {p.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-amber text-base px-8 py-3">
            Submit Listing →
          </button>
          <p className="text-xs self-center" style={{ color: '#8b949e' }}>
            You will be redirected to payment after submission.
          </p>
        </div>
      </form>
    </div>
  );
}
