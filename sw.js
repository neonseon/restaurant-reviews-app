/**
 * First cache just homepage and styles, and name the cache
 */
const filesToCache = [
  '/',
  'css/styles.css'
];

const staticCacheName = 'restrevs-static-v1';

/**
 * Install and add files to cache
 */
self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});
/**
 * If requests match cache, respond with cache, if not make network request and
 * add the request to the cache
 */
self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

    .then(response => {
      return caches.open(staticCacheName).then(cache => {
        cache.put(event.request.url, response.clone());
        return response;
      });
    });

    }).catch(error => {

    })
  );
});