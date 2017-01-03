if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/Service_Worker/worker.js').then(function(registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
	  
			var nombre = document.querySelector('#number');
			var result = document.querySelector('.result');
			
			var worker = new Worker("worker.js");
			
			nombre.onchange = function() {
				myWorker.postMessage([nombre.value]);
				console.log('Message posted to worker');
			};
			
			myWorker.onmessage = function(e) {
				result.textContent = e.data;
				console.log('Message received from worker');
			};

		}).catch(function(err) {
		// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}

