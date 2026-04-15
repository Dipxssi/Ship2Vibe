import { Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";
import WaveformVisualizer from "./WaveformVisualizer";

export default function VoiceButton({ listening, processing, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-strong rounded-2xl p-8 text-center"
    >
      <p className="text-xs uppercase tracking-widest text-slate-400">Voice Interaction</p>
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        //className="relative mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full border border-accent/50 bg-gradient-to-br from-accent/35 via-accent2/25 to-accent3/30 shadow-glow"
        className="relative mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-[0_0_40px_rgba(59,130,246,0.6)] animate-pulse"
        animate={listening ? { boxShadow: ["0 0 20px rgba(87,163,255,0.2)", "0 0 45px rgba(138,92,255,0.4)"] } : {}}
        transition={{ repeat: listening ? Infinity : 0, duration: 1.4 }}
      >
        {listening ? <Mic size={36} /> : <MicOff size={36} />}
      </motion.button>
      <p className="mt-4 text-lg font-medium text-white">
        {processing ? "Processing..." : listening ? "Listening..." : "Idle"}
      </p>
      <p className="mt-1 text-sm text-slate-400">
        {listening ? "Speak your coding command naturally" : "Press to start voice capture"}
      </p>
      <WaveformVisualizer active={listening} />
      <button
        onClick={onToggle}
        //className="mt-5 rounded-lg border border-accent/30 bg-gradient-to-r from-accent/20 to-accent2/20 px-4 py-2 text-sm text-slate-100 transition hover:from-accent/30 hover:to-accent2/30"
        className="mt-5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-105 transition-all duration-300 shadow-lg text-white font-semibold"
      >
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
    </motion.div>
  );
}
