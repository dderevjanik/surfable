import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { EZoomType } from 'surfable-common/src/enums/EZoomType';
import { zoom } from 'surfable-common/src/actions/Zoom';
import { CAT } from './../data/Category';
import {sendToBackground} from 'surfable-common/src/Sender';
export const zoomIn: ITextCommand = {
    text: 'Zoom in',
    desc: 'Ctrl + =',
    cat: CAT.PAGE,
    func: () => sendToBackground(zoom(EZoomType.IN))
};
