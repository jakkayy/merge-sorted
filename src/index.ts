import { merge } from "./merge";

const collection_1 = [0, 3, 8, 12];
const collection_2 = [1, 4, 4, 20];
const collection_3 = [15, 9, 5, 2, 0];

console.log("collection_1:", collection_1);
console.log("collection_2:", collection_2);
console.log("collection_3:", collection_3);
console.log("merged      :", merge(collection_1, collection_2, collection_3));
