/* eslint-disable no-constant-condition */
import clsxm from './clsxm';

describe('clsxm helper test', () => {
  describe('clsxm() normal cases', () => {
    it('`clsxm()` should return empty string', () => {
      expect(clsxm()).toBe('');
    });
    it('`clsxm("mx-8")` should return "mx-8"', () => {
      expect(clsxm('mx-8')).toBe('mx-8');
    });
    it('`clsxm("mx-8", "py-4")` should return "mx-8 py-4"', () => {
      expect(clsxm('mx-8', 'py-4')).toBe('mx-8 py-4');
    });
  });

  describe('clsxm() overriding case', () => {
    it('`clsxm("mx-8", "py-4", "mx-12")` should return "py-4 mx-12"', () => {
      expect(clsxm('mx-8', 'py-4', 'mx-12')).toBe('py-4 mx-12');
    });
  });

  describe('clsxm() conditional class', () => {
    it('`clsxm("mx-8", "py-4", true ? "bg-gray" : "bg-red")` should return "mx-8 py-4 bg-gray"', () => {
      const cases = clsxm(
        'mx-8',
        'py-4',
        true ? 'bg-gray' : 'bg-red'
      );
      expect(cases).toBe('mx-8 py-4 bg-gray');
    });

    const mockBtnClass = (disabled: boolean) => clsxm(
      'mx-8',
      'py-4',
      [
        disabled && [
          'bg-gray',
          'cursor-not-allowed'
        ],
        !disabled && [
          'bg-red',
          'cursor-pointer'
        ]
      ]
    );
    it('should return "mx-8 py-4 bg-gray cursor-not-allowed"', () => {
      expect(mockBtnClass(true)).toBe('mx-8 py-4 bg-gray cursor-not-allowed');
    });
    it('should return "mx-8 py-4 bg-red cursor-pointer', () => {
      expect(mockBtnClass(false)).toBe('mx-8 py-4 bg-red cursor-pointer');
    });
  });
});
