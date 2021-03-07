addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const {method, url} = request;
  const headers = Object.fromEntries([...request.headers]);
  const {httpProtocol, tlsVersion, tlsCipher, country, colo, asn} = request.cf ?? {};
  const cf = {httpProtocol, tlsVersion, tlsCipher, country, colo, asn};
  // TODO: Add Business/Enterprise cf keys such as city, continent, latitude, longitude, postalCode, metroCode, region, regionCode, timezone
  let body = JSON.stringify({method, url, headers, cf}, null, 2);
  const res = new Response(body, {
    headers: { 'content-type': 'application/json' },
  });
  return res;
}
