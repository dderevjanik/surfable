import { ITextCommand } from './../interfaces/ITextCommand';
import { Type } from 'surfable-common/src/actions/All';
import { zoom } from 'surfable-common/src/actions/Zoom';
import { Chrome } from './../data/Chrome';
import { EZoomType } from 'surfable-common/src/enums/EZoomType';
import { CAT } from './../data/Category';
import {sendToBackground} from 'surfable-common/src/Sender';

export const zoomReset: ITextCommand = {
    text: 'Zoom out',
    desc: '',
    cat: CAT.PAGE,
    func: () => sendToBackground(zoom(EZoomType.RESET))
};
