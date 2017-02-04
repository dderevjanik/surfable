import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { Chrome } from './../data/Chrome';
import { tabNew } from 'surfable-common/src/actions/tabNew';
import { CAT } from './../data/Category';

declare const chrome;

/**
 * Will send message via chrome runtime to background
 */
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

export const showSettings: ITextCommand = {
    text: 'Settings',
    desc: '',
    cat: CAT.BROWSER,
    func: () => sendMessage(tabNew(Chrome.SETTINGS))
};