import createContentLocales from './locales';

const withLocales = createContentLocales({
  test: {
    en: 'Test!',
    id: 'Tes!'
  },
  hello: {
    en: 'Hello',
    id: 'Halo'
  }
});

describe('convert content locales data function', () => {
  it('should be return `en` locale properly', () => {
    const enLocales = withLocales('en');
    expect(enLocales.test).toBe('Test!');
    expect(enLocales.hello).toBe('Hello');
  });
  it('should be return `id` locale properly', () => {
    const idLocales = withLocales('id');
    expect(idLocales.test).toBe('Tes!');
    expect(idLocales.hello).toBe('Halo');
  });
});
