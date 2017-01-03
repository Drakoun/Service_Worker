this.addEventListener('install', function(event) {
	// Perform install steps
		event.waitUntil(
			caches.open('my-site-cache-v1')
				.then(function(cache) {
					console.log('Opened cache');
					return cache.addAll(['/','/worker.js','/main.js']);
				})
		);
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});