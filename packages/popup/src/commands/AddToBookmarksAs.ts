import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { bookmarkAddAs } from 'surfable-common/src/actions/BookmarkAddAs';
import { CAT } from './../data/Category';
import {sendToBackground} from 'surfable-common/src/Sender';

export const addToBookmarksAs: ITextCommand = {
    text: 'Add to bookmarks As',
    desc: '',
    cat: CAT.BOOKMARK,
    func: () => sendToBackground(bookmarkAddAs('TEST'))
};
