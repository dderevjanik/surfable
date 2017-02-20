import { MAX_COMMAND_TEXT_LENGTH, CHROME_PROTOCOL, BLANK_FAVICON } from './../data/Constants';

/**
 * Slice long text from command's title
 */
export const sliceOverflowTitle = (titleText: string) =>
	(titleText.length > MAX_COMMAND_TEXT_LENGTH)
		? titleText.slice(0, MAX_COMMAND_TEXT_LENGTH)
		: titleText;

/**
 * Will get favicon url, because sometimes is favicon undefined
 * or it's set to chrome internals, which don't work outside
 * of chrome internals
 */
export const getFaviconUrl = (faviconUrl: string) =>
	(faviconUrl)
		? (faviconUrl.indexOf(CHROME_PROTOCOL) === 0)
			? BLANK_FAVICON
			: faviconUrl
		: BLANK_FAVICON;
