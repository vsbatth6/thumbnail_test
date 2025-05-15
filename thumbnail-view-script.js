// Function to get URL parameters
function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to download image
function downloadThumbnail() {
	const videoId = document.getElementById('videoId').textContent;
	const thumbnailUrl = document.getElementById('thumbnail').src;

	fetch(thumbnailUrl)
		.then(response => response.blob())
		.then(blob => {
			const a = document.createElement('a');
			const objectUrl = URL.createObjectURL(blob);
			a.href = objectUrl;
			a.download = `youtube-thumbnail-${videoId}.jpg`;
			a.click();
			URL.revokeObjectURL(objectUrl);
		})
		.catch(error => {
			console.error('Error downloading image:', error);
			alert('Error downloading image. Please try again.');
		});
}

// Function to go back to the downloader page
function goBack() {
	window.location.href = 'index.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
	console.log('Preview page loaded');
	const videoId = getUrlParameter('id');

	if (videoId) {
		console.log('Video ID from URL:', videoId);
		document.getElementById('videoId').textContent = videoId;


		// Set up thumbnail URL
		const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

		// Display thumbnail
		const thumbnailImg = document.getElementById('thumbnail');
		thumbnailImg.src = thumbnailUrl;

		// Check if maxresdefault is available
		thumbnailImg.onload = function() {

			if (this.naturalWidth === 120 && this.naturalHeight === 90) {
				// If maxresdefault is not available, try hqdefault
				thumbnailImg.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
				document.getElementById('resolution').textContent = '480x360';
			} else {
				document.getElementById('resolution').textContent = '1280x720';
			}
		};

		thumbnailImg.onerror = function() {
			alert('Error loading thumbnail. Please try again.');
		};
	} else {
		alert('No video ID provided. Redirecting back to the downloader.');
		window.location.href = 'index.html';
	}
});