# 🖥️ Cryptographic Hash Explorer

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=18&duration=2600&pause=850&color=58A6FF&center=true&vCenter=true&width=520&lines=Build+%E2%80%A2+Test+%E2%80%A2+Improve" alt="Animated banner: Build, Test, Improve" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js badge" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript badge" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS badge" />
  <img src="https://img.shields.io/badge/Web%20Crypto%20API-3C873A?style=flat-square" alt="Web Crypto API badge" />
</p>


A terminal-style web application that visualizes cryptographic hash functions with a hacker aesthetic. Features Matrix rain background, CRT scanline effects, and real-time avalanche effect demonstration.

🌐 **Live:** [hash-explorer-six.vercel.app](https://hash-explorer-six.vercel.app/)

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