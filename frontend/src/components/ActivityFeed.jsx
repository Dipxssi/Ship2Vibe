import { Clock3, Command } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivityFeed({ activities }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-strong rounded-2xl p-4"
    >
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-300">
        <Clock3 size={16} />
        <span className="font-medium">Activity Timeline</span>
      </div>
      <div className="space-y-3">
        {activities.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-accent/40"
          >
            <div className="flex items-start gap-2">
              <Command size={14} className="mt-1 text-accent" />
              <div>
                <p className="text-sm text-slate-100">{item.command}</p>
                <p className="mt-1 text-xs text-slate-400">{item.timestamp}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.aside>
  );
}
