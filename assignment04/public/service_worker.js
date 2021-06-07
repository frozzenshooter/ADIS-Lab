var CACHE_NAME = 'v1';

function precache() {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll([
        './', 
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

    evt.respondWith(fromNetwork(evt.request.clone(), 400).catch(function () {
        console.log('The service worker is serving the asset from cache.');
        return fromCache(evt.request.clone());
    }));

    evt.waitUntil(update(evt.request));
});

function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {

        var timeoutId = setTimeout(reject, timeout);
        console.log('The service worker is serving the asset from network.');

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

function update(request) {

    if (request.method === "POST") {
        return;
    }

    return caches.open(CACHE_NAME).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}