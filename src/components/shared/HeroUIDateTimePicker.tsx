"use client";

import React, { useState, useEffect, useId } from "react";
import { Timer, Calendar, Clock, X, Sparkles, CheckCircle2 } from "lucide-react";

interface HeroUIDateTimePickerProps {
  label?: string;
  value?: string | Date | null;
  onChange: (isoString: string) => void;
  helperText?: string;
  showPresets?: boolean;
}

// Convert ISO string or Date to { dateStr: "YYYY-MM-DD", timeStr: "HH:mm" }
function parseDateTime(val?: string | Date | null): { date: string; time: string } {
  if (!val) return { date: "", time: "23:59" };
  const d = new Date(val);
  if (isNaN(d.getTime())) return { date: "", time: "23:59" };

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`,
  };
}

// Calculate countdown badge
function calculateCountdown(val?: string | Date | null): {
  text: string;
  isExpired: boolean;
  active: boolean;
} {
  if (!val) return { text: "No countdown set", isExpired: false, active: false };
  const d = new Date(val);
  if (isNaN(d.getTime())) return { text: "Invalid date", isExpired: false, active: false };

  const diff = d.getTime() - Date.now();
  if (diff <= 0) {
    return { text: "Offer Expired (Standard Price)", isExpired: true, active: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  let text = "";
  if (days > 0) {
    text = `${days}d ${hours}h left`;
  } else if (hours > 0) {
    text = `${hours}h ${minutes}m left`;
  } else {
    text = `${minutes}m left`;
  }

  return { text, isExpired: false, active: true };
}

// Format human-readable display date
function formatHumanDate(val?: string | Date | null): string {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HeroUIDateTimePicker({
  label = "Countdown End Date & Time",
  value,
  onChange,
  helperText,
  showPresets = true,
}: HeroUIDateTimePickerProps) {
  const inputId = useId();
  const [datePart, setDatePart] = useState(() => parseDateTime(value).date);
  const [timePart, setTimePart] = useState(() => parseDateTime(value).time);

  useEffect(() => {
    const parsed = parseDateTime(value);
    setDatePart(parsed.date);
    setTimePart(parsed.time);
  }, [value]);

  // Combine and emit ISO string
  const updateCombinedDateTime = (newDate: string, newTime: string) => {
    setDatePart(newDate);
    setTimePart(newTime);

    if (!newDate) {
      onChange("");
      return;
    }

    const [year, month, day] = newDate.split("-").map(Number);
    const [hours, minutes] = (newTime || "23:59").split(":").map(Number);

    const d = new Date(year, month - 1, day, hours || 0, minutes || 0, 0, 0);
    if (!isNaN(d.getTime())) {
      onChange(d.toISOString());
    } else {
      onChange("");
    }
  };

  // Handle Preset Clicks
  const handlePresetDays = (days: number) => {
    const target = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    target.setHours(23, 59, 0, 0);
    const parsed = parseDateTime(target);
    updateCombinedDateTime(parsed.date, parsed.time);
  };

  const handleClear = () => {
    setDatePart("");
    setTimePart("23:59");
    onChange("");
  };

  const countdown = calculateCountdown(value);
  const displayFormatted = formatHumanDate(value);

  // Minimum date today
  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-3 p-3.5 bg-slate-50 dark:bg-gray-800/40 rounded-2xl border border-slate-200/70 dark:border-gray-800 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={`${inputId}-date`}
          className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5"
        >
          <Timer className="w-3.5 h-3.5 text-sky-500" />
          <span>{label}</span>
        </label>

        {countdown.active && (
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
              countdown.isExpired
                ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800"
                : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 animate-pulse"
            }`}
          >
            <Sparkles className="w-2.5 h-2.5" />
            {countdown.text}
          </span>
        )}
      </div>

      {/* Date & Time Inputs Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Date Input */}
        <div className="relative flex items-center">
          <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 pointer-events-none" />
          <input
            id={`${inputId}-date`}
            type="date"
            min={todayStr}
            value={datePart}
            onChange={(e) => updateCombinedDateTime(e.target.value, timePart)}
            className="w-full h-10 pl-9 pr-3 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all cursor-pointer"
          />
        </div>

        {/* Time Input */}
        <div className="relative flex items-center">
          <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 pointer-events-none" />
          <input
            id={`${inputId}-time`}
            type="time"
            value={timePart}
            disabled={!datePart}
            onChange={(e) => updateCombinedDateTime(datePart, e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          />
        </div>
      </div>

      {/* Selected Date Preview */}
      {displayFormatted && (
        <div className="flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900/80 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-gray-800">
          <span className="flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 text-sky-500" />
            Active Deal Until: <strong className="text-gray-900 dark:text-white">{displayFormatted}</strong>
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="text-rose-500 hover:text-rose-600 font-semibold inline-flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        </div>
      )}

      {/* Quick Presets */}
      {showPresets && (
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Quick Add:
          </span>
          {[
            { label: "+1 Day", days: 1 },
            { label: "+3 Days", days: 3 },
            { label: "+7 Days", days: 7 },
            { label: "+14 Days", days: 14 },
            { label: "+30 Days", days: 30 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePresetDays(preset.days)}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-slate-200 dark:border-gray-700 hover:border-sky-400 dark:hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all cursor-pointer shadow-2xs"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      {helperText && (
        <p className="text-[10px] text-gray-400 leading-relaxed">
          {helperText}
        </p>
      )}
    </div>
  );
}
