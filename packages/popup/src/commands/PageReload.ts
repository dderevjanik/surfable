import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { tabNew } from 'surfable-common/src/actions/tabNew';
import { CAT } from './../data/Category';

declare const chrome;

/**
 * Will send message via chrome runtime to background
 */
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

export const openNewTab: ITextCommand = {
    text: 'Open new tab',
    desc: 'Ctrl + T',
    cat: CAT.PAGE,
    func: () => sendMessage(tabNew(''))
};
