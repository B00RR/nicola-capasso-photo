import { useState, useRef, useCallback, useId } from "react";

interface AccordionItemProps {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  onFocusNext: () => void;
  onFocusPrev: () => void;
}

const AccordionItem = ({
  index,
  question,
  answer,
  open,
  onToggle,
  onFocusNext,
  onFocusPrev,
}: AccordionItemProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const btnId = useId();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          onToggle();
          break;
        case "ArrowDown":
          e.preventDefault();
          onFocusNext();
          break;
        case "ArrowUp":
          e.preventDefault();
          onFocusPrev();
          break;
        case "Home":
          e.preventDefault();
          // Handled by parent
          break;
        case "End":
          e.preventDefault();
          // Handled by parent
          break;
      }
    },
    [onToggle, onFocusNext, onFocusPrev]
  );

  return (
    <li className="border-b border-border/60 last:border-b-0">
      <button
        ref={btnRef}
        id={btnId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className="w-full flex items-baseline gap-6 cursor-pointer py-6 md:py-8 text-left
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40
          focus-visible:rounded-sm group"
      >
        <span className="font-sans-tight text-[10px] uppercase text-muted-foreground/70 tabular-nums shrink-0 w-8">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-display text-xl md:text-2xl leading-snug">
          {question}
        </span>
        <span
          aria-hidden="true"
          className="font-display text-xl md:text-2xl leading-none text-muted-foreground/70 transition-transform duration-300 shrink-0"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="overflow-hidden transition-all duration-300 ease-editorial"
        style={{
          maxHeight: open ? "500px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="pb-6 md:pb-8 ml-14 max-w-2xl text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </li>
  );
};

interface AccordionProps {
  items: { q: string; a: string }[];
  startNumber?: number;
}

export const Accordion = ({ items, startNumber = 1 }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  const focusAt = useCallback((i: number) => {
    const len = items.length;
    const target = ((i % len) + len) % len;
    itemRefs.current[target]?.focus();
  }, [items.length]);

  return (
    <ul className="divide-y divide-border/60 border-y border-border/60">
      {items.map((it, i) => (
        <AccordionItem
          key={i}
          index={i + startNumber - 1}
          question={it.q}
          answer={it.a}
          open={openIndex === i}
          onToggle={() => toggle(i)}
          onFocusNext={() => focusAt(i + 1)}
          onFocusPrev={() => focusAt(i - 1)}
        />
      ))}
    </ul>
  );
};
