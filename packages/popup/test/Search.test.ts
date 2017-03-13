import { makeSlicedText } from './../src/utils/Search';

it('should slice banana in 3 parts', () => {
    const sliced = makeSlicedText('banana', 2, 1);
    expect(sliced).toEqual(['ba', 'n', 'ana']);
});

it('should slice banana in 3 parts, with second empty', () => {
    const sliced = makeSlicedText('banana', 3, 0);
    expect(sliced).toEqual(['ban', '', 'ana']);
});

it('should slice banana in 3 parts', () => {
    const sliced = makeSlicedText('banana', 0, 2);
    expect(sliced).toEqual(['', 'ba', 'nana']);
});


