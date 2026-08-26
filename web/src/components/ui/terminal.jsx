import { useEffect, useRef, useState } from 'react';

// Terminal falsa con efecto de tipeo: escribe cada comando letra por letra,
// muestra su output, espera y pasa al siguiente (en loop). Propio, escrito
// para este sitio a partir de la API pedida (commands/outputs/typingSpeed/
// delayBetweenCommands) — no es el port de una librería puntual.
export function Terminal({ commands, outputs = {}, typingSpeed = 45, delayBetweenCommands = 1000 }) {
  const [commandIndex, setCommandIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' | 'output' | 'waiting'
  const [history, setHistory] = useState([]); // líneas de comandos ya completados, con su output
  const timeoutRef = useRef(null);

  useEffect(() => {
    const command = commands[commandIndex] ?? '';

    if (phase === 'typing') {
      if (typedLength < command.length) {
        timeoutRef.current = setTimeout(() => setTypedLength((n) => n + 1), typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => setPhase('output'), 200);
      }
      return () => clearTimeout(timeoutRef.current);
    }

    if (phase === 'output') {
      timeoutRef.current = setTimeout(() => setPhase('waiting'), 150);
      return () => clearTimeout(timeoutRef.current);
    }

    if (phase === 'waiting') {
      timeoutRef.current = setTimeout(() => {
        setHistory((h) => [...h, { command, output: outputs[commandIndex] ?? [] }]);
        setTypedLength(0);
        setPhase('typing');
        setCommandIndex((i) => (i + 1) % commands.length);
      }, delayBetweenCommands);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [phase, typedLength, commandIndex, commands, outputs, typingSpeed, delayBetweenCommands]);

  // El historial no crece para siempre: al volver a la primera línea, arrancamos de cero.
  useEffect(() => {
    if (commandIndex === 0 && phase === 'typing' && typedLength === 0 && history.length === commands.length) {
      setHistory([]);
    }
  }, [commandIndex, phase, typedLength, history.length, commands.length]);

  const currentCommand = commands[commandIndex] ?? '';
  const visibleCommand = currentCommand.slice(0, typedLength);
  const showCurrentOutput = phase === 'output' || phase === 'waiting';

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0F] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
        <span className="ml-3 text-xs font-medium text-white/40">zsh — estudio-flores</span>
      </div>

      <div className="h-72 overflow-y-auto p-5 font-mono text-sm leading-relaxed md:text-[13px]">
        {history.map((entry, i) => (
          <div key={i} className="mb-3">
            <Prompt text={entry.command} />
            {entry.output.map((line, j) => (
              <div key={j} className="text-white/50">{line}</div>
            ))}
          </div>
        ))}

        <div>
          <Prompt text={visibleCommand} caret={phase === 'typing'} />
          {showCurrentOutput && (outputs[commandIndex] ?? []).map((line, j) => (
            <div key={j} className="text-white/50">{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Prompt({ text, caret }) {
  return (
    <div className="flex gap-2 text-white">
      <span className="shrink-0 text-emerald-400">➜</span>
      <span className="whitespace-pre-wrap break-all">
        {text}
        {caret && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-white/70 align-middle" />}
      </span>
    </div>
  );
}
