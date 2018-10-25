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

// Installation
self.addEventListener('install', event => {
  console.log('Installation du Service Worker...');
});

// Activation
self.addEventListener('activate', event => {
  console.log('Activation du Service Worker...');
});

// active immédiatement un nouveau service worker
self.skipWaiting();

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);

  event.respondWith(
      caches.match(event.request).then(response => {
          if (response) {
              console.log(event.request.url, 'servi depuis le cache');
              return response;
          }
          console.log(event.request.url, 'servi depuis le réseau');
          return fetch(event.request)

      }).catch(error => {
          console.log("oops");
      })
  );
});