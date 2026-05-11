"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState("");
  const [displayedSummary, setDisplayedSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "> Neural matrix initialized",
    "> Quantum cognition engine online",
    "> Global intelligence feeds synchronized",
  ]);

  const [voiceActive, setVoiceActive] = useState(false);

  // PARTICLES

  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generatedParticles = [...Array(70)].map((_, index) => ({
      id: index,
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color:
        index % 2 === 0
          ? "rgba(0,255,255,0.8)"
          : "rgba(0,255,120,0.8)",
    }));

    setParticles(generatedParticles);
  }, []);

  // METRICS

  const metrics = useMemo(() => {
    return [
      ["Quantum Nodes", "148"],
      ["AI Confidence", "99.2%"],
      ["Realtime Feeds", "12,847"],
      ["Neural Agents", "24"],
      ["Latency", "0.01ms"],
      ["Prediction Accuracy", "98.9%"],
    ];
  }, []);

  // STREAMING SUMMARY

  useEffect(() => {
    if (!summary) return;

    let index = 0;

    setDisplayedSummary("");

    const interval = setInterval(() => {
      index++;

      setDisplayedSummary(summary.slice(0, index));

      if (index >= summary.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [summary]);

  // SEARCH

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

    setResults([]);
    setSummary("");
    setDisplayedSummary("");

    setTerminalLogs((prev) => [
      ...prev,
      `> Initiating neural scan: ${query}`,
      "> Connecting to global intelligence feeds",
      "> Synthesizing predictive cognition",
    ]);

    try {
      const response = await fetch(
        `https://maaad-brains.onrender.com/search?query=${encodeURIComponent(
          query
        )}`
      );

      const data = await response.json();

      setResults(data.results || []);

      setTimeout(() => {
        setSummary(
          data.summary || "No intelligence summary available."
        );

        setTerminalLogs((prev) => [
          ...prev,
          "> Intelligence synthesis complete",
          "> Deep neural analysis generated",
        ]);
      }, 1200);
    } catch (error) {
      console.error("SEARCH ERROR:", error);

      setSummary(
        "Unable to connect to neural intelligence backend."
      );
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // EXPORT PDF

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.text("MAAAD BRAINS REPORT", 20, 20);

    doc.setFontSize(12);

    const splitSummary = doc.splitTextToSize(summary, 170);

    doc.text(splitSummary, 20, 40);

    doc.save("MAAAD_BRAINS_REPORT.pdf");
  };

  // VOICE SEARCH

  const activateVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    setVoiceActive(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;

      setQuery(transcript);

      setVoiceActive(false);
    };

    recognition.onerror = () => {
      setVoiceActive(false);
    };
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-y-auto">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00111f_0%,black_70%)]"></div>

      {/* GRID */}

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      {/* PARTICLES */}

      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          animate={{
            y: [0, -180, 0],
            x: [0, 120, 0],
            opacity: [0.1, 1, 0.1],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: 10 + index * 0.2,
            repeat: Infinity,
          }}
          className="absolute rounded-full"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            background: particle.color,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
        />
      ))}

      {/* HEADER */}

      <div className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-cyan-500/10 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
            className="w-4 h-4 rounded-full bg-green-400"
          />

          <span className="text-cyan-400 uppercase tracking-[0.4em] text-sm">
            Neural Quantum Matrix Online
          </span>
        </div>

        <div className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
          MAAAD BRAINS • SEARCH ENGINE
        </div>
      </div>

      <div className="relative z-10 p-2 lg:scale-[0.82] origin-top">
        <div className="grid grid-cols-12 gap-5 min-h-[calc(100vh-90px)]">
          
          {/* LEFT */}

          <div className="col-span-3">
            <div className="bg-white/5 backdrop-blur-3xl border border-cyan-500/20 rounded-[40px] p-6 h-full overflow-y-auto">
              <div className="text-cyan-400 uppercase tracking-[0.35em] text-sm mb-6">
                AI AGENTS
              </div>

              <div className="space-y-5">
                {[
                  ["Agent Nova", "Trend Forecasting"],
                  ["Agent Sigma", "Market Intelligence"],
                  ["Agent Echo", "Global Scanning"],
                  ["Agent Alpha", "Predictive Analysis"],
                  ["Agent Orion", "Competitor Mapping"],
                ].map((agent, index) => (
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                    }}
                    key={index}
                    className="p-5 rounded-3xl bg-cyan-500/5 border border-cyan-500/10"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        animate={{
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                        }}
                        className="w-3 h-3 rounded-full bg-green-400"
                      />

                      <div className="text-cyan-300 font-bold">
                        {agent[0]}
                      </div>
                    </div>

                    <div className="text-zinc-400 text-sm">
                      {agent[1]}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER */}

          <div className="col-span-6">
            <h1 className="text-[95px] xl:text-[105px] leading-[0.85] font-black tracking-tight mb-8">
              <span className="text-white">MAAAD</span>

              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-blue-500 to-green-400 bg-clip-text text-transparent">
                BRAINS
              </span>
            </h1>

            {/* SEARCH */}

            <div className="relative mb-8">
              <div className="bg-white/5 backdrop-blur-3xl border border-cyan-500/20 rounded-[40px] p-5">
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Initialize neural intelligence scan..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    className="flex-1 bg-transparent outline-none text-xl text-white px-6 py-4 placeholder:text-zinc-500"
                  />

                  <button
                    onClick={activateVoice}
                    className={`px-6 py-4 rounded-3xl font-black ${
                      voiceActive
                        ? "bg-red-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    🎤
                  </button>

                  <button
                    onClick={handleSearch}
                    className="px-8 py-4 rounded-3xl bg-gradient-to-r from-cyan-400 to-green-400 text-black font-black"
                  >
                    {loading ? "SCANNING..." : "SCAN"}
                  </button>

                  {summary && (
                    <button
                      onClick={exportPDF}
                      className="px-8 py-4 rounded-3xl bg-white text-black font-black"
                    >
                      EXPORT
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* TERMINAL */}

            <div className="bg-black/50 border border-green-400/20 rounded-[30px] p-6 mb-8 font-mono">
              <div className="text-green-400 mb-4 uppercase tracking-[0.3em] text-sm">
                Neural Terminal
              </div>

              <div className="space-y-2 text-green-300 text-sm">
                {terminalLogs.slice(-8).map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}

            {displayedSummary && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-white/5 backdrop-blur-3xl border border-cyan-500/20 rounded-[40px] p-10 max-h-[700px] overflow-y-auto"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-4 h-4 rounded-full bg-green-400"></div>

                  <h2 className="text-3xl font-black text-cyan-400">
                    Deep Intelligence Matrix
                  </h2>
                </div>

                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className="text-zinc-300 text-xl leading-10 whitespace-pre-line"
                >
                  {displayedSummary}
                </motion.p>
              </motion.div>
            )}
          </div>

          {/* RIGHT */}

          <div className="col-span-3">
            <div className="bg-white/5 backdrop-blur-3xl border border-cyan-500/20 rounded-[40px] p-8 h-full overflow-y-auto">
              
              {/* ANIMATED AI CORE */}

              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                    },
                  }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      rotate: -360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-[-18px] rounded-full border border-cyan-400/20"
                  />

                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-[-35px] rounded-full border border-green-400/10"
                  />

                  <div className="absolute inset-0 bg-cyan-400 blur-[120px] opacity-30 rounded-full"></div>

                  <Image
                    src="/logo.jpg"
                    alt="AI Core"
                    width={150}
                    height={150}
                    className="relative rounded-full border border-cyan-400/30 shadow-[0_0_120px_rgba(0,255,255,0.25)]"
                    priority
                  />
                </motion.div>
              </div>

              {/* METRICS */}

              <div className="space-y-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                    }}
                    key={index}
                    className="bg-cyan-500/5 border border-cyan-500/10 rounded-3xl p-6"
                  >
                    <div className="text-cyan-400 text-sm uppercase tracking-[0.35em] mb-3">
                      {metric[0]}
                    </div>

                    <div className="text-3xl font-black text-white">
                      {metric[1]}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}