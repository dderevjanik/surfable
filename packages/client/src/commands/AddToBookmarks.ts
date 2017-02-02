import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { bookmarkAdd } from 'surfable-common/src/actions/BookmarkAdd';
import { CAT } from './../data/Category';

declare const chrome;

/**
 * Will send message via chrome runtime to background
 */
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

export const addToBookmarks: ITextCommand = {
    text: 'Add to bookmarks',
    desc: 'Ctrl + D',
    cat: CAT.BOOKMARK,
    func: () => sendMessage(bookmarkAdd())
};
