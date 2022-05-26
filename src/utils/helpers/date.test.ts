import date from './date';

describe('formatting Post date function', () => {
  it('should be return `en` format', () => {
    expect(date('1998-10-18', 'en')).toBe('October 18, 1998');
  });
  it('should be return `id` format', () => {
    expect(date('1998-10-18', 'id')).toBe('18 Oktober 1998');
  });
  it('should be return `en` format with custom format', () => {
    expect(date('1998-10-18', 'en', 'DD MMMM YYYY')).toBe('18 October 1998');
  });
});
