import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const uniqBy = <T>(arr: T[], testFn: (item: T) => unknown): T[] => {
  const seen = new Set();
  return arr.filter((item) => {
    const keyValue = testFn(item);
    if (seen.has(keyValue)) {
      return false;
    }
    seen.add(keyValue);
    return true;
  });
};
