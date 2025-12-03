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

interface ServerInfo {
  id: number;
  name: string;
  userCount: number;
  available: boolean;
}

export async function GET() {
  const servers: ServerInfo[] = [];
  
  for (let i = 1; i <= 10; i++) {
    const apiUrl = process.env[`API_${i}`];
    
    if (apiUrl) {
      let userCount = 0;
      let available = true;
      
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
          userCount = data.total || 0;
        } else {
          available = false;
        }
      } catch (error) {
        console.error(`Error fetching sessions for API_${i}:`, error);
        available = false;
      }
      
      servers.push({
        id: i,
        name: `Server ${i}`,
        userCount,
        available
      });
    }
  }

  if (servers.length === 0) {
    const legacyApiUrl = process.env.NEXT_PUBLIC_API;
    if (legacyApiUrl) {
      let userCount = 0;
      let available = true;
      
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
          userCount = data.total || 0;
        } else {
          available = false;
        }
      } catch (error) {
        console.error('Error fetching sessions for legacy API:', error);
        available = false;
      }
      
      servers.push({
        id: 0,
        name: 'Server',
        userCount,
        available
      });
    }
  }

  return NextResponse.json(
    { 
      servers,
      totalServers: servers.length,
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
