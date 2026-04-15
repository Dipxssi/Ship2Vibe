import { useState } from "react";
import { motion } from "framer-motion";
import { codeTabs } from "../data/demoData";
import { cn } from "../lib/utils";

export default function CodeViewer() {
  const [activeTab, setActiveTab] = useState(codeTabs[0].id);
  const current = codeTabs.find((tab) => tab.id === activeTab) ?? codeTabs[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-5"
    >
      <p className="mb-3 text-sm font-medium text-slate-300">Code Preview</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {codeTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs transition",
              tab.id === activeTab
                ? "border-accent/50 bg-accent/10 text-white"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CodeBlock title="Before" code={current.before} tone="text-rose-300" />
        <CodeBlock title="After" code={current.after} tone="text-emerald-300" />
      </div>
    </motion.div>
  );
}

function CodeBlock({ title, code, tone }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40">
      <div className="border-b border-white/10 px-3 py-2 text-xs text-slate-400">{title}</div>
      <pre className={cn("overflow-x-auto p-3 text-xs", tone)}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
