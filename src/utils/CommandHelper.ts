import { MAX_COMMAND_TEXT_LENGTH, CHROME_PROTOCOL, BLANK_FAVICON } from './../data/Constants';

/**
 * Slice long text from command's title
 */
export const sliceOverflowTitle = (titleText: string): string =>
	(titleText.length > MAX_COMMAND_TEXT_LENGTH)
		? titleText.slice(0, MAX_COMMAND_TEXT_LENGTH)
		: titleText;

/**
 * Will get favicon url, because sometimes favicon is undefined
 * or it's set to chrome internals, which don't work outside
 * of chrome internals (in extensions)
 */
export const getFaviconUrl = (faviconUrl: string): string =>
	(faviconUrl)
		? (faviconUrl.indexOf(CHROME_PROTOCOL) === 0)
			? BLANK_FAVICON
			: faviconUrl
		: BLANK_FAVICON;

/**
 * Shorten url, because most of time it's not necessery to see
 * 'http://' or 'https://'.
 */
export const shortenUrl = (url: string): string => {
	if (url.indexOf('http://') === 0) {
		return url.slice(7, url.length);
	}
	if (url.indexOf('https://') === 0) {
		return url.slice(8, url.length);
	}
	return url;
};
