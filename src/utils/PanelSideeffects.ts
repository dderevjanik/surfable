export const enum EViewState {
	ABOVE = 1,
	INSIDE = 0,
	BELOW = -1
}

/**
 * Check if active item is inside view
 */
export const isScrolledIntoView = (scrollWindow: HTMLElement, scrollItem: HTMLElement): EViewState => {
	const scrollViewY1 = scrollWindow.scrollTop;
	const scrollViewY2 = (scrollViewY1 + scrollWindow.clientHeight);

	const elemY1 = (scrollItem.offsetTop - scrollWindow.offsetTop);
	const elemY2 = (elemY1 + scrollItem.clientHeight);

	if (elemY1 < scrollViewY1) {
		return EViewState.ABOVE;
	}
	if (elemY2 > scrollViewY2) {
		return EViewState.BELOW;
	}
	return EViewState.INSIDE;
};

/**
 * Scroll into item
 */
export const scrollIntoElement = (scrollWindow: HTMLElement, scrollItem: HTMLElement, activeState: EViewState): void => {
	if (activeState === EViewState.ABOVE) {
		scrollWindow.scrollTop = (scrollItem.offsetTop - scrollWindow.offsetTop);
	} else {
		scrollWindow.scrollTop = (scrollItem.offsetTop - scrollWindow.offsetTop - scrollWindow.clientHeight + scrollItem.clientHeight);
	}
};
