var CACHE_NAME = 'v1';


/* MY BUGGY CODE - Lukas */

// var urlsToCache = [
//   '/index.html',
//   '/roars',
//   '/bootstrap.min.css'
// ];

// self.addEventListener('install', function(event) {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//         .then(function(cache) {
//             console.log('Opened cache');
//             return cache.addAll(urlsToCache);
//         })
//   );
// });

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function(response) {
//             // Cache hit - return response
//             if (response) {
//                 return response;
//             }
//             return fetch(event.request);
//             }
//         )
//     );
// });


function precache() {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll([
        './index.html',
        './roars',
        '/bootstrap.min.css'
        ]);
    });
}

self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');

    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
        return fromCache(evt.request);
    }));
});

function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {

        var timeoutId = setTimeout(reject, timeout);

        fetch(request).then(function (response)
            {
                clearTimeout(timeoutId);
                fulfill(response);

            },
            reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE_NAME).then(function (cache) 
    {
        return cache.match(request).then(function (matching)
            {
                return matching || Promise.reject('no-match');
            });
    });
}