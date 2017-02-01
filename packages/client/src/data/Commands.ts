import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/actions/All';
import { bookmarkAdd } from 'surfable-common/actions/BookmarkAdd';
import { bookmarkAddAs } from 'surfable-common/actions/BookmarkAddAs';
import { tabNew } from 'surfable-common/actions/TabNew';
import { tabClose } from 'surfable-common/actions/TabClose';

declare const chrome;

const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

export const commands: ITextCommand[] = [
    {
        text: 'Open new tab', desc: 'Ctrl + T',
        func: () => sendMessage(tabNew())
    },
    {
        text: 'Close current tab', desc: 'Ctrl + W',
        func: () => sendMessage(tabClose())
    },
    {
        text: 'Add to bookmarks', desc: 'Ctrl + D',
        func: () => sendMessage(bookmarkAdd())
    },
    {
        text: 'Add to bookmarks As', desc: '',
        func: () => sendMessage(bookmarkAddAs('TEST'))
    }
];

