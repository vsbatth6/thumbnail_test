// Function to extract YouTube video ID from URL
function extractVideoId(url) {
	const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	const match = url.match(regExp);
	return (match && match[7].length === 11) ? match[7] : false;
}

// Direct click handler function
function handleExtractClick() {
	console.log('Extract button clicked');
	const videoUrl = document.getElementById('videoUrl').value.trim();
	const videoId = extractVideoId(videoUrl);

	if (videoId) {
		console.log('Valid video ID extracted:', videoId);
		document.getElementById('error').style.display = 'none';

		// Open page with the thumbnail preview
		window.location.href = `thumbnail-view.html?id=${videoId}`;
	} else {
		console.log('Invalid video URL');
		document.getElementById('error').style.display = 'block';
	}
}

// Also add event listeners as a backup method
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM fully loaded. Initializing event listeners...');

	const extractBtn = document.getElementById('extractBtn');

	if (extractBtn) {
		extractBtn.addEventListener('click', handleExtractClick);
	}
});