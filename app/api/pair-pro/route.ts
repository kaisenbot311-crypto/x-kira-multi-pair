
import { NextResponse } from 'next/server';

// Deprecated: keep route but forward to the single configured upstream (NEXT_PUBLIC_API)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get('number') || searchParams.get('code');

  if (!number) {
    return NextResponse.json(
      { status: 'error', message: 'Phone number is required (use ?number=...)' },
      { status: 400 }
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_API || "";

  if (!apiUrl) {
    return NextResponse.json(
      { status: 'error', message: 'Upstream API not configured (NEXT_PUBLIC_API)' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${apiUrl}/pair?number=${encodeURIComponent(number)}`);
    const data = await response.json();

    return NextResponse.json(data, { status: response.ok ? 200 : response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to connect to pairing service' },
      { status: 502 }
    );
  }
}
