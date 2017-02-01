import { IChrome } from './interfaces/IChrome';
import { Type, TAB_CLOSE, TAB_NEW, BOOKMARK_ADD, BOOKMARK_ADD_AS } from 'surfable-common/src/actions/All';

declare const chrome: IChrome;

chrome.runtime.onMessage.addListener((message: Type, sender) => {
    switch(message.type) {
        case TAB_CLOSE: {
            chrome.tabs.remove(sender.tab.id);
            break;
        }
        case TAB_NEW: {
            if (message.url.length > 0) {
                chrome.tabs.create({ url: message.url });
            } else {
                chrome.tabs.create({});
            }
            break;
        }
        case BOOKMARK_ADD : {
            chrome.bookmarks.create({title: sender.tab.title, url: sender.url});
            break;
        }
        case BOOKMARK_ADD_AS : {
            chrome.bookmarks.create({title: message.title, url: sender.url});
            break;
        }
    }
});
