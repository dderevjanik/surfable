/**
 * Add item to limited stack
 */
export const addToStack = <T>(stack: T[], item: T, stackSize: number): T[] =>
	(stack.length > stackSize)
		? [item, ...stack.slice(1, stack.length)]
		: [...stack, item];

/**
 * Add new item to array
 */
export const addItem = <T>(array: T[], item: T): T[] =>
	[...array, item];

/**
 * Remove item from specific index
 */
export const removeItem = <T>(array: T[], index: number): T[] => {
	if (index === -1) {
		throw new Error(`Index '${index}' is longer than array`);
	}
	return [
		...array.slice(0, index),
		...array.slice(index + 1, array.length)
	];
};

/**
 * Update item on specific index
 */
export const updateItem = <T>(array: T[], item: T, index: number): T[] => {
	if (index === -1) {
		throw new Error(`Index '${index}' is longer than array`);
	}
	return [
		...array.slice(0, index),
		item,
		...array.slice(index + 1, array.length)
	];
};
