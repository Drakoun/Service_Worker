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