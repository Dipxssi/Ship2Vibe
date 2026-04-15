import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function CommandCard({ interpretedCommand, response, isError }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-5"
    >
      <div className="mb-3 flex items-center gap-2 text-slate-300">
        <Terminal size={16} />
        <span className="text-sm font-medium">Command Output</span>
      </div>
      <div className="rounded-xl border border-accent/20 bg-black/45 p-4 font-mono text-sm">
        <p className="text-accent">$ {interpretedCommand || "Waiting for voice input..."}</p>
        <motion.p
          key={response}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={isError ? "mt-2 text-red-400" : "mt-2 text-emerald-300"}
        >
          {response}
        </motion.p>
      </div>
    </motion.div>
  );
}
