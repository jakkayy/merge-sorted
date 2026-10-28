import { describe, it, expect } from "bun:test";
import { merge } from "../src/merge";

function isAscending(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1]! > arr[i]!) return false;
  }
  return true;
}

function countValues(arr: number[]): Map<number, number> {
  const m = new Map<number, number>();
  for (const v of arr) m.set(v, (m.get(v) ?? 0) + 1);
  return m;
}

function randomAscending(len: number): number[] {
  const out: number[] = [];
  let cur = 0;
  for (let i = 0; i < len; i++) {
    cur += Math.floor(Math.random() * 5);
    out.push(cur);
  }
  return out;
}

describe("merge", () => {
  it("merges a typical example", () => {
    expect(merge([0, 3, 8, 12], [1, 4, 4, 20], [15, 9, 5, 2, 0])).toEqual([
      0, 0, 1, 2, 3, 4, 4, 5, 8, 9, 12, 15, 20,
    ]);
  });

  it("returns an empty array when all inputs are empty", () => {
    expect(merge([], [], [])).toEqual([]);
  });

  it("works when only one collection has data", () => {
    expect(merge([0, 1, 2], [], [])).toEqual([0, 1, 2]);
    expect(merge([], [0, 5, 9], [])).toEqual([0, 5, 9]);
    expect(merge([], [], [9, 5, 0])).toEqual([0, 5, 9]);
  });

  it("works with collections of different lengths", () => {
    expect(merge([0], [1, 2, 3, 4, 5], [100, 50])).toEqual([
      0, 1, 2, 3, 4, 5, 50, 100,
    ]);
  });

  it("keeps duplicate values", () => {
    expect(merge([0, 2, 2], [2, 2], [2, 2, 0])).toEqual([
      0, 0, 2, 2, 2, 2, 2, 2,
    ]);
  });

  it("does not mutate the input arrays", () => {
    const c1 = [0, 4];
    const c2 = [1, 3];
    const c3 = [9, 2];
    merge(c1, c2, c3);
    expect(c1).toEqual([0, 4]);
    expect(c2).toEqual([1, 3]);
    expect(c3).toEqual([9, 2]);
  });

  it("produces a correctly sorted result for random inputs", () => {
    for (let run = 0; run < 200; run++) {
      const c1 = randomAscending(Math.floor(Math.random() * 50));
      const c2 = randomAscending(Math.floor(Math.random() * 50));
      const c3 = randomAscending(Math.floor(Math.random() * 50)).reverse();

      const result = merge(c1, c2, c3);

      expect(result.length).toBe(c1.length + c2.length + c3.length);
      expect(isAscending(result)).toBe(true);
      expect(countValues(result)).toEqual(countValues([...c1, ...c2, ...c3]));
    }
  });
});
