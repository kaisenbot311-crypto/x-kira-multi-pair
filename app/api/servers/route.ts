import { NextResponse } from 'next/server';

interface SessionsResponse {
  total: number;
  healthy: number;
  sessions: Record<string, unknown>;
}

interface ServerInfo {
  id: number;
  name: string;
  userCount: number;
  available: boolean;
}

async function fetchServerInfo(apiUrl: string, id: number, name: string): Promise<ServerInfo> {
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
      return { id, name, userCount: data.total || 0, available: true };
    }
    return { id, name, userCount: 0, available: false };
  } catch {
    return { id, name, userCount: 0, available: false };
  }
}

export async function GET() {
  const serverPromises: Promise<ServerInfo>[] = [];
  
  for (let i = 1; i <= 10; i++) {
    const apiUrl = process.env[`API_${i}`];
    if (apiUrl) {
      serverPromises.push(fetchServerInfo(apiUrl, i, `Server ${i}`));
    }
  }

  if (serverPromises.length === 0) {
    const legacyApiUrl = process.env.NEXT_PUBLIC_API;
    if (legacyApiUrl) {
      serverPromises.push(fetchServerInfo(legacyApiUrl, 0, 'Server'));
    }
  }

  const servers = await Promise.all(serverPromises);

  return NextResponse.json(
    { servers, totalServers: servers.length, timestamp: new Date().toISOString() },
    { headers: { 'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10' } }
  );
}
