export const MAX_FILE_SIZE_MB = 100;
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

// Accepted MIME types and the label shown in the UI. Anything else (e.g. HTML, SVG, scripts)
// is rejected, because files are served inline from our own domain and could run code in the browser.
const FILE_TYPE_LABELS: Record<string, string> = {
	'application/pdf': 'Document',
	'text/plain': 'Document',
	'application/msword': 'Document',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Document',
	'application/vnd.ms-powerpoint': 'Slides',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'Slides',
	'video/mp4': 'Video',
	'video/webm': 'Video',
	'video/quicktime': 'Video',
	'image/png': 'Image',
	'image/jpeg': 'Image'
};

export const ALLOWED_FILE_TYPES = Object.keys(FILE_TYPE_LABELS);

export const getFileTypeLabel = (mimeType: string) => FILE_TYPE_LABELS[mimeType] ?? 'File';
