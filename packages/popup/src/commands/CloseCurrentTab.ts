import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { tabClose } from 'surfable-common/src/actions/tabClose';
import { CAT } from './../data/Category';

declare const chrome;

/**
 * Will send message via chrome runtime to background
 */
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

export const closeCurrentTab: ITextCommand = {
    text: 'Close current tab',
    desc: 'Ctrl + W',
    cat: CAT.PAGE,
    func: () => sendMessage(tabClose())
};
