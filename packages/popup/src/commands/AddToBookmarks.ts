import {ITextCommand } from './../interfaces/ITextCommand';
import {Type } from 'surfable-common/src/actions/All';
import {bookmarkAdd } from 'surfable-common/src/actions/BookmarkAdd';
import {CAT } from './../data/Category';
import {sendToBackground} from 'surfable-common/src/Sender';

export const addToBookmarks: ITextCommand = {
	text: 'Add to bookmarks',
	desc: 'Ctrl + D',
	cat: CAT.BOOKMARK,
	func: () => sendToBackground(bookmarkAdd())
};
