import { Job, jobs as staticJobs, SPECIALTIES, CREDENTIALS, EQUIPMENT_BRANDS } from './jobs';

// ── Text inference helpers ────────────────────────────────────────────────────

function detectSpecialties(text: string): Job['specialty'] {
  const t = text.toLowerCase();
  const found: string[] = [];
  if (/\b(ob\/gyn|ob\b|obstetric|gynecolog|obgyn)\b/.test(t)) found.push('OB/GYN');
  if (/\babdominal\b/.test(t)) found.push('Abdominal');
  if (/\b(vascular|rvt|carotid|duplex)\b/.test(t)) found.push('Vascular');
  if (/\b(cardiac|echo|echocardiograph|rdcs)\b/.test(t)) found.push('Cardiac/Echo');
  if (/\b(msk|musculoskeletal|rmsk)\b/.test(t)) found.push('MSK');
  if (/\b(breast)\b/.test(t)) found.push('Breast');
  if (/\b(pediatric|neonatal)\b/.test(t)) found.push('Pediatric');
  if (/\b(neuro|cranial|transcranial)\b/.test(t)) found.push('Neurosonology');
  if (/\bsmall parts\b/.test(t)) found.push('Small Parts');
  return found.length > 0 ? found : ['Abdominal'];
}

function detectCredentials(text: string): string[] {
  const t = text.toUpperCase();
  return CREDENTIALS.filter((c) => t.includes(c.replace(/[()]/g, '')));
}

function detectEquipment(text: string): string[] {
  const t = text.toLowerCase();
  return EQUIPMENT_BRANDS.filter((b) => t.includes(b.toLowerCase()));
}

function detectFacilityType(text: string, orgName = ''): Job['facilityType'] {
  const combined = `${text} ${orgName}`.toLowerCase();
  if (/\b(va\b|veteran|military|navy|army|air force|dod|federal)\b/.test(combined)) return 'VA/Military';
  if (/\bhospital\b/.test(combined)) return 'Hospital';
  if (/\boutpatient|imaging center\b/.test(combined)) return 'Outpatient';
  if (/\bmobile|portable\b/.test(combined)) return 'Mobile';
  return 'Clinic';
}

function mapEmploymentType(raw: string): Job['employmentType'] {
  const r = raw.toUpperCase();
  if (r.includes('FULLTIME') || r.includes('FULL-TIME') || r.includes('FULL TIME')) return 'Full-Time';
  if (r.includes('PART')) return 'Part-Time';
  if (r.includes('CONTRACTOR') || r.includes('CONTRACT') || r.includes('TRAVEL')) return 'Travel/Contract';
  if (r.includes('INTERMITTENT') || r.includes('PRN')) return 'PRN';
  return 'Full-Time';
}

function daysSince(dateInput: number | string): number {
  const ms = typeof dateInput === 'number'
    ? dateInput * 1000
    : new Date(dateInput).getTime();
  return Math.max(0, Math.round((Date.now() - ms) / 86_400_000));
}

// ── JSearch types & normalizer ────────────────────────────────────────────────

interface JSearchJob {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_employment_type: string;
  job_city: string;
  job_state: string;
  job_is_remote: boolean;
  job_description: string;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_period: string | null;
  job_posted_at_timestamp: number;
  job_apply_link?: string;
  job_google_link?: string;
  job_highlights?: { Qualifications?: string[]; Benefits?: string[] };
}

export function normalizeJSearchJob(j: JSearchJob): Job {
  const desc = j.job_description ?? '';
  const salaryPeriod = (j.job_salary_period ?? '').toUpperCase();
  const isHourly = salaryPeriod === 'HOUR';
  const rawMin = j.job_min_salary ?? 0;
  const rawMax = j.job_max_salary ?? 0;
  // Convert annual to hourly for display consistency
  const salaryMin = !isHourly && rawMin > 1000 ? Math.round(rawMin / 2080) : rawMin;
  const salaryMax = !isHourly && rawMax > 1000 ? Math.round(rawMax / 2080) : rawMax;

  return {
    id: `jsearch-${j.job_id}`,
    title: j.job_title,
    employer: j.employer_name,
    employerVerified: false,
    location: [j.job_city, j.job_state].filter(Boolean).join(', '),
    state: j.job_state ?? '',
    remote: j.job_is_remote ?? false,
    specialty: detectSpecialties(`${j.job_title} ${desc}`),
    employmentType: mapEmploymentType(j.job_employment_type),
    shift: 'See posting',
    onCall: /on.?call/i.test(desc),
    salaryMin,
    salaryMax,
    salaryUnit: 'hr',
    credentialsRequired: detectCredentials(desc),
    credentialsPreferred: [],
    experience: '',
    equipment: detectEquipment(desc),
    facilityType: detectFacilityType(desc, j.employer_name),
    scanVolume: 'See posting',
    postedDays: daysSince(j.job_posted_at_timestamp),
    featured: false,
    urgent: daysSince(j.job_posted_at_timestamp) <= 2,
    description: desc.slice(0, 1200),
    benefits: j.job_highlights?.Benefits ?? [],
    teamSize: 'See posting',
  };
}

// ── USAJOBS types & normalizer ────────────────────────────────────────────────

interface UsaLocation { StateCode?: string; CountrySubDivisionCode?: string; CityName?: string; LocationName?: string; }
interface UsaRemuneration { MinimumRange: string; MaximumRange: string; RateIntervalCode: string; }
interface UsaDescriptor {
  PositionID: string;
  PositionTitle: string;
  OrganizationName: string;
  DepartmentName?: string;
  PositionLocationDisplay: string;
  PositionLocation?: UsaLocation[];
  PositionRemuneration?: UsaRemuneration[];
  PositionOfferingType?: Array<{ Name: string }>;
  PositionSchedule?: Array<{ Name: string }>;
  QualificationSummary?: string;
  PublicationStartDate: string;
  PositionURI?: string;
  UserArea?: { Details?: { MissionCriticalOccupation?: string } };
}

export interface UsaJobsItem {
  MatchedObjectId: string;
  MatchedObjectDescriptor: UsaDescriptor;
}

export function normalizeUsaJob(item: UsaJobsItem): Job {
  const d = item.MatchedObjectDescriptor;
  const remun = d.PositionRemuneration?.[0];
  const rateCode = (remun?.RateIntervalCode ?? '').toLowerCase();
  const isHourly = rateCode.includes('hour');
  const rawMin = parseFloat(remun?.MinimumRange ?? '0');
  const rawMax = parseFloat(remun?.MaximumRange ?? '0');
  const salaryMin = !isHourly && rawMin > 1000 ? Math.round(rawMin / 2080) : rawMin;
  const salaryMax = !isHourly && rawMax > 1000 ? Math.round(rawMax / 2080) : rawMax;

  const loc = d.PositionLocation?.[0];
  const state = loc?.StateCode ?? loc?.CountrySubDivisionCode ?? '';
  const city = loc?.CityName ?? '';
  const location = d.PositionLocationDisplay ?? (city && state ? `${city}, ${state}` : state);
  const desc = d.QualificationSummary ?? '';
  const orgName = d.OrganizationName ?? d.DepartmentName ?? 'US Federal Government';
  const isMissionCritical = d.UserArea?.Details?.MissionCriticalOccupation === 'True';
  const posted = daysSince(d.PublicationStartDate);

  return {
    id: `usajobs-${d.PositionID}`,
    title: d.PositionTitle,
    employer: orgName,
    employerVerified: true,
    location,
    state,
    remote: /remote/i.test(location + d.PositionTitle),
    specialty: detectSpecialties(`${d.PositionTitle} ${desc}`),
    employmentType: mapEmploymentType(d.PositionOfferingType?.[0]?.Name ?? ''),
    shift: d.PositionSchedule?.[0]?.Name ?? 'Days',
    onCall: /on.?call/i.test(desc),
    salaryMin,
    salaryMax,
    salaryUnit: 'hr',
    credentialsRequired: detectCredentials(desc),
    credentialsPreferred: [],
    experience: '',
    equipment: detectEquipment(desc),
    facilityType: detectFacilityType(desc, orgName),
    scanVolume: 'See posting',
    postedDays: posted,
    featured: false,
    urgent: isMissionCritical || posted <= 1,
    description: desc.slice(0, 1200),
    benefits: [],
    teamSize: 'See posting',
  };
}

// ── Deduplication ─────────────────────────────────────────────────────────────

function dedupeKey(job: Job) {
  return `${job.title.toLowerCase().trim()}|${job.employer.toLowerCase().trim()}`;
}

// ── Main fetch orchestrator ───────────────────────────────────────────────────

export type FetchJobsParams = {
  query?: string;
  state?: string;
  employmentType?: string;
  facilityType?: string;
  specialty?: string;
  credential?: string;
};

export async function fetchLiveJobs(params: FetchJobsParams): Promise<Job[]> {
  const jsearchKey = process.env.JSEARCH_API_KEY;
  const usajobsKey = process.env.USAJOBS_API_KEY;
  const usajobsEmail = process.env.USAJOBS_USER_AGENT;

  const liveJobs: Job[] = [];

  // ── JSearch ──
  if (jsearchKey) {
    try {
      const empTypeMap: Record<string, string> = {
        'Full-Time': 'FULLTIME', 'Part-Time': 'PARTTIME', 'Travel/Contract': 'CONTRACTOR',
      };
      const qp = new URLSearchParams({
        query: `${params.query ?? ''} sonographer`.trim(),
        date_posted: 'month',
        num_pages: '3',
      });
      if (params.state) qp.set('location', params.state);
      if (params.employmentType && empTypeMap[params.employmentType]) {
        qp.set('employment_types', empTypeMap[params.employmentType]);
      }
      const res = await fetch(`https://jsearch.p.rapidapi.com/search?${qp}`, {
        headers: { 'X-RapidAPI-Key': jsearchKey, 'X-RapidAPI-Host': 'jsearch.p.rapidapi.com' },
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const json = await res.json();
        (json.data as JSearchJob[] ?? []).forEach((j) => liveJobs.push(normalizeJSearchJob(j)));
      }
    } catch { /* non-fatal — fall through to static data */ }
  }

  // ── USAJOBS ──
  if (usajobsKey && usajobsEmail) {
    try {
      const qp = new URLSearchParams({
        Keyword: `sonographer${params.query ? ` ${params.query}` : ''}`,
        ResultsPerPage: '50',
        DatePosted: '30',
      });
      if (params.state) qp.set('LocationName', params.state);
      const res = await fetch(`https://data.usajobs.gov/api/search?${qp}`, {
        headers: {
          'Authorization-Key': usajobsKey,
          'User-Agent': usajobsEmail,
          Host: 'data.usajobs.gov',
        },
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const json = await res.json();
        const items: UsaJobsItem[] = json?.SearchResult?.SearchResultItems ?? [];
        items.forEach((item) => liveJobs.push(normalizeUsaJob(item)));
      }
    } catch { /* non-fatal */ }
  }

  // Merge static (native/employer-direct) + live
  const all = [...staticJobs, ...liveJobs];

  // Deduplicate
  const seen = new Set<string>();
  const deduped = all.filter((job) => {
    const key = dedupeKey(job);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Post-fetch filters (can't be passed to external APIs)
  return deduped.filter((job) => {
    if (params.specialty && !job.specialty.includes(params.specialty)) return false;
    if (params.credential && !job.credentialsRequired.some((c) => c.includes(params.credential!))) return false;
    if (params.facilityType && job.facilityType !== params.facilityType) return false;
    return true;
  });
}

// ── Single job fetch for detail page ─────────────────────────────────────────

export async function fetchJobById(id: string): Promise<Job | undefined> {
  const jsearchKey = process.env.JSEARCH_API_KEY;
  const usajobsKey = process.env.USAJOBS_API_KEY;
  const usajobsEmail = process.env.USAJOBS_USER_AGENT;

  if (id.startsWith('jsearch-') && jsearchKey) {
    const jobId = id.replace('jsearch-', '');
    try {
      const res = await fetch(
        `https://jsearch.p.rapidapi.com/job-details?job_id=${encodeURIComponent(jobId)}&extended_publisher_details=false`,
        {
          headers: { 'X-RapidAPI-Key': jsearchKey, 'X-RapidAPI-Host': 'jsearch.p.rapidapi.com' },
          next: { revalidate: 3600 },
        }
      );
      if (res.ok) {
        const json = await res.json();
        const j = json.data?.[0] as JSearchJob | undefined;
        return j ? normalizeJSearchJob(j) : undefined;
      }
    } catch { return undefined; }
  }

  if (id.startsWith('usajobs-') && usajobsKey && usajobsEmail) {
    const positionId = id.replace('usajobs-', '');
    try {
      const res = await fetch(
        `https://data.usajobs.gov/api/search?PositionID=${encodeURIComponent(positionId)}`,
        {
          headers: {
            'Authorization-Key': usajobsKey,
            'User-Agent': usajobsEmail,
            Host: 'data.usajobs.gov',
          },
          next: { revalidate: 3600 },
        }
      );
      if (res.ok) {
        const json = await res.json();
        const item = json?.SearchResult?.SearchResultItems?.[0] as UsaJobsItem | undefined;
        return item ? normalizeUsaJob(item) : undefined;
      }
    } catch { return undefined; }
  }

  return undefined;
}
