import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateHammingDistance,
  computeHash,
  computeAllHashes,
  hexToBinary,
} from "../app/lib/hashEngine.ts";

test("SHA-256 matches the published digest for the known abc test vector", async () => {
  const result = await computeHash("abc", "SHA-256");
  assert.equal(
    result.hex,
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
  assert.equal(result.length, 256);
  assert.equal(result.binary.replaceAll(" ", "").length, 256);
});

test("all supported algorithms return the expected bit lengths", async () => {
  const results = await computeAllHashes("sample input");
  assert.deepEqual(
    results.map((result) => result.algorithm),
    ["SHA-1", "SHA-256", "SHA-384", "SHA-512"],
  );
  assert.deepEqual(results.map((result) => result.length), [160, 256, 384, 512]);
});

test("hexadecimal conversion creates four binary bits per digit", () => {
  assert.equal(hexToBinary("0f"), "00001111");
  assert.equal(hexToBinary("a5"), "10100101");
});

test("Hamming distance counts changed bits, not changed characters", () => {
  assert.equal(calculateHammingDistance("0000", "1111"), 4);
  assert.equal(calculateHammingDistance("10101010", "10101011"), 1);
});

test("an avalanche comparison for distinct inputs uses the full digest width", async () => {
  const first = await computeHash("hello", "SHA-256");
  const second = await computeHash("hellO", "SHA-256");
  const firstBits = hexToBinary(first.hex);
  const secondBits = hexToBinary(second.hex);
  const distance = calculateHammingDistance(firstBits, secondBits);
  assert.ok(distance > 0);
  assert.ok(distance <= 256);
});
