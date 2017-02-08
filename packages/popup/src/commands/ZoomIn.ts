import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { EZoomType } from 'surfable-common/src/enums/EZoomType';
import { Zoom } from 'surfable-common/src/actions/Zoom';
import { CAT } from './../data/Category';

declare const chrome;

/**
 * Zoom in current page
 */
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

export const zoomIn: ITextCommand = {
    text: 'Zoom in',
    desc: 'Ctrl + =',
    cat: CAT.PAGE,
    func: () => sendMessage(Zoom(EZoomType.IN))
};
