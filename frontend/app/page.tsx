"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [displayedSummary, setDisplayedSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "> Neural matrix initialized",
    "> Quantum cognition engine online",
    "> Global intelligence feeds synchronized",
  ]);

  const [particles, setParticles] = useState<
    {
      id: number;
      width: number;
      height: number;
      left: number;
      top: number;
      color: string;
    }[]
  >([]);

  // MOUNT FIX

  useEffect(() => {
    setMounted(true);
  }, []);

  // PARTICLES

  useEffect(() => {
    if (!mounted) return;

    const generatedParticles = Array.from(
      { length: 70 },
      (_, index) => ({
        id: index,
        width: Math.floor(Math.random() * 4) + 1,
        height: Math.floor(Math.random() * 4) + 1,
        left: Math.floor(Math.random() * 100),
        top: Math.floor(Math.random() * 100),
        color:
          index % 2 === 0
            ? "rgba(0,255,255,0.8)"
            : "rgba(0,255,120,0.8)",
      })
    );

    setParticles(generatedParticles);
  }, [mounted]);

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

  // STREAMING EFFECT

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
    }, 10);

    return () => clearInterval(interval);
  }, [summary]);

  // SEARCH

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

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
        `https://maaad-backend.onrender.com/search?query=${encodeURIComponent(
          query
        )}`
      );

      const data = await response.json();

      setTimeout(() => {
        setSummary(
          data.summary || "No intelligence summary available."
        );

        setTerminalLogs((prev) => [
          ...prev,
          "> Intelligence synthesis complete",
          "> Deep neural analysis generated",
        ]);
      }, 1000);
    } catch (error) {
      console.error(error);

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
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageHeight = doc.internal.pageSize.height;

  const margin = 20;

  const maxWidth = 170;

  // TITLE

  doc.setFontSize(24);

  doc.text("MAAAD BRAINS REPORT", margin, 20);

  // BODY

  doc.setFontSize(12);

  const lines = doc.splitTextToSize(summary, maxWidth);

  let y = 40;

  lines.forEach((line: string) => {
    // CREATE NEW PAGE

    if (y > pageHeight - 20) {
      doc.addPage();

      y = 20;
    }

    doc.text(line, margin, y);

    y += 8;
  });

  // SAVE FILE

  doc.save("MAAAD_BRAINS_REPORT.pdf");
};

  // VOICE SEARCH

  const activateVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition not supported");
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

  if (!mounted) {
    return <main className="min-h-screen bg-black"></main>;
  }

  return (
    <main
      suppressHydrationWarning
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00111f_0%,black_70%)]"></div>

      {/* GRID */}

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* PARTICLES */}

      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          animate={{
            y: [0, -180, 0],
            x: [0, 120, 0],
            opacity: [0.1, 1, 0.1],
            scale: [1, 1.5, 1],
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

      {/* MAIN */}

      <div className="relative z-10 p-3 scale-[0.88] origin-top">
        <div className="grid grid-cols-12 gap-5 min-h-[calc(100vh-80px)]">

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
                    key={index}
                    whileHover={{
                      scale: 1.03,
                    }}
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

            <div className="mb-10">

              <div className="text-green-400 uppercase tracking-[0.4em] text-sm mb-4">
                Autonomous Intelligence Core Active
              </div>

              <h1 className="text-[95px] leading-[0.85] font-black tracking-tight">
                <span className="text-white">
                  MAAAD
                </span>

                <br />

                <span className="bg-gradient-to-r from-cyan-300 via-blue-500 to-green-400 bg-clip-text text-transparent">
                  BRAINS
                </span>
              </h1>

            </div>

            {/* SEARCH */}

            <div className="relative mb-8">

              {loading && (
                <motion.div
                  animate={{
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-[40px] border border-cyan-400/40 shadow-[0_0_120px_rgba(0,255,255,0.3)]"
                />
              )}

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
                className="bg-white/5 backdrop-blur-3xl border border-cyan-500/20 rounded-[40px] p-10 max-h-[650px] overflow-y-auto"
              >

                <div className="flex items-center gap-4 mb-8">

                  <div className="w-4 h-4 rounded-full bg-green-400"></div>

                  <h2 className="text-3xl font-black text-cyan-400">
                    Deep Intelligence Matrix
                  </h2>

                </div>

                <div className="text-zinc-300 text-lg leading-9 whitespace-pre-line">
                  {displayedSummary}
                </div>

              </motion.div>
            )}

          </div>

          {/* RIGHT */}

          <div className="col-span-3">

            <div className="bg-white/5 backdrop-blur-3xl border border-cyan-500/20 rounded-[40px] p-8 h-full overflow-y-auto">

              {/* ROTATING LOGO */}

              <div className="flex justify-center mb-12">

                <div className="relative flex items-center justify-center w-[360px] h-[360px]">

                  {/* ROTATION DOT */}

                  <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full z-50"></div>

                  {/* OUTER SPINNING RING */}

                  <motion.div
                    animate={{
                      rotate: 180,
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      absolute
                      w-[360px]
                      h-[360px]
                      rounded-full
                      border
                      border-cyan-400/20
                    "
                  />

                  {/* INNER SPINNING RING */}

                  <motion.div
                    animate={{
                      rotate: -360,
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      absolute
                      w-[290px]
                      h-[290px]
                      rounded-full
                      border
                      border-green-400/20
                    "
                  />

                  {/* GLOW */}

                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="
                      absolute
                      w-[250px]
                      h-[250px]
                      bg-cyan-400/30
                      blur-[120px]
                      rounded-full
                    "
                  />

                  {/* ACTUAL LOGO */}

                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                      },
                    }}
                    className="relative z-20"
                  >

                    <img
                      src="/logo.jpg"
                      alt="AI Core"
                      className="
                        w-[240px]
                        h-[240px]
                        rounded-full
                        object-cover
                        border
                        border-cyan-400/40
                        shadow-[0_0_120px_rgba(0,255,255,0.55)]
                      "
                    />

                  </motion.div>

                </div>

              </div>

              {/* METRICS */}

              <div className="space-y-6">

                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.03,
                    }}
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