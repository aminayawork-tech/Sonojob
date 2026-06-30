'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { ShieldCheckIcon, CredentialIcon } from '@/components/Icons';

const CREDENTIAL_TYPES = [
  { value: 'RDMS', label: 'RDMS — Registered Diagnostic Medical Sonographer' },
  { value: 'RDCS', label: 'RDCS — Registered Diagnostic Cardiac Sonographer' },
  { value: 'RVT', label: 'RVT — Registered Vascular Technologist' },
  { value: 'RPVI', label: 'RPVI — Registered Physician in Vascular Interpretation' },
  { value: 'RMSK', label: 'RMSK — Registered in Musculoskeletal' },
];

const SPECIALTIES = [
  'Abdominal', 'OB/GYN', 'Vascular', 'Cardiac/Echo',
  'MSK', 'Breast', 'Pediatric', 'Neurosonology', 'Small Parts',
];

type Step = 'credentials' | 'verify' | 'profile';
type VerifyStatus = 'loading' | 'active' | 'not_found' | 'inactive' | 'unavailable' | 'unknown';

export default function SonographerVerifyPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('credentials');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus | null>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    ardmsId: '',
    credentialType: 'RDMS',
    specialties: [] as string[],
    email: '',
    location: '',
    employmentPreference: '',
  });

  const set = (field: string, value: string | string[]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleSpecialty = (s: string) =>
    set('specialties', form.specialties.includes(s)
      ? form.specialties.filter((x) => x !== s)
      : [...form.specialties, s]);

  const handleCredentialSubmit = async () => {
    setStep('verify');
    setVerifyStatus('loading');

    try {
      const res = await fetch('/api/verify-credential', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          ardmsId: form.ardmsId,
          credentialType: form.credentialType,
        }),
      });
      const data = await res.json();

      if (data.verified) {
        setVerifyStatus('active');
      } else if (data.status === 'not_found') {
        setVerifyStatus('not_found');
      } else if (data.status === 'inactive') {
        setVerifyStatus('inactive');
      } else if (data.status === 'service_unavailable') {
        setVerifyStatus('unavailable');
      } else {
        setVerifyStatus('unknown');
      }
    } catch {
      setVerifyStatus('unavailable');
    }
  };

  const handleComplete = () => {
    const profile = {
      ...form,
      ardmsVerified: verifyStatus === 'active',
      verifiedAt: verifyStatus === 'active' ? new Date().toISOString() : null,
    };
    localStorage.setItem('sonojob_profile', JSON.stringify(profile));
    router.push('/jobs');
  };

  const intelosUrl = `https://online.ardms.org/statusverification/?firstname=${encodeURIComponent(form.firstName)}&lastname=${encodeURIComponent(form.lastName)}&idnumber=${encodeURIComponent(form.ardmsId)}&credential=${encodeURIComponent(form.credentialType)}`;

  const stepIndex = step === 'credentials' ? 0 : step === 'verify' ? 1 : 2;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: '#f5f5f4' }}
    >
      {/* Logo */}
      <div className="mb-8">
        <Logo size="lg" />
        <p className="text-center text-sm mt-1" style={{ color: '#9a9a98' }}>
          Your sonography career, verified.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {(['credentials', 'verify', 'profile'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: i === stepIndex ? '#d25244' : i < stepIndex ? '#10b981' : '#e4e4e3',
                color: i <= stepIndex ? '#fff' : '#9a9a98',
              }}
            >
              {i < stepIndex ? '✓' : i + 1}
            </div>
            <span className="text-xs hidden sm:block" style={{ color: i === stepIndex ? '#1a1a18' : '#9a9a98' }}>
              {s === 'credentials' ? 'Credentials' : s === 'verify' ? 'Verify' : 'Profile'}
            </span>
            {i < 2 && <div className="w-8 h-px" style={{ background: '#e4e4e3' }} />}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md">

        {/* STEP 1: Credential Entry */}
        {step === 'credentials' && (
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#fae8e7' }}>
                <CredentialIcon size={20} color="#b03e33" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-[#1a1a18]">Enter Your ARDMS Credentials</h1>
                <p className="text-xs" style={{ color: '#9a9a98' }}>We'll verify these directly with Inteleos</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">First Name *</label>
                  <input value={form.firstName} onChange={(e) => set('firstName', e.target.value)} placeholder="Maria" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">Last Name *</label>
                  <input value={form.lastName} onChange={(e) => set('lastName', e.target.value)} placeholder="Santos" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">ARDMS / Inteleos ID Number *</label>
                <input
                  value={form.ardmsId}
                  onChange={(e) => set('ardmsId', e.target.value)}
                  placeholder="e.g. 123456"
                  className="font-mono"
                />
                <p className="text-xs mt-1" style={{ color: '#9a9a98' }}>
                  Found on your ARDMS certificate or at myardms.ardms.org
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">Primary Credential *</label>
                <select value={form.credentialType} onChange={(e) => set('credentialType', e.target.value)}>
                  {CREDENTIAL_TYPES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <button
                className="btn-primary justify-center py-3 mt-2"
                disabled={!form.firstName || !form.lastName || !form.ardmsId}
                onClick={handleCredentialSubmit}
                style={{ opacity: (!form.firstName || !form.lastName || !form.ardmsId) ? 0.5 : 1 }}
              >
                Verify My Credential →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Backend Verification */}
        {step === 'verify' && (
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                background: verifyStatus === 'active' ? '#d1fae5' : verifyStatus === 'not_found' || verifyStatus === 'inactive' ? '#fae8e7' : '#f4f4f4'
              }}>
                {verifyStatus === 'loading' ? (
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#e4e4e3" strokeWidth="2" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#d25244" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : verifyStatus === 'active' ? (
                  <ShieldCheckIcon size={20} color="#059669" />
                ) : (
                  <ShieldCheckIcon size={20} color="#b03e33" />
                )}
              </div>
              <div>
                <h1 className="font-bold text-lg text-[#1a1a18]">
                  {verifyStatus === 'loading' ? 'Verifying with Inteleos…' :
                   verifyStatus === 'active' ? 'Credential Verified' :
                   verifyStatus === 'not_found' ? 'Credential Not Found' :
                   verifyStatus === 'inactive' ? 'Credential Not Active' :
                   'Verification Unavailable'}
                </h1>
                <p className="text-xs" style={{ color: '#9a9a98' }}>
                  {verifyStatus === 'loading' ? 'Checking the Inteleos registry…' :
                   verifyStatus === 'active' ? `${form.credentialType} for ${form.firstName} ${form.lastName} is Active` :
                   verifyStatus === 'not_found' ? 'No matching record in the registry' :
                   verifyStatus === 'inactive' ? 'Your credential is not currently active' :
                   'Could not reach the Inteleos registry right now'}
                </p>
              </div>
            </div>

            {/* Loading */}
            {verifyStatus === 'loading' && (
              <div className="py-8 flex flex-col items-center gap-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: '#d25244', animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <p className="text-sm" style={{ color: '#9a9a98' }}>
                  Querying the official Inteleos registry…
                </p>
              </div>
            )}

            {/* Active — success */}
            {verifyStatus === 'active' && (
              <>
                <div className="rounded-lg p-4 mb-5 flex items-start gap-3" style={{ background: '#d1fae5', border: '1px solid #6ee7b7' }}>
                  <ShieldCheckIcon size={18} color="#059669" />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#065f46' }}>
                      {form.credentialType} confirmed as Active
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: '#059669' }}>
                      Verified directly with the Inteleos registry
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep('profile')} className="btn-primary w-full justify-center py-3">
                  Continue to Profile →
                </button>
              </>
            )}

            {/* Not found */}
            {verifyStatus === 'not_found' && (
              <>
                <div className="rounded-lg p-4 mb-5" style={{ background: '#fae8e7', border: '1px solid #f0c0bb' }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: '#b03e33' }}>
                    No matching record found
                  </div>
                  <p className="text-xs" style={{ color: '#9a9a98' }}>
                    Please check that your name, ID number, and credential type exactly match your ARDMS certificate.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setStep('credentials'); setVerifyStatus(null); }} className="btn-secondary flex-1 justify-center text-sm">
                    ← Fix Info
                  </button>
                  <button onClick={() => setStep('profile')} className="btn-secondary flex-1 justify-center text-sm">
                    Continue Unverified
                  </button>
                </div>
              </>
            )}

            {/* Inactive */}
            {verifyStatus === 'inactive' && (
              <>
                <div className="rounded-lg p-4 mb-5" style={{ background: '#fae8e7', border: '1px solid #f0c0bb' }}>
                  <div className="text-sm font-semibold mb-1" style={{ color: '#b03e33' }}>
                    Credential is not currently active
                  </div>
                  <p className="text-xs" style={{ color: '#9a9a98' }}>
                    Your {form.credentialType} may be expired, lapsed, or suspended. Visit{' '}
                    <a href="https://www.ardms.org" target="_blank" rel="noopener noreferrer" style={{ color: '#d25244' }}>ardms.org</a>{' '}
                    to renew your credential.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setStep('credentials'); setVerifyStatus(null); }} className="btn-secondary flex-1 justify-center text-sm">
                    ← Back
                  </button>
                  <button onClick={() => setStep('profile')} className="btn-secondary flex-1 justify-center text-sm">
                    Continue Unverified
                  </button>
                </div>
              </>
            )}

            {/* Unavailable / unknown — offer manual fallback */}
            {(verifyStatus === 'unavailable' || verifyStatus === 'unknown') && (
              <>
                <div className="rounded-lg p-4 mb-5" style={{ background: '#f4f4f4', border: '1px solid #e4e4e3' }}>
                  <div className="text-sm font-semibold mb-1 text-[#1a1a18]">
                    Automatic verification unavailable
                  </div>
                  <p className="text-xs mb-3" style={{ color: '#9a9a98' }}>
                    We couldn't reach the Inteleos registry. You can verify manually or continue without verification.
                  </p>
                  <a
                    href={intelosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium underline"
                    style={{ color: '#d25244' }}
                  >
                    Open Inteleos Verification ↗
                  </a>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleCredentialSubmit} className="btn-secondary flex-1 justify-center text-sm">
                    Retry
                  </button>
                  <button onClick={() => setStep('profile')} className="btn-primary flex-1 justify-center text-sm">
                    Continue →
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 3: Profile Completion */}
        {step === 'profile' && (
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: verifyStatus === 'active' ? '#d1fae5' : '#fae8e7' }}
              >
                <ShieldCheckIcon size={20} color={verifyStatus === 'active' ? '#059669' : '#b03e33'} />
              </div>
              <div>
                <h1 className="font-bold text-lg text-[#1a1a18]">Complete Your Profile</h1>
                <p className="text-xs" style={{ color: verifyStatus === 'active' ? '#059669' : '#b03e33' }}>
                  {verifyStatus === 'active' ? 'Credential verified — now tell us your preferences' : 'Unverified — complete profile to search jobs'}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">Email *</label>
                <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">City, State</label>
                <input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Orlando, FL" />
              </div>

              <div>
                <label className="block text-xs font-medium mb-2 text-[#1a1a18]">Specialties (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSpecialty(s)}
                      className="badge transition-all"
                      style={
                        form.specialties.includes(s)
                          ? { background: '#fae8e7', color: '#b03e33', border: '1px solid #d25244', textTransform: 'none', fontSize: '0.75rem', padding: '0.3rem 0.7rem' }
                          : { background: '#f4f4f4', color: '#3d3d3b', border: '1px solid #e4e4e3', textTransform: 'none', fontSize: '0.75rem', padding: '0.3rem 0.7rem' }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-[#1a1a18]">Looking for</label>
                <select value={form.employmentPreference} onChange={(e) => set('employmentPreference', e.target.value)}>
                  <option value="">Any type</option>
                  <option value="Full-Time">Full-Time permanent</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="PRN">PRN / per diem</option>
                  <option value="Travel/Contract">Travel / contract</option>
                </select>
              </div>

              <button
                className="btn-primary justify-center py-3 mt-2"
                disabled={!form.email}
                onClick={handleComplete}
                style={{ opacity: !form.email ? 0.5 : 1 }}
              >
                Find My Jobs →
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs mt-6 text-center max-w-sm" style={{ color: '#9a9a98' }}>
        Verification is performed directly against the official{' '}
        <a href="https://online.ardms.org/statusverification/" target="_blank" rel="noopener noreferrer" style={{ color: '#d25244' }}>
          Inteleos registry
        </a>
        . Your ARDMS ID is not stored on SonoJob servers.
      </p>
    </div>
  );
}
