import { motion } from "framer-motion";

export default function WaveformVisualizer({ active }) {
  const bars = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div className="mt-5 flex h-12 items-end justify-center gap-1">
      {bars.map((bar) => (
        <motion.span
          key={bar}
          className="w-1.5 rounded-full bg-gradient-to-t from-accent to-accent2"
          animate={
            active
              ? { height: [8, 36, 16, 30, 10] }
              : {
                  height: 8,
                }
          }
          transition={{
            repeat: active ? Infinity : 0,
            duration: 1,
            delay: bar * 0.03,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
