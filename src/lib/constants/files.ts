export const MAX_FILE_SIZE_MB = 100;
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

// Documents, slides, videos and images. Anything else (e.g. HTML, SVG, scripts) is rejected,
// because files are served inline from our own domain and could run code in the browser.
export const ALLOWED_FILE_TYPES = [
	'application/pdf',
	'text/plain',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/vnd.ms-powerpoint',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	'video/mp4',
	'video/webm',
	'video/quicktime',
	'image/png',
	'image/jpeg'
];
