import { NextRequest, NextResponse } from 'next/server';

const ARDMS_URL = 'https://online.ardms.org/statusverification/';

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
};

function extractHidden(html: string, id: string): string {
  const match = html.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`, 'i'));
  return match?.[1] ?? '';
}

function parseCookies(header: string | null): string {
  if (!header) return '';
  return header
    .split(',')
    .map((c) => c.split(';')[0].trim())
    .join('; ');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, ardmsId } = body;

    if (!firstName || !lastName || !ardmsId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Step 1: GET the page to obtain ASP.NET hidden form tokens + session cookies
    const getRes = await fetch(ARDMS_URL, {
      headers: BROWSER_HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
    });

    if (!getRes.ok) {
      return NextResponse.json({ status: 'service_unavailable', canManualVerify: true });
    }

    const getHtml = await getRes.text();
    const viewState = extractHidden(getHtml, '__VIEWSTATE');
    const vsGenerator = extractHidden(getHtml, '__VIEWSTATEGENERATOR');
    const eventValidation = extractHidden(getHtml, '__EVENTVALIDATION');
    const cookies = parseCookies(getRes.headers.get('set-cookie'));

    if (!viewState) {
      return NextResponse.json({ status: 'service_unavailable', canManualVerify: true });
    }

    // Step 2: POST the search form with the ASP.NET tokens
    const formBody = new URLSearchParams({
      '__EVENTTARGET': '',
      '__EVENTARGUMENT': '',
      '__VIEWSTATE': viewState,
      '__VIEWSTATEGENERATOR': vsGenerator,
      '__EVENTVALIDATION': eventValidation,
      'txtLastName': lastName.trim(),
      'txtFirstName': firstName.trim(),
      'txtARDMSNo': ardmsId.trim(),
      'ddlCountry': 'ANY',
      'btnSearch': 'Search',
    });

    const postRes = await fetch(ARDMS_URL, {
      method: 'POST',
      headers: {
        ...BROWSER_HEADERS,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': ARDMS_URL,
        'Origin': 'https://online.ardms.org',
        ...(cookies ? { 'Cookie': cookies } : {}),
      },
      body: formBody.toString(),
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    });

    if (!postRes.ok) {
      return NextResponse.json({ status: 'service_unavailable', canManualVerify: true });
    }

    const html = await postRes.text();
    const lower = html.toLowerCase();

    // The results appear in <span id="lblResults">
    const resultsMatch = html.match(/<span[^>]*id="lblResults"[^>]*>([\s\S]*?)<\/span>/i);
    const resultsText = resultsMatch ? resultsMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    const resultsLower = resultsText.toLowerCase();

    // No match found
    if (
      resultsLower.includes('0 match') ||
      resultsLower.includes('no match') ||
      resultsLower.includes('not found') ||
      resultsLower.includes('no record') ||
      (resultsText.length > 0 && !resultsLower.includes('match found'))
    ) {
      return NextResponse.json({ verified: false, status: 'not_found' });
    }

    // Match found — extract "Valid Until: YYYY-MM-DD"
    if (resultsLower.includes('match found') || lower.includes('match found')) {
      const validUntilMatch = html.match(/[Vv]alid\s+[Uu]ntil[:\s]+(\d{4}-\d{2}-\d{2})/);
      const validUntil = validUntilMatch?.[1] ?? null;

      // Check if the credential is still active
      if (validUntil) {
        const expiry = new Date(validUntil);
        const now = new Date();
        if (expiry < now) {
          return NextResponse.json({ verified: false, status: 'inactive', validUntil });
        }
        return NextResponse.json({ verified: true, status: 'active', validUntil });
      }

      // "match found" but no expiry date — treat as active
      if (lower.includes('inactive') || lower.includes('expired') || lower.includes('lapsed') || lower.includes('revoked')) {
        return NextResponse.json({ verified: false, status: 'inactive' });
      }
      return NextResponse.json({ verified: true, status: 'active' });
    }

    // Could not determine status
    return NextResponse.json({ status: 'unknown', canManualVerify: true });

  } catch {
    return NextResponse.json({ status: 'service_unavailable', canManualVerify: true });
  }
}
