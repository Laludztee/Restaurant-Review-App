var staticCacheName = 'RestRevApp1';


self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/Restaurant-Review-App/',
                '/Restaurant-Review-App/js/dbhelper.js',
                '/Restaurant-Review-App/js/main.js',
                '/Restaurant-Review-App/js/restaurant_info.js',
                '/Restaurant-Review-App/css/styles.css',
                '/Restaurant-Review-App/img/1.jpg',
                '/Restaurant-Review-App/img/2.jpg',
                '/Restaurant-Review-App/img/3.jpg',
                '/Restaurant-Review-App/img/4.jpg',
                '/Restaurant-Review-App/img/5.jpg',
                '/Restaurant-Review-App/img/6.jpg',
                '/Restaurant-Review-App/img/7.jpg',
                '/Restaurant-Review-App/img/8.jpg',
                '/Restaurant-Review-App/img/9.jpg',
                '/Restaurant-Review-App/img/10.jpg',
                '/Restaurant-Review-App/data/restaurants.json',
                '/Restaurant-Review-App/manifest.json',
                '/Restaurant-Review-App/index.html',
                '/Restaurant-Review-App/restaurant.html',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                'https://Laludztee.github.io/Resturant-Review-App/data/restaurants.json'
            ]);
        }).then(console.log('Cache is sucessful!'))
    );
});


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('Rest') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


// self.addEventListener('fetch', function (event) {

//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {
//                 console.log('Found', event.request, 'in cache');
//                 return response;
//             })
//             .catch(function (response) {
//                 console.log('Cound not find', event.request, 'in cache, Fetching ...');
//                 return fetch(event.request)
//             })
//             .then(function (response) {
//                 const clonedResponse = response.clone();
//                 caches.open(staticCacheName).then(function (cache) {
//                     cache.put(event.request, clonedResponse);
//                 })
//                 return response;
//             })
//     )
// });

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
return response || fetch(event.request);
    })
  );
  });
