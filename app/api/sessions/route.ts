import { NextResponse } from 'next/server';

interface Session {
  connected: boolean;
  user: string;
  jid: string;
  healthy: boolean;
}

interface SessionsResponse {
  total: number;
  healthy: number;
  sessions: Record<string, Session>;
}

async function fetchApiSessions(apiUrl: string, index: number): Promise<{ server: string; count: number }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${apiUrl}/sessions`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (response.ok) {
      const data: SessionsResponse = await response.json();
      const count = data.total || 0;
      return { server: `server_${index}`, count };
    }
    return { server: `server_${index}`, count: 0 };
  } catch {
    return { server: `server_${index}`, count: 0 };
  }
}

export async function GET() {
  const apiPromises: Promise<{ server: string; count: number }>[] = [];
  let hasConfiguredApis = false;

  for (let i = 1; i <= 10; i++) {
    const apiUrl = process.env[`API_${i}`];
    if (apiUrl) {
      hasConfiguredApis = true;
      apiPromises.push(fetchApiSessions(apiUrl, i));
    }
  }

  if (!hasConfiguredApis) {
    const legacyApiUrl = process.env.NEXT_PUBLIC_API;
    if (legacyApiUrl) {
      apiPromises.push(fetchApiSessions(legacyApiUrl, 0).then(r => ({ ...r, server: 'legacy' })));
    }
  }

  const results = await Promise.all(apiPromises);
  
  const breakdown: Record<string, number> = {};
  let total = 0;
  
  for (const result of results) {
    breakdown[result.server] = result.count;
    total += result.count;
  }

  return NextResponse.json(
    { total, breakdown, timestamp: new Date().toISOString() },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10',
      }
    }
  );
}
