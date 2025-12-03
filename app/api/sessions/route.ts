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

export async function GET() {
  let total = 0;
  const breakdown: Record<string, number> = {};
  let hasConfiguredApis = false;

  console.log('📊 Fetching real-time sessions from all configured APIs...');

  for (let i = 1; i <= 10; i++) {
    const apiUrl = process.env[`API_${i}`];
    
    if (apiUrl) {
      hasConfiguredApis = true;
      try {
        const response = await fetch(`${apiUrl}/sessions`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
          next: { revalidate: 0 }
        });

        if (response.ok) {
          const data: SessionsResponse = await response.json();
          const count = data.total || 0;
          breakdown[`server_${i}`] = count;
          total += count;
          console.log(`✅ API_${i}: ${count} sessions`);
        } else {
          console.warn(`⚠️ API_${i} response: ${response.status}`);
          breakdown[`server_${i}`] = 0;
        }
      } catch (error) {
        console.error(`❌ API_${i} error:`, error);
        breakdown[`server_${i}`] = 0;
      }
    }
  }

  if (!hasConfiguredApis) {
    const legacyApiUrl = process.env.NEXT_PUBLIC_API;
    if (legacyApiUrl) {
      try {
        const response = await fetch(`${legacyApiUrl}/sessions`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
          next: { revalidate: 0 }
        });

        if (response.ok) {
          const data: SessionsResponse = await response.json();
          const count = data.total || 0;
          breakdown['legacy'] = count;
          total += count;
          console.log(`✅ Legacy API: ${count} sessions`);
        } else {
          console.warn(`⚠️ Legacy API response: ${response.status}`);
        }
      } catch (error) {
        console.error('❌ Legacy API error:', error);
      }
    }
  }

  console.log(`🎯 TOTAL SESSIONS: ${total}`);

  return NextResponse.json(
    { 
      total,
      breakdown,
      timestamp: new Date().toISOString()
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }
  );
}
