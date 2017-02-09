import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { Chrome } from './../data/Chrome';
import { tabNew } from 'surfable-common/src/actions/tabNew';
import { CAT } from './../data/Category';
import {sendToBackground} from 'surfable-common/src/Sender';

export const showSettings: ITextCommand = {
    text: 'Settings',
    desc: '',
    cat: CAT.BROWSER,
    func: () => sendToBackground(tabNew(Chrome.SETTINGS))
};
