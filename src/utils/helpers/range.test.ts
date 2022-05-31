import range from './range';

describe('range', () => {
  it('should return an array of numbers from min to max', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });
});
