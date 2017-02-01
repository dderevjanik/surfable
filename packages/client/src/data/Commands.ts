import { ITextCommand } from './../interfaces/ITextCommand';
import { CAT } from './Category';
import { Type } from 'surfable-common/actions/All';
import { bookmarkAdd } from 'surfable-common/actions/BookmarkAdd';
import { bookmarkAddAs } from 'surfable-common/actions/BookmarkAddAs';
import { tabNew } from 'surfable-common/actions/TabNew';
import { tabClose } from 'surfable-common/actions/TabClose';

declare const chrome;

const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

export const commands: ITextCommand[] = [
    {
        text: 'Open new tab', desc: 'Ctrl + T', cat: CAT.PAGE,
        func: () => sendMessage(tabNew())
    },
    {
        text: 'Close current tab', desc: 'Ctrl + W', cat: CAT.PAGE,
        func: () => sendMessage(tabClose())
    },
    {
        text: 'Add to bookmarks', desc: 'Ctrl + D', cat: CAT.BOOKMARK,
        func: () => sendMessage(bookmarkAdd())
    },
    {
        text: 'Add to bookmarks As', desc: '', cat: CAT.BOOKMARK,
        func: () => sendMessage(bookmarkAddAs('TEST'))
    }
];

