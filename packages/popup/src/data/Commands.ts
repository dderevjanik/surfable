import { ICommands } from '../redux/interfaces/ICommands';
import { Type, CAPTURE } from 'surfable-common/src/actions/all';
import { CAT } from './../data/Category';
import { ICommand, SIMPLE_COMMAND } from './../interfaces/ICommand';
import { EZoomType } from 'surfable-common/src/enums/EZoomType';
import { ETarget } from 'surfable-common/src/enums/ETarget';

/**
 * All possible commands listed in command panel
 */
export const commands: ICommand[] = [
	{type: SIMPLE_COMMAND, cat: CAT.BOOKMARK, text: 'Add to bookmarks', desc: 'Ctrl + D',
		action: {type: 'BOOKMARK_ADD', target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.PAGE, text: 'Close current tab', desc: 'Ctrl + W',
		action: {type: 'TAB_CLOSE', target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.PAGE, text: 'Reload', desc: 'Ctrl + R',
		action: {type: 'TAB_RELOAD', target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.PAGE, text: 'Open new tab', desc: 'Ctrl + T',
		action: {type: 'TAB_NEW', url: '', target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.PAGE, text: 'Duplicate', desc: '',
		action: {type: 'TAB_DUPLICATE', target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.PAGE, text: 'Print Page', desc: 'Ctrl + P',
		action: {type: 'PRINT_PAGE', target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.PAGE, text: 'Zoom in', desc: 'Ctrl + =',
		action: {type: 'ZOOM', zoomType: EZoomType.IN, target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.PAGE, text: 'Zoom out', desc: 'Ctrl + -',
		action: {type: 'ZOOM', zoomType: EZoomType.OUT, target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.PAGE, text: 'Zoom reset', desc: '',
		action: {type: 'ZOOM', zoomType: EZoomType.RESET, target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.BROWSER, text: 'Bookmarks', desc: 'Ctrl + Shift + O',
		action: {type: 'TAB_NEW', url: 'chrome://bookmarks/', target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.BROWSER, text: 'Downloads', desc: 'Ctrl + J',
		action: {type: 'TAB_NEW', url: 'chrome://downloads/', target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.BROWSER, text: 'Extensions', desc: '',
		action: {type: 'TAB_NEW', url: 'chrome://extensions/', target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.BROWSER, text: 'History', desc: 'Ctrl + H',
		action: {type: 'TAB_NEW', url: 'chrome://history/', target: ETarget.BACKGROUND}},
	{type: SIMPLE_COMMAND, cat: CAT.BROWSER, text: 'Settings', desc: '',
		action: {type: 'TAB_NEW', url: 'chrome://settings/', target: ETarget.BACKGROUND}}
];
