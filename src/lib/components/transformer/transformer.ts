export interface UrlTransformerOptions {
	/** The original URL of the image */
	url: string | URL;
	/** The desired width of the image */
	width?: number;
	/** The desired height of the image */
	height?: number;
	/** The desired format of the image. Default is auto-detect */
	format?: string;
	/** Recursively find the the canonical CDN for a source image. Default is true */
	recursive?: boolean;
}

export interface UrlTransformer {
	(options: UrlTransformerOptions): Promise<string | URL> | undefined;
}

export const transform: UrlTransformer = async ({
	url: originalUrl,
	width,
	height
}) => {
	const w = width ? String(width) : '';
	const h = height ? String(height) : '';
	const url = await getSignedURL(w, h, originalUrl);
	return url;
};

type SignedURL = {
	signedURL: string;
};

async function getSignedURL(width: string, height: string, src: string | URL) {
	const response = await fetch('http://localhost:4444/v1/tokens/img', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			width: width,
			height: height,
			src: src
		})
	});
	const result = (await response.json()) as SignedURL;
	return result.signedURL;
}
