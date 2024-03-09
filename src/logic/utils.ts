export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function reorderArray<T>(arr: T[], index: number): T[] {
  if (index < 0) {
    throw new Error("Given index does not exist in its array.");
  }
  if (arr.length < index) {
    throw new Error("Given index is bigger than its array length.");
  }
  return arr.concat(arr).slice(index, index + arr.length);
}
