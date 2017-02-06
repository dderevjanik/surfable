import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { Zoom } from 'surfable-common/src/actions/Zoom';
import { Chrome } from './../data/Chrome';
import { EZoomType } from 'surfable-common/src/enums/EZoomType';
import { CAT } from './../data/Category';

declare const chrome;

/**
 * Zoom out current page
 */
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

export const zoomOut: ITextCommand = {
    text: 'Zoom out',
    desc: 'Ctrl + -',
    cat: CAT.PAGE,
    func: () => sendMessage(Zoom(EZoomType.OUT))
};
