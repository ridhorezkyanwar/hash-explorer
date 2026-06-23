"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal as TerminalIcon, 
  Copy, 
  Check, 
  Binary,
  Zap,
  FileText,
} from "lucide-react";
import { 
  computeAllHashes, 
  calculateHammingDistance,
  hexToBinary,
  type HashResult,
  type HashAlgorithm,
} from "@/app/lib/hashEngine";

export default function Terminal() {
  const [input, setInput] = useState("Hello, World!");
  const [compareInput, setCompareInput] = useState("Hello, World!");
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [compareHashes, setCompareHashes] = useState<HashResult[]>([]);
  const [copiedAlgo, setCopiedAlgo] = useState<string | null>(null);
  const [showBinary, setShowBinary] = useState(false);
  const [typedInput, setTypedInput] = useState("");
  const [isBootComplete, setIsBootComplete] = useState(false);

  // Boot sequence animation (hacker vibe!)
  useEffect(() => {
    const bootLines = [
      "> Initializing cryptographic engine...",
      "> Loading SHA family algorithms...",
      "> Web Crypto API: ACTIVE",
      "> System ready.",
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let currentText = "";
    
    const interval = setInterval(() => {
      if (lineIndex >= bootLines.length) {
        clearInterval(interval);
        setIsBootComplete(true);
        return;
      }
      
      if (charIndex < bootLines[lineIndex].length) {
        currentText += bootLines[lineIndex][charIndex];
        setTypedInput(currentText);
        charIndex++;
      } else {
        currentText += "\n";
        setTypedInput(currentText);
        lineIndex++;
        charIndex = 0;
      }
    }, 25);
    
    return () => clearInterval(interval);
  }, []);

  // Compute hashes saat input berubah
  useEffect(() => {
    if (input) {
      computeAllHashes(input).then(setHashes);
    }
    if (compareInput) {
      computeAllHashes(compareInput).then(setCompareHashes);
    }
  }, [input, compareInput]);

  const copyToClipboard = (text: string, algo: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAlgo(algo);
    setTimeout(() => setCopiedAlgo(null), 2000);
  };

  const getAvalancheStats = (algo: HashAlgorithm) => {
    const h1 = hashes.find(h => h.algorithm === algo);
    const h2 = compareHashes.find(h => h.algorithm === algo);
    if (!h1 || !h2) return null;
    
    const b1 = hexToBinary(h1.hex);
    const b2 = hexToBinary(h2.hex);
    const diff = calculateHammingDistance(b1, b2);
    const percent = (diff / b1.length) * 100;
    return { diff, total: b1.length, percent };
  };

  if (!isBootComplete) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono p-8">
        <pre className="whitespace-pre-wrap">{typedInput}<span className="animate-pulse">█</span></pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 -z-10">
        <MatrixRain />
      </div>

      {/* Scanline effect */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-10"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,255,65,0.15), rgba(0,255,65,0.15) 1px, transparent 1px, transparent 2px)"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-10">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-green-500/30 rounded-t-lg bg-black/80 backdrop-blur"
        >
          <div className="flex items-center gap-2 px-4 py-2 border-b border-green-500/30 bg-green-500/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-xs text-green-500/70">
              ridho@crypto-lab:~/hash-explorer
            </div>
            <TerminalIcon className="w-4 h-4 text-green-500/70" />
          </div>
          
          {/* Title */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 text-green-500/70 text-sm mb-2">
              <span>$</span>
              <span>./hash_explorer --init</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-green-400 mb-2 tracking-tight">
              &gt; CRYPTOGRAPHIC HASH EXPLORER
            </h1>
            <p className="text-green-500/70 text-sm md:text-base">
              [SYSTEM] Visualizing SHA family algorithms & avalanche effect
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="border-x border-green-500/30 bg-black/80 backdrop-blur p-6 md:p-8 space-y-6">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="flex items-center gap-2 text-green-500/70 text-sm mb-2">
              <span className="text-green-400">$</span>
              <span>INPUT_MESSAGE</span>
              <span className="animate-pulse">_</span>
            </label>
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-green-300 placeholder-green-500/30 focus:outline-none focus:border-green-400 focus:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all font-mono resize-none"
                rows={3}
                placeholder="Type something..."
              />
              <button
                onClick={() => setShowBinary(!showBinary)}
                className="absolute top-2 right-2 p-2 text-green-500/50 hover:text-green-400 hover:bg-green-500/10 rounded transition-all"
                title="Toggle binary view"
              >
                <Binary className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Hash Results */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-500/70 text-sm">
              <span className="text-green-400">$</span>
              <span>OUTPUT_HASHES</span>
            </div>
            
            {hashes.map((hash, idx) => {
              const stats = getAvalancheStats(hash.algorithm);
              return (
                <motion.div
                  key={hash.algorithm}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="border border-green-500/30 rounded bg-black/50 hover:border-green-400/50 transition-all group"
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-green-500/20 bg-green-500/5">
                    <div className="flex items-center gap-3">
                      <span className="text-green-400 font-bold">{hash.algorithm}</span>
                      <span className="text-xs text-green-500/50">{hash.length} bits</span>
                      {stats && stats.percent > 0 && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                          <Zap className="w-3 h-3" />
                          {stats.percent.toFixed(1)}% diff
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => copyToClipboard(hash.hex, hash.algorithm)}
                      className="flex items-center gap-1 text-xs text-green-500/70 hover:text-green-400 transition-colors"
                    >
                      {copiedAlgo === hash.algorithm ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="text-green-300 text-sm break-all font-mono leading-relaxed">
                      {showBinary ? (
                        <span className="text-green-400/80">{hash.binary}</span>
                      ) : (
                        <>
                          {hash.hex.split("").map((char, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, color: "#ffffff" }}
                              animate={{ opacity: 1, color: "#4ade80" }}
                              transition={{ delay: i * 0.01, duration: 0.3 }}
                            >
                              {char}
                            </motion.span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Avalanche Effect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="border border-yellow-500/30 rounded bg-yellow-500/5 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-bold text-yellow-400">
                AVALANCHE EFFECT LAB
              </h2>
            </div>
            <p className="text-yellow-500/70 text-sm mb-4">
              [INFO] A good hash function should change ~50% of output bits when even 1 input bit changes.
              Try modifying the compare input slightly!
            </p>
            
            <label className="flex items-center gap-2 text-yellow-500/70 text-sm mb-2">
              <span className="text-yellow-400">$</span>
              <span>COMPARE_MESSAGE</span>
            </label>
            <textarea
              value={compareInput}
              onChange={(e) => setCompareInput(e.target.value)}
              className="w-full bg-black border border-yellow-500/30 rounded px-4 py-3 text-yellow-300 placeholder-yellow-500/30 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all font-mono resize-none mb-4"
              rows={2}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as HashAlgorithm[]).map(algo => {
                const stats = getAvalancheStats(algo);
                if (!stats) return null;
                const isGood = stats.percent >= 45 && stats.percent <= 55;
                return (
                  <div 
                    key={algo}
                    className={`p-3 rounded border ${
                      isGood 
                        ? "border-green-500/50 bg-green-500/10" 
                        : "border-red-500/50 bg-red-500/10"
                    }`}
                  >
                    <div className="text-xs text-green-500/70 mb-1">{algo}</div>
                    <div className={`text-xl font-bold ${isGood ? "text-green-400" : "text-red-400"}`}>
                      {stats.percent.toFixed(1)}%
                    </div>
                    <div className="text-xs text-green-500/50">
                      {stats.diff}/{stats.total} bits
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border border-green-500/30 rounded-b-lg bg-black/80 backdrop-blur px-6 py-3 flex items-center justify-between text-xs text-green-500/50"
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              SYSTEM ONLINE
            </span>
            <span>built by @ridhorezkyanwar</span>
          </div>
          <div>Web Crypto API • SHA Family</div>
        </motion.div>
      </div>
    </div>
  );
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01アイウエオカキクケコ";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff4115";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
}