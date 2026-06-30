import { NextRequest, NextResponse } from 'next/server';

export type AggregatedJob = {
  id: string;
  title: string;
  employer: string;
  location: string;
  state: string;
  employmentType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryUnit: string | null;
  description: string;
  applyUrl: string;
  postedAt: string;
  source: 'jsearch' | 'usajobs' | 'native';
  specialty: string[];
  credentialsRequired: string[];
  remote: boolean;
  featured: boolean;
};

function inferSpecialty(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const found: string[] = [];
  if (text.match(/\bob\/gyn\b|obstetric|gynecol/)) found.push('OB/GYN');
  if (text.match(/vascula|rvt|duplex|carotid|venous|arterial/)) found.push('Vascular');
  if (text.match(/cardiac|echo|echocard|rdcs/)) found.push('Cardiac/Echo');
  if (text.match(/musculoskeletal|msk|rmsk|joint|tendon/)) found.push('MSK');
  if (text.match(/breast|mammograph/)) found.push('Breast');
  if (text.match(/pediatric|neonatal|infant|children/)) found.push('Pediatric');
  if (text.match(/neuro|cranial|transcranial/)) found.push('Neurosonology');
  if (text.match(/abdomin|ab\b|general sono/)) found.push('Abdominal');
  return found.length > 0 ? found : ['General'];
}

function inferCredentials(title: string, description: string): string[] {
  const text = `${title} ${description}`.toUpperCase();
  const creds: string[] = [];
  if (text.includes('RDMS')) creds.push('RDMS');
  if (text.includes('RVT')) creds.push('RVT');
  if (text.includes('RDCS')) creds.push('RDCS');
  if (text.includes('RPVI')) creds.push('RPVI');
  if (text.includes('RMSK')) creds.push('RMSK');
  if (text.includes('ARDMS')) creds.push('ARDMS');
  return creds;
}

function extractState(location: string): string {
  const stateMatch = location.match(/,\s*([A-Z]{2})(?:\s|$|,)/);
  return stateMatch ? stateMatch[1] : '';
}

async function fetchJSearch(query: string, location: string, page: number = 1): Promise<AggregatedJob[]> {
  const apiKey = process.env.JSEARCH_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    query: `${query} ${location}`.trim(),
    page: String(page),
    num_pages: '1',
    date_posted: 'month',
  });

  const res = await fetch(`https://jsearch.p.rapidapi.com/search?${params}`, {
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  const data = await res.json();

  return (data.data ?? []).map((j: Record<string, unknown>) => {
    const title = String(j.job_title ?? '');
    const desc = String(j.job_description ?? '');
    return {
      id: `jsearch-${j.job_id}`,
      title,
      employer: String(j.employer_name ?? ''),
      location: String(j.job_city ? `${j.job_city}, ${j.job_state}` : j.job_location ?? ''),
      state: String(j.job_state ?? extractState(String(j.job_location ?? ''))),
      employmentType: String(j.job_employment_type ?? 'Full-Time'),
      salaryMin: (j.job_min_salary as number) ?? null,
      salaryMax: (j.job_max_salary as number) ?? null,
      salaryUnit: (j.job_salary_period as string) ?? null,
      description: desc.slice(0, 800),
      applyUrl: String(j.job_apply_link ?? j.job_google_link ?? ''),
      postedAt: String(j.job_posted_at_datetime_utc ?? new Date().toISOString()),
      source: 'jsearch' as const,
      specialty: inferSpecialty(title, desc),
      credentialsRequired: inferCredentials(title, desc),
      remote: Boolean(j.job_is_remote),
      featured: false,
    };
  });
}

async function fetchUSAJobs(query: string, locationName: string): Promise<AggregatedJob[]> {
  const apiKey = process.env.USAJOBS_API_KEY;
  const email = process.env.USAJOBS_USER_AGENT ?? 'hello@sonojob.com';
  if (!apiKey) return [];

  const params = new URLSearchParams({
    Keyword: query,
    ...(locationName ? { LocationName: locationName } : {}),
    ResultsPerPage: '25',
    Fields: 'Min',
  });

  const res = await fetch(`https://data.usajobs.gov/api/search?${params}`, {
    headers: {
      'Authorization-Key': apiKey,
      'User-Agent': email,
      Host: 'data.usajobs.gov',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  const data = await res.json();

  const items = data?.SearchResult?.SearchResultItems ?? [];
  return items.map((item: Record<string, unknown>) => {
    const ann = item.MatchedObjectDescriptor as Record<string, unknown>;
    const title = String(ann?.PositionTitle ?? '');
    const desc = String(ann?.UserArea?.Details?.JobSummary ?? '');
    const loc = (ann?.PositionLocation as Array<Record<string, string>>)?.[0];
    const pay = ann?.PositionRemuneration as Array<Record<string, string>>;

    return {
      id: `usajobs-${ann?.PositionID}`,
      title,
      employer: String(ann?.OrganizationName ?? 'US Federal Government'),
      location: loc ? `${loc.CityName}, ${loc.CountrySubDivisionCode}` : 'USA',
      state: loc?.CountrySubDivisionCode ?? '',
      employmentType: 'Full-Time',
      salaryMin: pay?.[0]?.MinimumRange ? parseFloat(pay[0].MinimumRange) : null,
      salaryMax: pay?.[0]?.MaximumRange ? parseFloat(pay[0].MaximumRange) : null,
      salaryUnit: pay?.[0]?.RateIntervalCode === 'PA' ? 'yr' : 'hr',
      description: desc.slice(0, 800),
      applyUrl: String(ann?.PositionURI ?? ''),
      postedAt: String(ann?.PublicationStartDate ?? new Date().toISOString()),
      source: 'usajobs' as const,
      specialty: inferSpecialty(title, desc),
      credentialsRequired: inferCredentials(title, desc),
      remote: false,
      featured: false,
    };
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get('q') || 'sonographer';
  const location = searchParams.get('location') || '';
  const specialty = searchParams.get('specialty') || '';

  const searchQuery = specialty
    ? `${specialty} sonographer`
    : query || 'diagnostic medical sonographer ultrasound technologist';

  const [jsearchJobs, usaJobs] = await Promise.allSettled([
    fetchJSearch(searchQuery, location),
    fetchUSAJobs(searchQuery, location),
  ]);

  const all: AggregatedJob[] = [
    ...(jsearchJobs.status === 'fulfilled' ? jsearchJobs.value : []),
    ...(usaJobs.status === 'fulfilled' ? usaJobs.value : []),
  ];

  // Deduplicate by employer+title+location
  const seen = new Set<string>();
  const deduped = all.filter((j) => {
    const key = `${j.employer.toLowerCase()}-${j.title.toLowerCase()}-${j.state}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return NextResponse.json({ jobs: deduped, total: deduped.length });
}
