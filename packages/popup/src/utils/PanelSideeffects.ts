import { SideEffect } from './../Types';

export const enum EActiveState {
	ABOVE = 1,
	INSIDE = 0,
	BELOW = -1
}

/**
 * Check if active item is inside view
 */
export const isScrolledIntoView = (scrollWindow: HTMLElement, scrollItem: HTMLElement): EActiveState => {
	const scrollViewY1 = scrollWindow.scrollTop;
	const scrollViewY2 = (scrollViewY1 + scrollWindow.clientHeight);

	const elemY1 = (scrollItem.offsetTop - scrollWindow.offsetTop);
	const elemY2 = (elemY1 + scrollItem.clientHeight);

	if (elemY1 < scrollViewY1) {
		return EActiveState.ABOVE;
	}
	if (elemY2 > scrollViewY2) {
		return EActiveState.BELOW;
	}
	return EActiveState.INSIDE;
};

export const scrollIntoElement = (scrollWindow: HTMLElement, scrollItem: HTMLElement, activeState: EActiveState): void => {
	if (activeState === EActiveState.ABOVE) {
		scrollWindow.scrollTop = (scrollItem.offsetTop - scrollWindow.offsetTop);
	} else {
		scrollWindow.scrollTop = (scrollItem.offsetTop - scrollWindow.offsetTop - scrollWindow.clientHeight + scrollItem.clientHeight);
	}
};
