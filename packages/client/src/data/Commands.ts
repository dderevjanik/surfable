import { ITextCommand } from './../interfaces/ITextCommand';
import { CAT } from './Category';
import { Chrome } from './Chrome';
import { Type } from 'surfable-common/src/actions/All';
import { bookmarkAdd } from 'surfable-common/src/actions/BookmarkAdd';
import { bookmarkAddAs } from 'surfable-common/src/actions/BookmarkAddAs';
import { tabNew } from 'surfable-common/src/actions/TabNew';
import { tabClose } from 'surfable-common/src/actions/TabClose';

declare const chrome;

/**
 * Will send message via chrome runtime to background
 */
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

/**
 * All possible commands listed in command panel
 */
export const commands: ITextCommand[] = [
    {
        text: 'Open new tab',
        desc: 'Ctrl + T',
        cat: CAT.PAGE,
        func: () => sendMessage(tabNew(''))
    },
    {
        text: 'Close current tab',
        desc: 'Ctrl + W',
        cat: CAT.PAGE,
        func: () => sendMessage(tabClose())
    },
    {
        text: 'Add to bookmarks',
        desc: 'Ctrl + D',
        cat: CAT.BOOKMARK,
        func: () => sendMessage(bookmarkAdd())
    },
    {
        text: 'Add to bookmarks As',
        desc: '',
        cat: CAT.BOOKMARK,
        func: () => sendMessage(bookmarkAddAs('TEST'))
    },
    {
        text: 'Downloads',
        desc: 'Ctrl + J',
        cat: CAT.BROWSER,
        func: () => sendMessage(tabNew(Chrome.DOWNLOADS))
    },
    {
        text: 'History',
        desc: 'Ctrl + H',
        cat: CAT.BROWSER,
        func: () => sendMessage(tabNew(Chrome.HISTORY))
    },
    {
        text: 'Extensions',
        desc: '',
        cat: CAT.BROWSER,
        func: () => sendMessage(tabNew(Chrome.EXTENSIONS))
    },
    {
        text: 'Bookmarks',
        desc: 'Ctrl + Shift + O',
        cat: CAT.BROWSER,
        func: () => sendMessage(tabNew(Chrome.BOOKMARKS))
    },
    {
        text: 'Settings',
        desc: '',
        cat: CAT.BROWSER,
        func: () => sendMessage(tabNew(Chrome.SETTINGS))
    },
];
