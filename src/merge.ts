export function merge(
  collection_1: number[],
  collection_2: number[],
  collection_3: number[]
): number[] {
  const n1 = collection_1.length;
  const n2 = collection_2.length;
  const result: number[] = new Array(n1 + n2 + collection_3.length);

  let i = 0;
  let j = 0;
  let k = collection_3.length - 1;
  let out = 0;

  while (i < n1 || j < n2 || k >= 0) {
    let source = 0;
    let smallest = Infinity;

    if (i < n1 && collection_1[i]! < smallest) {
      smallest = collection_1[i]!;
      source = 1;
    }
    if (j < n2 && collection_2[j]! < smallest) {
      smallest = collection_2[j]!;
      source = 2;
    }
    if (k >= 0 && collection_3[k]! < smallest) {
      smallest = collection_3[k]!;
      source = 3;
    }

    result[out++] = smallest;
    if (source === 1) i++;
    else if (source === 2) j++;
    else k--;
  }

  return result;
}
