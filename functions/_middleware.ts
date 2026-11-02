// Cloudflare Pages Middleware: Canonical Custom Domain 301 Redirect
// Intercepts all traffic arriving at *.pages.dev and permanently redirects to the custom domain

export async function onRequest(context: any) {
  const url = new URL(context.request.url);

  // If request hits the *.pages.dev domain, 301 redirect to custom domain
  if (url.hostname.endsWith('.pages.dev')) {
    return Response.redirect(`https://quillsandinkhub.com${url.pathname}${url.search}`, 301);
  }

  return context.next();
}

