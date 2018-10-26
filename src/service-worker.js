/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

// // Installation
// self.addEventListener('install', event => {
//   console.log('Installation du Service Worker...');
// });

// // Activation
// self.addEventListener('activate', event => {
//   console.log('Activation du Service Worker...');
// });

// // active immédiatement un nouveau service worker
// self.skipWaiting();

// self.addEventListener('fetch', event => {
//   console.log('Fetching:', event.request.url);

//   event.respondWith(
//       caches.match(event.request).then(response => {
//           if (response) {
//               console.log(event.request.url, 'servi depuis le cache');
//               return response;
//           }
//           console.log(event.request.url, 'servi depuis le réseau');
//           return fetch(event.request)

//       }).catch(error => {
//           console.log("oops");
//       })
//   );
// });

self.addEventListener('install', function(event){
  // only happens once for this version of the service worker
  // wait until the install event has resolved
  event.waitUntil(
    // then create our named cached
    caches
    .open('my-sw-cache')
    .then(function(cache) {
      // once created, lets add some local resouces
      return cache.addAll([
        './build/main.js',
        './build/main.css'
      ]);
    })
    .then(function(){
      console.log('Service worker is ready, and assets are cached');
    })
  );
});

self.addEventListener("fetch", function(event) {
  console.log('je get');
  // If the request in GET, let the network handle things,
  if (event.request.method !== 'GET') {
    return;
  }
  // here we block the request and handle it our selves
  event.respondWith(
    // Returns a promise of the cache entry that matches the request
    caches
    .match(event.request)
    .then(function(response) {

      // here we can hanlde the request how ever we want.
      // We can return the cache right away if it exist,
      // or go to network to fetch it.
      // There are more intricate examples below.
      // https://ponyfoo.com/articles/progressive-networking-serviceworker

      if (response) {
        // our response is in the cache, let's return that instead
        console.log('Réponse du cache');
        return response;
      }
      // if the response is not in the cache, let's fetch it
      return fetch(event.request)
        .then(function(response) {
          // we have a response from the network
          console.log('Réponse du network');
          return response;
        }).catch(function(error) {
          // Something happened
          console.error('Fetching failed:', error);
          throw error;
        });
    }).catch(() => {
      console.log('Pas de match vers le cache');
    })
  );
});
