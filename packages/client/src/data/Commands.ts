import { ITextCommand } from './../interfaces/ITextCommand';

declare const chrome;

export const commands: ITextCommand[] = [
    {
        text: 'Open new tab', desc: 'Ctrl + T',
        func: () => {
            chrome.runtime.sendMessage({type: 'TAB_NEW'}, () => null);
        }
    },
    {
        text: 'Close current tab', desc: 'Ctrl + W',
        func: () => {
            chrome.runtime.sendMessage({type: 'TAB_CLOSE'}, () => null);
        }
    },
    {
        text: 'Add to bookmarks', desc: 'Ctrl + D',
        func: () => {
            chrome.runtime.sendMessage({type: 'BOOKMARK_ADD'}, () => null);
        }
    }
];

