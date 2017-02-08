import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { Chrome } from './../data/Chrome';
import { tabNew } from 'surfable-common/src/actions/tabNew';
import { CAT } from './../data/Category';

declare const chrome;

/**
 * Will send message via chrome runtime to background
 */
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

export const showBookmarks: ITextCommand = {
    text: 'Bookmarks',
    desc: 'Ctrl + Shift + O',
    cat: CAT.BROWSER,
    func: () => sendMessage(tabNew(Chrome.BOOKMARKS))
};
