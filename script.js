// Function to extract YouTube video ID from URL
function extractVideoId(url) {
	const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	const match = url.match(regExp);
	return (match && match[7].length === 11) ? match[7] : false;
}

// Function to download image
function downloadImage(url, filename) {
	fetch(url)
		.then(response => response.blob())
		.then(blob => {
			const a = document.createElement('a');
			const objectUrl = URL.createObjectURL(blob);
			a.href = objectUrl;
			a.download = filename;
			a.click();
			URL.revokeObjectURL(objectUrl);
		})
		.catch(error => {
			console.error('Error downloading image:', error);
			document.getElementById('error').textContent = 'Error downloading image. Please try again.';
			document.getElementById('error').style.display = 'block';
		});
}

// Event listener for extract button
document.getElementById('extractBtn').addEventListener('click', function() {
	const videoUrl = document.getElementById('videoUrl').value.trim();
	const videoId = extractVideoId(videoUrl);

	if (videoId) {
		document.getElementById('error').style.display = 'none';
		document.getElementById('videoId').textContent = videoId;

		// Set up thumbnail URL
		const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

		// Display thumbnail
		const thumbnailImg = document.getElementById('thumbnail');
		thumbnailImg.src = thumbnailUrl;

		// Show result container
		document.getElementById('result').style.display = 'block';

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
	} else {
		document.getElementById('error').style.display = 'block';
		document.getElementById('result').style.display = 'none';
	}
});

// Event listener for download button
document.getElementById('downloadBtn').addEventListener('click', function() {
	const videoId = document.getElementById('videoId').textContent;
	const thumbnailUrl = document.getElementById('thumbnail').src;
	downloadImage(thumbnailUrl, `youtube-thumbnail-${videoId}.jpg`);
});