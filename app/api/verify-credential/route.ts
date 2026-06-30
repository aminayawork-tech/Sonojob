import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, ardmsId, credentialType } = body;

    if (!firstName || !lastName || !ardmsId || !credentialType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const params = new URLSearchParams({
      firstname: firstName.trim(),
      lastname: lastName.trim(),
      idnumber: ardmsId.trim(),
      credential: credentialType,
    });

    const res = await fetch(
      `https://online.ardms.org/statusverification/?${params}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Referer': 'https://online.ardms.org/statusverification/',
        },
        signal: AbortSignal.timeout(12000),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { status: 'service_unavailable', canManualVerify: true },
        { status: 200 }
      );
    }

    const html = await res.text();
    const lower = html.toLowerCase();

    if (
      lower.includes('no results') ||
      lower.includes('not found') ||
      lower.includes('no records') ||
      lower.includes('no matching')
    ) {
      return NextResponse.json({ verified: false, status: 'not_found' });
    }

    if (lower.includes('active')) {
      return NextResponse.json({ verified: true, status: 'active' });
    }

    if (
      lower.includes('inactive') ||
      lower.includes('expired') ||
      lower.includes('lapsed') ||
      lower.includes('suspended') ||
      lower.includes('revoked')
    ) {
      return NextResponse.json({ verified: false, status: 'inactive' });
    }

    // Could not parse status from the page
    return NextResponse.json({ status: 'unknown', canManualVerify: true });

  } catch {
    return NextResponse.json(
      { status: 'service_unavailable', canManualVerify: true },
      { status: 200 }
    );
  }
}
