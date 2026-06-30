import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get('q') || '';
  const state = searchParams.get('state') || '';

  const apiKey = process.env.USAJOBS_API_KEY;
  const email = process.env.USAJOBS_USER_AGENT;
  if (!apiKey || !email) {
    return NextResponse.json({ error: 'USAJOBS credentials not configured' }, { status: 500 });
  }

  const params = new URLSearchParams({
    Keyword: `sonographer${q ? ` ${q}` : ''}`,
    ResultsPerPage: '50',
    DatePosted: '30',
  });
  if (state) params.set('LocationName', state);

  const res = await fetch(`https://data.usajobs.gov/api/search?${params}`, {
    headers: {
      'Authorization-Key': apiKey,
      'User-Agent': email,
      Host: 'data.usajobs.gov',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'USAJOBS fetch failed', status: res.status }, { status: 502 });
  }

  const json = await res.json();
  return NextResponse.json({ data: json?.SearchResult?.SearchResultItems ?? [] });
}
