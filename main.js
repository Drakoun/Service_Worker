if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/Service_Worker/serviceworker.js').then(function(registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
	  
			var CACHE_NAME = 'my-site-cache-v1';
			var urlsToCache = ['/worker.js','/main.js'];
	  
			var nombre = document.querySelector('#number');
			var result = document.querySelector('.result');
			
			var worker = new Worker("worker.js");
			this.addEventListener('install', function(event) {
	// Perform install steps
		event.waitUntil(
			caches.open(CACHE_NAME)
				.then(function(cache) {
					console.log('Opened cache');
					return cache.addAll(urlsToCache);
				})
		);
});
			nombre.onchange = function() {
				worker.postMessage([nombre.value]);
				console.log('Message posted to worker');
			};
			
			worker.onmessage = function(e) {
				result.textContent = e.data;
				console.log('Message received from worker');
			};

		}).catch(function(err) {
		// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}

