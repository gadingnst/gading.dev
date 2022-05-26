import { isURL, parseQuery } from './url';

describe('url helper test', () => {
  describe('isURL() function', () => {
    it('`http://example.com` should be true', () => {
      expect(isURL('http://example.com')).toBe(true);
    });

    it('`https://example.com` should be true', () => {
      expect(isURL('https://example.com')).toBe(true);
    });

    it('`http://.` should be false', () => {
      expect(isURL('http://')).toBe(false);
    });

    it('`https://` should be false', () => {
      expect(isURL('https://')).toBe(false);
    });

    it('`example.com` should be false', () => {
      expect(isURL('example.com')).toBe(false);
    });

    it('`example` should be false', () => {
      expect(isURL('example')).toBe(false);
    });
  });

  describe('parseQuery() function', () => {
    it('`/home` should be {}', () => {
      expect(parseQuery('/home')).toEqual({});
    });

    it('`/?referer=home` should be { referer: "home" }', () => {
      expect(parseQuery('/?referer=home')).toEqual({ referer: 'home' });
    });

    it('`/?ids=1,2,3` should be { ids: "1,2,3" }', () => {
      expect(parseQuery('/?ids=1,2,3')).toEqual({ ids: '1,2,3' });
    });
  });
});
