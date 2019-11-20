export function range(to: number): number[];
export function range(from: number, to: number): number[];
export function range(from: number, to: number, step: number): number[];
export function range(lo: number, hi?: number, step?: number): number[] {
  if (hi == null) {
    hi = lo;
    lo = 0;
  }
  if (step == null || step <= 0) {
    step = 1;
  }

  const result = [];
  while (lo < hi) {
    result.push(lo);
    lo += step;
  }
  return result;
}