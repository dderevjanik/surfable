import {Type} from 'surfable-common/src/actions/all';
import {CAPTURE} from 'surfable-common/src/actions/all';
import {CAT} from './../data/Category';
import {ITextCommand} from './../interfaces/ITextCommand';
import {EZoomType} from 'surfable-common/src/enums/EZoomType';
import * as allCommands from './../commands/All';

declare const chrome;
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

/**
 * All possible commands listed in command panel
 */
export const commands: ITextCommand[] = [
	allCommands.addToBookmarks,
	// AllCommands.addToBookmarksAs,
	allCommands.closeCurrentTab,
	{desc: 'Ctrl + R', cat: CAT.PAGE, text: 'Reload', func: () => sendMessage({type: 'TAB_RELOAD'})},
	allCommands.openNewTab,
	{desc: '', cat: CAT.PAGE, text: 'Duplicate', func: () => sendMessage({type: 'TAB_DUPLICATE'})},
	allCommands.showBookmarks,
	allCommands.showDownloads,
	allCommands.showExtensions,
	allCommands.showHistory,
	allCommands.showSettings,
	{desc: 'Ctrl + =', cat: CAT.PAGE, text: 'Zoom in', func: () => sendMessage({type: 'ZOOM', zoomType: EZoomType.IN})},
	{desc: 'Ctrl + -', cat: CAT.PAGE, text: 'Zoom out', func: () => sendMessage({type: 'ZOOM', zoomType: EZoomType.OUT})},
	{desc: '', cat: CAT.PAGE, text: 'Zoom reset', func: () => sendMessage({type: 'ZOOM', zoomType: EZoomType.RESET})}
];
