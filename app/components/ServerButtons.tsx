'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ServerInfo {
  id: number;
  name: string;
  userCount: number;
  available: boolean;
}

interface ServersResponse {
  servers: ServerInfo[];
  totalServers: number;
  timestamp: string;
}

export default function ServerButtons() {
  const [servers, setServers] = useState<ServerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch('/api/servers');
        if (!response.ok) {
          throw new Error('Failed to fetch servers');
        }
        const data: ServersResponse = await response.json();
        setServers(data.servers);
      } catch (err) {
        console.error('Error fetching servers:', err);
        setError('Failed to load servers');
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
    const interval = setInterval(fetchServers, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="animate-pulse flex gap-4">
          <div className="h-12 w-40 bg-muted/30 rounded-lg"></div>
          <div className="h-12 w-40 bg-muted/30 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error || servers.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No servers available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {servers.map((server) => (
        <Link
          key={server.id}
          href={server.id === 0 ? '/pair' : `/pair?server=${server.id}`}
          className={`group relative glow-button px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            !server.available ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${server.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span>{server.name}</span>
            </div>
            <div className="flex items-center gap-1 text-sm opacity-80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{server.userCount}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
