import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
type Option = { value: string; label: string };
export default function ChoiceMenu({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [above, setAbove] = useState(false);
  const search = useRef({ text: "", time: 0 });
  const selected = options.findIndex((option) => option.value === value);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  useEffect(() => {
    if (open)
      root.current
        ?.querySelector(`#${CSS.escape(id)}-option-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [active, open, id]);
  function show(index = Math.max(0, selected)) {
    const rect = trigger.current?.getBoundingClientRect();
    setAbove(
      Boolean(
        rect &&
          window.innerHeight - rect.bottom < 220 &&
          rect.top > window.innerHeight - rect.bottom,
      ),
    );
    setActive(index);
    setOpen(true);
  }
  function choose(index: number) {
    if (!options[index]) return;
    onChange(options[index].value);
    setOpen(false);
    trigger.current?.focus();
  }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    if (event.key === "Escape") {
      if (open) event.stopPropagation();
      setOpen(false);
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const index =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? options.length - 1
            : open
              ? (active +
                  (event.key === "ArrowDown" ? 1 : -1) +
                  options.length) %
                options.length
              : Math.max(0, selected);
      if (open) setActive(index);
      else show(index);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else show();
      return;
    }
    if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      const now = Date.now();
      search.current.text =
        (now - search.current.time < 600 ? search.current.text : "") +
        event.key;
      search.current.time = now;
      const normalize = (text: string) =>
        text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
      const index = options.findIndex((option) =>
        normalize(option.label).startsWith(normalize(search.current.text)),
      );
      if (index !== -1) {
        event.preventDefault();
        if (open) setActive(index);
        else show(index);
      }
    }
  }
  return (
    <div
      ref={root}
      className="choice-menu"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="choice-trigger"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-list` : undefined}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        disabled={disabled || !options.length}
        onKeyDown={keyboard}
        onClick={() => (open ? setOpen(false) : show())}
      >
        <span>{options[selected]?.label || "Sin opciones disponibles"}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      {open && (
        <div
          className={`choice-popup ${above ? "above" : ""}`}
          role="listbox"
          id={`${id}-list`}
          aria-label={label}
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={value === option.value}
              className={`choice-option ${active === index ? "active" : ""}`}
              onPointerMove={() => setActive(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span>{option.label}</span>
              <span className="choice-check">
                {value === option.value && (
                  <Check size={16} aria-hidden="true" />
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
