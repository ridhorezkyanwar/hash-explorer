# 🖥️ Cryptographic Hash Explorer

A terminal-style web application that visualizes cryptographic hash functions with a hacker aesthetic. Features Matrix rain background, CRT scanline effects, and real-time avalanche effect demonstration.

🌐 **Live:** [hash-explorer.vercel.app](https://hash-explorer.vercel.app)

## ✨ Features

- 🧮 **Multi-Algorithm Support** - SHA-1, SHA-256, SHA-384, SHA-512
- 🌧️ **Matrix Rain Background** - Subtle Japanese katakana + binary animation
- 📺 **CRT Terminal UI** - Scanlines, vignette, monospace font
- ⚡ **Avalanche Effect Lab** - Visualize how 1 character change affects ~50% of output bits
- 🔢 **Binary View** - Toggle between hex and binary representation
- 🎬 **Boot Sequence** - Terminal-style initialization animation
- 📋 **One-Click Copy** - Copy any hash to clipboard instantly
- ⚙️ **100% Client-Side** - Uses Web Crypto API, no backend needed

## 🛠️ Tech Stack (2026 Edition)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Animation | Motion |
| Crypto | Web Crypto API |
| Deployment | Vercel |

## 🎓 Cryptography Concepts Demonstrated

### Hash Functions
One-way mathematical functions that map arbitrary-size data to fixed-size output.

### Avalanche Effect
A desirable property where a small change in input (even 1 bit) causes ~50% of output bits to change. This is critical for cryptographic security.

### SHA Family
- **SHA-1** (160 bits) - Deprecated, collision attacks found
- **SHA-256** (256 bits) - Current standard for most applications
- **SHA-384** (384 bits) - Higher security variant
- **SHA-512** (512 bits) - Maximum security in SHA-2 family

## 🚀 Getting Started

```bash
git clone https://github.com/ridhorezkyanwar/hash-explorer.git
cd hash-explorer
npm install
npm run dev