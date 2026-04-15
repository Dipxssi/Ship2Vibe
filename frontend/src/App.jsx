import { useEffect, useMemo, useState } from "react";
import { Loader2, Mic } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import VoiceButton from "./components/VoiceButton";
import CommandCard from "./components/CommandCard";
import CodeViewer from "./components/CodeViewer";
import ActivityFeed from "./components/ActivityFeed";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { aiResponses, initialActivities } from "./data/demoData";

const fakeVoiceCommands = [
  "Create login API",
  "Fix bug in auth.js",
  "Refactor payment service into hooks",
];

export default function App() {
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [interpretedCommand, setInterpretedCommand] = useState("");
  const [activity, setActivity] = useState(initialActivities);
  const [response, setResponse] = useState("Agent ready. Waiting for your command.");
  const [typingResponse, setTypingResponse] = useState(response);

  const micStatus = useMemo(() => {
    if (error) return "Error";
    if (processing) return "Processing";
    if (listening) return "Listening";
    return "Standby";
  }, [error, listening, processing]);

  useEffect(() => {
    let index = 0;
    setTypingResponse("");
    const timer = setInterval(() => {
      index += 1;
      setTypingResponse(response.slice(0, index));
      if (index >= response.length) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [response]);

  const handleToggleListening = () => {
    if (processing) return;
    setError("");
    const next = !listening;
    setListening(next);

    if (!next) {
      setProcessing(true);
      const randomCommand =
        fakeVoiceCommands[Math.floor(Math.random() * fakeVoiceCommands.length)];
      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      setTimeout(() => {
        setInterpretedCommand(randomCommand);
        setResponse(randomResponse);
        setActivity((prev) => [
          { id: Date.now(), command: randomCommand, timestamp: "just now" },
          ...prev,
        ]);
        setProcessing(false);
      }, 1300);
    }
  };

  const handleManualSubmit = (event) => {
    event.preventDefault();
    if (!manualInput.trim()) {
      setError("Command cannot be empty.");
      return;
    }
    setError("");
    setInterpretedCommand(manualInput);
    setResponse(`Executing "${manualInput}" via fallback text command...`);
    setActivity((prev) => [
      { id: Date.now(), command: manualInput, timestamp: "just now" },
      ...prev,
    ]);
    setManualInput("");
  };

  return (
    <div className="relative min-h-screen p-4 md:p-6">
      <div className="aurora" />
      <div className="relative z-10 mx-auto flex max-w-[1600px] gap-4">
        <Sidebar />

        <main className="flex-1 space-y-4">
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong flex items-center justify-between rounded-2xl px-5 py-4"
          >
            <div>
              <h1 className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-lg font-semibold text-transparent">
                Voice-Native Developer Experience Agent
              </h1>
              <p className="text-sm text-slate-400">
                Speak naturally, ship confidently.
              </p>
            </div>
            <motion.div
              className="flex items-center gap-2 rounded-full border border-accent/30 bg-gradient-to-r from-accent/15 to-accent2/15 px-3 py-1.5 text-sm shadow-glow"
              animate={listening ? { opacity: [0.85, 1, 0.85], scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 1.4, repeat: listening ? Infinity : 0 }}
            >
              {processing ? (
                <Loader2 size={15} className="animate-spin text-accent" />
              ) : (
                <Mic size={15} className={listening ? "text-accent" : "text-slate-400"} />
              )}
              <span>{micStatus}</span>
            </motion.div>
          </motion.header>

          <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <VoiceButton
                listening={listening}
                processing={processing}
                onToggle={handleToggleListening}
              />
              <CommandCard
                interpretedCommand={interpretedCommand}
                response={typingResponse}
                isError={Boolean(error)}
              />
              <CodeViewer />
            </motion.section>

            <ActivityFeed activities={activity} />
          </div>

          <motion.form
            onSubmit={handleManualSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-strong flex items-center gap-3 rounded-2xl p-3"
          >
            <Input
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Fallback manual command (e.g. Generate API route for /login)"
            />
            <Button type="submit">Send</Button>
          </motion.form>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </main>
      </div>
    </div>
  );
}
