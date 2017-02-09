import { IAction } from './IAction';
import { EZoomType } from './../enums/EZoomType';

export type ZOOM = 'ZOOM';
export const ZOOM: ZOOM = 'ZOOM';

export interface IZoom extends IAction {
	readonly type: ZOOM;
	readonly zoomType: EZoomType;
};

/**
 * Add current page to bookmarks
 */
export const zoom = (zoomType: EZoomType): IZoom => ({
	type: ZOOM,
	zoomType: zoomType
});
