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
export function calculateHammingDistance(hash1: string, hash2: string): number {
  if (hash1.length !== hash2.length) return 0;
  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) distance++;
  }
  return distance;
}

// Convert hex ke binary untuk visualisasi
export function hexToBinary(hex: string): string {
  return hex.split("").map(c => 
    parseInt(c, 16).toString(2).padStart(4, "0")
  ).join("");
}