import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get('number');
  const server = searchParams.get('server');

  if (!number) {
    return NextResponse.json(
      { success: false, message: 'Phone number is required (use ?number=...)' },
      { status: 400 }
    );
  }

  let apiUrl: string | undefined;
  let serverLabel: string;

  if (server) {
    const serverNum = parseInt(server, 10);
    if (isNaN(serverNum) || serverNum < 1 || serverNum > 10) {
      return NextResponse.json(
        { success: false, message: 'Invalid server ID. Must be between 1 and 10.' },
        { status: 400 }
      );
    }
    
    apiUrl = process.env[`API_${serverNum}`];
    serverLabel = `Server ${serverNum}`;
    
    if (!apiUrl) {
      return NextResponse.json(
        { success: false, message: `${serverLabel} is not configured` },
        { status: 404 }
      );
    }
  } else {
    apiUrl = process.env.NEXT_PUBLIC_API || "";
    serverLabel = "Default API";
    
    if (!apiUrl) {
      return NextResponse.json(
        { success: false, message: 'No API configured. Please add API_1 or NEXT_PUBLIC_API environment variable.' },
        { status: 500 }
      );
    }
  }

  try {
    const response = await fetch(`${apiUrl}/pair?number=${encodeURIComponent(number)}`);
    const data = await response.json();

    console.log(`Upstream API Response (${serverLabel}):`, { status: response.status, data });

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`Proxy error (${serverLabel}):`, error);
    return NextResponse.json(
      { success: false, message: 'Failed to connect to pairing service' },
      { status: 502 }
    );
  }
}
