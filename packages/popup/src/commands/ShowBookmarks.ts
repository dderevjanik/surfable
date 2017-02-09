import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { Chrome } from './../data/Chrome';
import { tabNew } from 'surfable-common/src/actions/tabNew';
import { CAT } from './../data/Category';
import {sendToBackground} from 'surfable-common/src/Sender';

export const showBookmarks: ITextCommand = {
    text: 'Bookmarks',
    desc: 'Ctrl + Shift + O',
    cat: CAT.BROWSER,
    func: () => sendToBackground(tabNew(Chrome.BOOKMARKS))
};
