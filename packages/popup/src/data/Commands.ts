import { CAT } from './../data/Category';
import { CHROME } from './../data/Chrome';
import { ICommand, COMMAND } from './../interfaces/ICommand';
import { EZoomType } from 'surfable-common/src/enums/EZoomType';
import { ETarget } from 'surfable-common/src/enums/ETarget';
import { MESSAGE } from 'surfable-common/src/Messages';

export const help: ICommand[] = [
	{
		type: COMMAND.QUICKPANEL_COMMAND,
		group: 'DEAFULT', text: '>', desc: 'Show and run commands',
		action: {type: MESSAGE.BOOKMARK_ADD, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.QUICKPANEL_COMMAND,
		group: 'DEFAULT', text: '@', desc: 'Go to tab',
		action: {type: MESSAGE.BOOKMARK_ADD, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.QUICKPANEL_COMMAND,
		group: 'DEFAULT', text: '#', desc: 'Open a bookmark',
		action: {type: MESSAGE.BOOKMARK_ADD, target: ETarget.BACKGROUND}}
];


/**
 * All possible defaults commands listed in command panel
 */
export const commands: ICommand[] = [
	// BOOKMARK
	{
		type: COMMAND.SIMPLE,
		cat: CAT.BOOKMARK, text: 'Add to bookmarks', desc: 'Ctrl + D',
		action: {type: MESSAGE.BOOKMARK_ADD, target: ETarget.BACKGROUND}},
	// PAGE
	{
		type: COMMAND.SIMPLE,
		cat: CAT.PAGE, text: 'Close current tab', desc: 'Ctrl + W',
		action: {type: MESSAGE.TAB_CLOSE, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.PAGE, text: 'Reload', desc: 'Ctrl + R',
		action: {type: MESSAGE.TAB_RELOAD, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.PAGE, text: 'Open new tab', desc: 'Ctrl + T',
		action: {type: MESSAGE.TAB_NEW, url: '', target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.PAGE, text: 'Duplicate', desc: '',
		action: {type: MESSAGE.TAB_DUPLICATE, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.PAGE, text: 'Close all tabs', desc: '',
		action: {type: MESSAGE.TAB_CLOSE_ALL, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.PAGE, text: 'Print Page', desc: 'Ctrl + P',
		action: {type: MESSAGE.PRINT_PAGE, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.PAGE, text: 'Zoom in', desc: 'Ctrl + =',
		action: {type: MESSAGE.ZOOM, zoomType: EZoomType.IN, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.PAGE, text: 'Zoom out', desc: 'Ctrl + -',
		action: {type: MESSAGE.ZOOM, zoomType: EZoomType.OUT, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.PAGE, text: 'Zoom reset', desc: '',
		action: {type: MESSAGE.ZOOM, zoomType: EZoomType.RESET, target: ETarget.BACKGROUND}},
	// WINDOW
	{
		type: COMMAND.SIMPLE,
		cat: CAT.WINDOW, text: 'Close current window', desc: 'Ctrl + Shift + W',
		action: {type: MESSAGE.WINDOW_CLOSE, target: ETarget.BACKGROUND}},
	// BROWSER
	{
		type: COMMAND.SIMPLE,
		cat: CAT.BROWSER, text: 'Bookmarks', desc: 'Ctrl + Shift + O',
		action: {type: MESSAGE.TAB_NEW, url: CHROME.BOOKMARKS, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.BROWSER, text: 'Downloads', desc: 'Ctrl + J',
		action: {type: MESSAGE.TAB_NEW, url: CHROME.DOWNLOADS, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.BROWSER, text: 'Extensions', desc: '',
		action: {type: MESSAGE.TAB_NEW, url: CHROME.EXTENSIONS, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.BROWSER, text: 'History', desc: 'Ctrl + H',
		action: {type: MESSAGE.TAB_NEW, url: CHROME.HISTORY, target: ETarget.BACKGROUND}},
	{
		type: COMMAND.SIMPLE,
		cat: CAT.BROWSER, text: 'Settings', desc: '',
		action: {type: MESSAGE.TAB_NEW, url: CHROME.SETTINGS, target: ETarget.BACKGROUND}},
];
