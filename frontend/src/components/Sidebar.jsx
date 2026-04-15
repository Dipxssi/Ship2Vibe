import { Code2, Command, History, Sparkles } from "lucide-react";
import { sidebarItems } from "../data/demoData";
import { cn } from "../lib/utils";

const icons = {
  voice: Sparkles,
  commands: Command,
  "code-preview": Code2,
  timeline: History,
};

export default function Sidebar() {
  return (
    <aside className="glass hidden w-64 flex-col rounded-2xl p-4 lg:flex">
      <div className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Workspace
      </div>
      <nav className="space-y-2">
        {sidebarItems.map((item, idx) => {
          const Icon = icons[item.id];
          const active = idx === 0;
          return (
            <button
              key={item.id}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-all",
                "hover:bg-white/10 transition-all duration-200 cursor-pointer",
                active
                  ? "border-accent/50 bg-accent/10 text-white"
                  : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5",
              )}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
