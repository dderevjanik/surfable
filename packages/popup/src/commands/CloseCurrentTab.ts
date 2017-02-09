import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { tabClose } from 'surfable-common/src/actions/tabClose';
import { CAT } from './../data/Category';
import {sendToBackground} from 'surfable-common/src/Sender';

export const closeCurrentTab: ITextCommand = {
    text: 'Close current tab',
    desc: 'Ctrl + W',
    cat: CAT.PAGE,
    func: () => sendToBackground(tabClose())
};
