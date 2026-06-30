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

export default function SonographerVerifyPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('credentials');
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
  const [verified, setVerified] = useState(false);

  const set = (field: string, value: string | string[]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleSpecialty = (s: string) =>
    set('specialties', form.specialties.includes(s)
      ? form.specialties.filter((x) => x !== s)
      : [...form.specialties, s]);

  const intelosUrl = `https://online.ardms.org/statusverification/?firstname=${encodeURIComponent(form.firstName)}&lastname=${encodeURIComponent(form.lastName)}&idnumber=${encodeURIComponent(form.ardmsId)}&credential=${encodeURIComponent(form.credentialType)}`;

  const handleVerifyClick = () => {
    window.open(intelosUrl, '_blank', 'noopener,noreferrer');
    setVerified(true);
  };

  const handleComplete = () => {
    const profile = {
      ...form,
      ardmsVerified: verified,
      verifiedAt: verified ? new Date().toISOString() : null,
    };
    localStorage.setItem('sonojob_profile', JSON.stringify(profile));
    router.push('/jobs');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #dad6d0 60%, #ede9e3 100%)' }}
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
                background: step === s ? '#d25244' : (i < ['credentials','verify','profile'].indexOf(step) ? '#10b981' : '#c8c4be'),
                color: step === s || i < ['credentials','verify','profile'].indexOf(step) ? '#fff' : '#9a9a98',
              }}
            >
              {i < ['credentials', 'verify', 'profile'].indexOf(step) ? '✓' : i + 1}
            </div>
            <span className="text-xs hidden sm:block" style={{ color: step === s ? '#1a1a18' : '#9a9a98' }}>
              {s === 'credentials' ? 'Credentials' : s === 'verify' ? 'Verify' : 'Profile'}
            </span>
            {i < 2 && <div className="w-8 h-px" style={{ background: '#c8c4be' }} />}
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
                <p className="text-xs" style={{ color: '#9a9a98' }}>We'll verify these with Inteleos</p>
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
                onClick={() => setStep('verify')}
                style={{ opacity: (!form.firstName || !form.lastName || !form.ardmsId) ? 0.5 : 1 }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Verify on Inteleos */}
        {step === 'verify' && (
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#d1fae5' }}>
                <ShieldCheckIcon size={20} color="#059669" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-[#1a1a18]">Verify with Inteleos</h1>
                <p className="text-xs" style={{ color: '#9a9a98' }}>Confirm your credential is active</p>
              </div>
            </div>

            {/* Summary card */}
            <div className="rounded-lg p-4 mb-5" style={{ background: '#ede9e3', border: '1px solid #c8c4be' }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#9a9a98' }}>
                Verifying
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: '#9a9a98' }}>Name</span>
                  <span className="font-medium text-[#1a1a18]">{form.firstName} {form.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#9a9a98' }}>ID Number</span>
                  <span className="font-mono font-medium text-[#1a1a18]">{form.ardmsId}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#9a9a98' }}>Credential</span>
                  <span className="font-medium" style={{ color: '#d25244' }}>{form.credentialType}</span>
                </div>
              </div>
            </div>

            <p className="text-sm mb-5" style={{ color: '#3d3d3b' }}>
              Click below to open the official Inteleos verification page with your info pre-filled.
              Confirm your credential shows as <strong>Active</strong>, then return here.
            </p>

            {!verified ? (
              <button onClick={handleVerifyClick} className="btn-primary w-full justify-center py-3 mb-3">
                Open Inteleos Verification ↗
              </button>
            ) : (
              <div
                className="rounded-lg p-3 mb-4 flex items-center gap-2"
                style={{ background: '#d1fae5', border: '1px solid #6ee7b7' }}
              >
                <ShieldCheckIcon size={18} color="#059669" />
                <span className="text-sm font-medium" style={{ color: '#065f46' }}>
                  Inteleos window opened — credential confirmed by you
                </span>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => setStep('credentials')} className="btn-secondary flex-1 justify-center text-sm">
                ← Back
              </button>
              <button
                onClick={() => setStep('profile')}
                className="btn-primary flex-1 justify-center text-sm"
                style={{ opacity: !verified ? 0.5 : 1 }}
                disabled={!verified}
              >
                I've Verified →
              </button>
            </div>

            <p className="text-xs text-center mt-3" style={{ color: '#9a9a98' }}>
              Can't verify right now?{' '}
              <button
                className="underline"
                style={{ color: '#3d3d3b' }}
                onClick={() => { setVerified(false); setStep('profile'); }}
              >
                Skip — continue as unverified
              </button>
            </p>
          </div>
        )}

        {/* STEP 3: Profile Completion */}
        {step === 'profile' && (
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: verified ? '#d1fae5' : '#fae8e7' }}
              >
                <ShieldCheckIcon size={20} color={verified ? '#059669' : '#b03e33'} />
              </div>
              <div>
                <h1 className="font-bold text-lg text-[#1a1a18]">Complete Your Profile</h1>
                <p className="text-xs" style={{ color: verified ? '#059669' : '#b03e33' }}>
                  {verified ? 'Credential verified — now tell us your preferences' : 'Unverified — complete profile to search jobs'}
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
                          : { background: '#ede9e3', color: '#3d3d3b', border: '1px solid #c8c4be', textTransform: 'none', fontSize: '0.75rem', padding: '0.3rem 0.7rem' }
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
        SonoJob does not store your ARDMS ID on our servers. Verification is done directly
        via the official <a href="https://online.ardms.org/statusverification/" target="_blank" rel="noopener noreferrer" style={{ color: '#d25244' }}>Inteleos registry</a>.
      </p>
    </div>
  );
}
