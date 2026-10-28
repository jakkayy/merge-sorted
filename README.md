# merge-sorted

TypeScript implementation of:

```
merge(collection_1: number[], collection_2: number[], collection_3: number[]): number[]
```

Returns all elements sorted ascending, given:

- `collection_1`, `collection_2` are already sorted ascending (min 0 → max)
- `collection_3` is already sorted descending (max → min 0)

## Approach

No sort function is used. The solution is a three-pointer merge: it reads
`collection_1` and `collection_2` forward and `collection_3` backward (which
gives ascending order), and at each step appends the smallest current value.

- Time complexity: O(n1 + n2 + n3)
- Space complexity: O(n1 + n2 + n3) for the result; inputs are not mutated

## Requirements

- [Bun](https://bun.sh) 1.x

```bash
curl -fsSL https://bun.sh/install | bash
```

## Setup

```bash
git clone https://github.com/jakkayy/merge-sorted.git
cd merge-sorted
bun install
```

## Run the code

```bash
bun start
```

Expected output:

```
collection_1: [ 0, 3, 8, 12 ]
collection_2: [ 1, 4, 4, 20 ]
collection_3: [ 15, 9, 5, 2, 0 ]
merged      : [ 0, 0, 1, 2, 3, 4, 4, 5, 8, 9, 12, 15, 20 ]
```

## Run unit tests

```bash
bun test
```

Tests cover a typical case, empty inputs, a single non-empty collection,
uneven lengths, duplicates, input immutability, and 200 randomized cases
checked for ordering and element counts.

## Project structure

```
src/merge.ts         merge implementation
src/index.ts         demo entry point
test/merge.test.ts   unit tests
```
