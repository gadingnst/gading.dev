/**
 * get a range of numbers
 * @param min - start of number
 * @param max - end of number
 * @returns {number[]} - array of number from min into max
 */
function range(min: number, max: number): number[] {
  const arr = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
}

export default range;
