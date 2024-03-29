/* WARNING!!! THIS FILE WAS AUTO-GENERATED BY rollup.config.js AND WAS COPIED FROM sw-template.js. ANY CHANGES TO THIS FILE WILL BE OVERWRITTEN ON THE NEXT BUILD!!! */

const cacheName = `0.1.3`; // Change value to force update
const filesToCache = `["./","build/bundle.js","build/bundle.css","CNAME","assets/hexagons.jpg","assets/nature_token.jpg","assets/tile/forest.jpg","assets/tile/mountain.jpg","assets/tile/prairie.jpg","assets/tile/river.jpg","assets/tile/wetland.jpg","assets/token/bear.jpg","assets/token/elk.jpg","assets/token/fox.jpg","assets/token/hawk.jpg","assets/token/salmon.jpg","favicon.png","icofont/fonts/icofont.woff","icofont/fonts/icofont.woff2","icofont/icofont.min.css","index.html","manifest.json"]`; // Generated filenames as string array

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll(JSON.parse(filesToCache));
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => 
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		)
	);
});

// Get data on screen as quickly as possible, then update once the network has returned the latest data. 
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => 
			cache.match(event.request).then(response => {
        const networkResponse = fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				}).catch(console.warn);
				return response ?? networkResponse;
			})
		)
	);
});