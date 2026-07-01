export function getRandomElement<T>(array: T[]) {
  if (array.length === 0) {
    throw new Error("Array cannot be empty");
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
