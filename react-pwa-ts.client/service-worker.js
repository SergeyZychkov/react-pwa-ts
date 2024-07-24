
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
          cache.addAll([
            '/',
            './offline.html',
            './index.html',
            './src/App.css',
            './src/index.css'
          ]);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

function isInArray(string, array) {
    var cachePath;
    if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
        console.log('matched ', string);
        cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
        cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
}

var dynamicUrlArray = [
    'api/Test/GetTestValue',
    'api/content/GetFilesFromContentFolder'
    ];

self.addEventListener('fetch', function(event) {
    if (dynamicUrlArray.some(function(element) {return event.request.url.indexOf(element) > -1} )) {
        event.respondWith(
            caches.open(CACHE_DYNAMIC_NAME)
            .then(function(cache) {
                return fetch(event.request)
                    .then(function(res) {
                        cache.put(event.request, res.clone());
                        return res;
                    });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(function(res) {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(function(cache) {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                });
                        })
                        .catch(function(err) {
                            return caches.open(CACHE_STATIC_NAME)
                                .then(function(cache) {
                                    if (event.request.headers.get('accept').includes('text/html')) {
                                        return cache.match('/offline.html');
                                    }
                                });
                        });
                }
            })
        );
    }
});

self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var action = event.action;

    if (action === 'confirm') {
        notification.close();
    } else {
        event.waitUntil(
            clients.matchAll()
            .then(function(clis) {
                var client = clis.find(function(c) {
                    return c.visibilityState === 'visible';
                });

                if (client !== undefined) {
                    client.navigate(notification.data.url);
                    client.focus();
                } else {
                    clients.openWindow(notification.data.url);
                }
                notification.close();
            })
        );
    }
});

self.addEventListener('push', event => {
    console.log(event);

    var data = {title: 'New!', content: 'Something new happened!', openUrl: '/'};

    if (event.data) {
        data = JSON.parse(event.data.text());
    }

    const options = {
        body: data.content,
        icon: '/logo192.png',
        badge: '/logo192.png',
        data: {
            url: data.openUrl
        }
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});