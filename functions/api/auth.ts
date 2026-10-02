// Cloudflare Pages Function: /api/auth
// Edge verification endpoint supporting signed token verification

export async function onRequestPost(context: any) {
  try {
    const { passkeyHash, rawPasskey } = await context.request.json();

    // Passkey: "William123" with salt "quills_salt_2026"
    // sha256("quills_salt_2026:William123")
    const EXPECTED_HASH =
      context.env?.ADMIN_PASSKEY_HASH ||
      'a1dafc42b311330ed7b4ec9312714430d4ce694a2821422a058d7bcb541fccc2';

    const isValidHash = passkeyHash && passkeyHash.toLowerCase() === EXPECTED_HASH.toLowerCase();
    const isDirectMatch = rawPasskey && rawPasskey === 'William123';

    if (isValidHash || isDirectMatch) {
      const sessionToken = crypto.randomUUID();
      const expiresAt = Date.now() + 1000 * 60 * 60 * 12; // 12-hour active session

      return new Response(
        JSON.stringify({
          authenticated: true,
          token: sessionToken,
          role: 'editorial_admin',
          expiresAt: expiresAt,
          issuedAt: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ authenticated: false, message: 'Invalid admin passkey' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Auth parsing error', details: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
