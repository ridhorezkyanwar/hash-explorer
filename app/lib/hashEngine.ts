export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export type HashResult = {
  algorithm: HashAlgorithm;
  hex: string;
  binary: string;
  length: number;
};

export async function computeHash(
  input: string,
  algorithm: HashAlgorithm
): Promise<HashResult> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  
  const hex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  const binary = hashArray.map(b => b.toString(2).padStart(8, "0")).join(" ");
  
  return {
    algorithm,
    hex,
    binary,
    length: hashArray.length * 8,
  };
}

export async function computeAllHashes(input: string): Promise<HashResult[]> {
  const algorithms: HashAlgorithm[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
  return Promise.all(algorithms.map(algo => computeHash(input, algo)));
}

// Hitung perbedaan bit antara 2 hash (untuk avalanche effect)
export function calculateHammingDistance(bits1: string, bits2: string): number {
  if (!/^[01]*$/.test(bits1) || !/^[01]*$/.test(bits2)) {
    throw new TypeError("Hamming distance inputs must be binary strings.");
  }
  if (bits1.length !== bits2.length) {
    throw new RangeError("Hamming distance inputs must have equal lengths.");
  }

  let distance = 0;
  for (let i = 0; i < bits1.length; i++) {
    if (bits1[i] !== bits2[i]) distance++;
  }
  return distance;
}

// Convert a valid hexadecimal digest to a contiguous binary string for visualization.
export function hexToBinary(hex: string): string {
  if (!/^[0-9a-f]+$/i.test(hex)) {
    throw new TypeError("Input must be a non-empty hexadecimal string.");
  }
  return hex
    .split("")
    .map((character) => Number.parseInt(character, 16).toString(2).padStart(4, "0"))
    .join("");
}