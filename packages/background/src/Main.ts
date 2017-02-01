import { IChrome } from './interfaces/IChrome';
import * as Message from './../../common/actions/All';

declare const chrome: IChrome;

chrome.runtime.onMessage.addListener((message: Message.Type, sender) => {
    switch(message.type) {
        case Message.TAB_CLOSE: {
            chrome.tabs.remove(sender.tab.id);
            break;
        }
        case Message.TAB_NEW: {
            chrome.tabs.create({});
            break;
        }
        case Message.BOOKMARK_ADD : {
            chrome.bookmarks.create({title: sender.tab.title, url: sender.url});
            break;
        }
        case Message.BOOKMARK_ADD_AS : {
            chrome.bookmarks.create({title: message.title, url: sender.url});
            break;
        }
    }
});
