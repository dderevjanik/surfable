import { getFaviconUrl, shortenUrl } from './../src/utils/CommandHelper';

describe('getFaviconUrl()', () => {

    test('should replace undefined faviconUrl with default', () => {
        const url = getFaviconUrl(undefined);
        expect(url).toEqual('https://image.flaticon.com/icons/png/128/12/12195.png');
    });

    test('should replace chrome\'s internal url with default', () => {
        const url = getFaviconUrl('chrome://settings');
        expect(url).toEqual('https://image.flaticon.com/icons/png/128/12/12195.png');
    });

    test('should not replace good favicon url', () => {
        const url = getFaviconUrl('www.google.com');
        expect(url).toEqual('www.google.com');
    });


});

describe('shortenUrl()', () => {

    test('should shorten url by \'http://\'', () => {
        const url = shortenUrl('http://www.google.com');
        expect(url).toEqual('www.google.com');
    });

    test('should shorten url by \'https://\'', () => {
        const url = shortenUrl('https://www.facebook.com');
        expect(url).toEqual('www.facebook.com');
    })

    test('should not short url without http or https', () => {
        const url = shortenUrl('www.twitter.com');
        expect(url).toEqual('www.twitter.com');
    });

});
