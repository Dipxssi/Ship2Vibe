import { cn } from "../../lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-accent/70 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
