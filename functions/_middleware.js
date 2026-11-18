export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname;

  if (host === 'www.opc-story.top' || host.endsWith('.pages.dev')) {
    url.hostname = 'opc-story.top';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
