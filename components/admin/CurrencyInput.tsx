"use client";

import { useState } from "react";

const moneyFmt = new Intl.NumberFormat("es-MX", {
  maximumFractionDigits: 0,
});

function parseMoney(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return 0;
  return Number(digits);
}

function formatMoney(value: number) {
  return moneyFmt.format(Math.max(0, Math.round(value || 0)));
}

export function CurrencyInput({
  value,
  onChange,
  className,
  placeholder = "0",
  required,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <div className="relative inline-flex w-full max-w-[10.5rem] min-w-0 items-center">
      <span className="pointer-events-none absolute left-3 z-[1] text-sm font-semibold text-[#98a2b3]">
        $
      </span>
      <input
        type="text"
        inputMode="numeric"
        required={required}
        placeholder={placeholder}
        value={focused ? draft : formatMoney(value)}
        onFocus={() => {
          setFocused(true);
          setDraft(value ? String(Math.round(value)) : "");
        }}
        onBlur={() => {
          setFocused(false);
          const next = parseMoney(draft);
          onChange(next);
          setDraft("");
        }}
        onChange={(event) => {
          const next = parseMoney(event.target.value);
          setDraft(event.target.value.replace(/[^\d]/g, ""));
          onChange(next);
        }}
        className={`min-w-0 pl-7 ${className ?? ""}`}
      />
    </div>
  );
}
