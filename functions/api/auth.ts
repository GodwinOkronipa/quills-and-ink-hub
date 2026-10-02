// Cloudflare Pages Function: /api/auth
// Edge verification endpoint supporting signed token verification

export async function onRequestPost(context: any) {
  try {
    const { passkeyHash } = await context.request.json();

    // Known SHA-256 hash of demo passkey "quills-admin-2026" with salt "quills_salt_2026"
    // Generated via crypto.subtle.digest("SHA-256", "quills_salt_2026:quills-admin-2026")
    const EXPECTED_HASH = '70993b407894d65b3817ffa0bf03f0868f8335fcff8fd85e1dcc24a9102f569c';

    if (passkeyHash === EXPECTED_HASH) {
      const sessionToken = crypto.randomUUID();
      return new Response(
        JSON.stringify({
          authenticated: true,
          token: sessionToken,
          role: 'editorial_admin',
          expiresAt: Date.now() + 1000 * 60 * 60 * 8, // 8 hour session
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ authenticated: false, message: 'Invalid encrypted passkey' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Auth parsing error' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
