import { addItem, addToStack, includes, removeItem, updateItem } from './../src/utils/Immutable';


describe('addItem()', () => {

    test('should addItem to empty array', () => {
        const array = addItem([], 1);
        expect(array).toEqual([1]);
    });

    test('should addItem to array with one item', () => {
        const array1 = [1];
        const array2 = addItem(array1, 2);
        array1[0] = 5;
        expect(array2).toEqual([1, 2]);
    });

    test('should addItem to array with several items', () => {
        const array1 = ['d', 'b', 'c', 'e'];
        const array2 = addItem(array1, 'a');
        array1[0] = 'c';
        array1[3] = 'd';
        expect(array2).toEqual(['d', 'b', 'c', 'e', 'a']);
    });

});

describe('addToStack()', () => {

    test('should add item to empty stack', () => {
        const stack1: number[] = [];
        const stack2 = addToStack(stack1, 1, 4);
        expect(stack2).toEqual([1]);
    });

    test('should add item to stack with one item', () => {
        const stack1 = [1];
        const stack2 = addToStack(stack1, 2, 4);
        stack1[0] = 2;
        expect(stack2).toEqual([2, 1]);
    });

    test('should add item to stack with several items', () => {
        const stack1 = [1, 2, 3];
        const stack2 = addToStack(stack1, 2, 4);
        stack1[0] = 2;
        stack1[2] = 4;
        expect(stack2).toEqual([2, 1, 2, 3]);
    });

    test('should add item to full stack', () => {
        const stack1 = [1, 2, 3, 4, 5];
        const stack2 = addToStack(stack1, 6, 5);
        stack1[0] = 2;
        stack1[4] = 3;
        expect(stack2).toEqual([6, 1, 2, 3, 4]);
    });

    test('should add two items to full stack', () => {
        const stack1 = [1, 2, 3, 4, 5];
        const stack2 = addToStack(stack1, 6, 5);
        const stack3 = addToStack(stack2, 7, 5);
        stack1[0] = 2;
        stack1[4] = 3;
        stack2[0] = 4;
        stack2[4] = 3;
        expect(stack3).toEqual([7, 6, 1, 2, 3]);
    });

});

describe('includes()', () => {

    test('should return True for match', () => {
        const include = includes([1, 2, 3, 4, 5], 5);
        expect(include).toBe(true);
    });

    test('should return True for match, if there two items', () => {
        const include = includes([1, 2, 3, 4, 5], 6);
        expect(include).toBe(false);
    });

    test('should return False for no match', () => {
        const include = includes([1, 2, 3, 3, 5], 3);
        expect(include).toBe(true);
    });

});

describe('removeItem()', () => {

    test('should remove the only one item', () => {
        const array1 = [1];
        const array2 = removeItem(array1, 0);
        expect(array2).toEqual([]);
    });

    test('should remove first item', () => {
        const array1 = [1, 2];
        const array2 = removeItem(array1, 0);
        array1[0] = 3;
        expect(array2).toEqual([2]);
    });

    test('should remove an item', () => {
        const array1 = [1, 2, 3];
        const array2 = removeItem(array1, 1);
        array1[0] = 4;
        array1[1] = 5;
        expect(array2).toEqual([1, 3]);
    })

    test('should remove last item', () => {
        const array1 = [1, 2, 3];
        const array2 = removeItem(array1, 2);
        expect(array2).toEqual([1, 2]);
    });

});

describe('updateItem()', () => {

    test('should update first item', () => {
        const array1 = [1, 2, 3];
        const array2 = updateItem(array1, 3, 0);
        array1[0] = 5;
        expect(array2).toEqual([3, 2, 3]);
    });

    test('should update an item', () => {
        const array1 = [1, 2, 3];
        const array2 = updateItem(array1, 6, 1);
        array1[0] = 5;
        expect(array2).toEqual([1, 6, 3]);
    });

    test('should update last item', () => {
        const array1 = [1, 2, 3, 4, 5];
        const array2 = updateItem(array1, 8, 4);
        array1[0] = 5;
        array1[4] = 7;
        expect(array2).toEqual([1, 2, 3, 4, 8]);
    });

});
