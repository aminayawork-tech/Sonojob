import { NextRequest, NextResponse } from 'next/server';

// Client-side proxy for JSearch — keeps the API key server-only.
// Server Components should use lib/fetchJobs.ts directly instead.

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get('q') || 'sonographer';
  const location = searchParams.get('location') || '';
  const employmentType = searchParams.get('employmentType') || '';

  const apiKey = process.env.JSEARCH_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'JSearch API key not configured' }, { status: 500 });
  }

  const empTypeMap: Record<string, string> = {
    'Full-Time': 'FULLTIME', 'Part-Time': 'PARTTIME', 'Travel/Contract': 'CONTRACTOR',
  };

  const params = new URLSearchParams({
    query: `${q} sonographer`.trim(),
    date_posted: 'month',
    num_pages: '2',
  });
  if (location) params.set('location', location);
  if (employmentType && empTypeMap[employmentType]) {
    params.set('employment_types', empTypeMap[employmentType]);
  }

  const res = await fetch(`https://jsearch.p.rapidapi.com/search?${params}`, {
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'JSearch fetch failed' }, { status: 502 });
  }

  const json = await res.json();
  return NextResponse.json({ data: json.data ?? [] });
}
