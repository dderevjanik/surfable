import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { bookmarkAddAs } from 'surfable-common/src/actions/BookmarkAddAs';
import { CAT } from './../data/Category';

declare const chrome;

/**
 * Will send message via chrome runtime to background
 */
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

export const addToBookmarksAs: ITextCommand = {
    text: 'Add to bookmarks As',
    desc: '',
    cat: CAT.BOOKMARK,
    func: () => sendMessage(bookmarkAddAs('TEST'))
};
