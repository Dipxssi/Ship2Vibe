import { cn } from "../../lib/utils";

export function Button({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-accent text-slate-950 hover:bg-accent/90",
    ghost: "bg-white/5 text-white hover:bg-white/10",
  };
  return (
    <button
      className={cn(
        "rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
