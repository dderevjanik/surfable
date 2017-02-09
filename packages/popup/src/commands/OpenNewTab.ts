import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { tabNew } from 'surfable-common/src/actions/tabNew';
import { CAT } from './../data/Category';
import {sendToBackground} from 'surfable-common/src/Sender';

export const openNewTab: ITextCommand = {
    text: 'Open new tab',
    desc: 'Ctrl + T',
    cat: CAT.PAGE,
    func: () => sendToBackground(tabNew(''))
};
