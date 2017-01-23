import { IChrome } from './interfaces/IChrome';

declare const chrome: IChrome;

chrome.runtime.onMessage.addListener((message, sender) => {
    switch(message.type) {
        case 'TAB_CLOSE': {
            chrome.tabs.remove(sender.tab.id);
            break;
        }
        case 'TAB_NEW': {
            chrome.tabs.create({});
            break;
        }
        case 'BOOKMARK_ADD' : {
            chrome.bookmarks.create({title: sender.tab.title, url: sender.url});
            break;
        }
    }
});
