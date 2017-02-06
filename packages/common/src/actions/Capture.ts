import { IAction } from './IAction';
import { ECapture } from './../enums/ECaptureType';

export type CAPTURE = 'CAPTURE';
export const CAPTURE: CAPTURE = 'CAPTURE';

export interface ICapture extends IAction {
    readonly type: CAPTURE;
    readonly captureType: ECapture;
};

export const capture = (captureType: ECapture): ICapture => ({
    type: CAPTURE,
    captureType: captureType
});
