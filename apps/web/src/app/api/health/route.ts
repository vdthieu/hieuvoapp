const API_ORIGIN = (process.env.INTERNAL_API_ORIGIN ?? 'http://localhost:3001').replace(
  /^['"]|['"]$/g,
  '',
);

export async function GET() {
  try {
    const response = await fetch(`${API_ORIGIN}/api/health`, {
      method: 'GET',
      cache: 'no-store',
    });

    const text = await response.text();
    return new Response(text, {
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch {
    return Response.json({ message: 'Upstream API unavailable' }, { status: 502 });
  }
}
