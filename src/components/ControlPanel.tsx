import React from "react";
import { Sliders, Sparkles, Image as ImageIcon, RotateCcw } from "lucide-react";

export interface ControlState {
  dots: number;
  gap: number;
  intensity: number;
  radius: number;
  bgColor: string;
  dotColor: string;
  imageUrl: string;
  autoAnimate: boolean;
}

export const COLOR_PRESETS = [
  { name: "Cream Soft", bg: "#FDFBF7", dot: "rgba(180, 170, 155, 0.45)" },
  { name: "Ivory Warm", bg: "#F7F4EF", dot: "rgba(165, 150, 130, 0.45)" },
  { name: "Pure White", bg: "#FFFFFF", dot: "rgba(160, 160, 160, 0.35)" },
  { name: "Warm Linen", bg: "#F3ECE0", dot: "rgba(150, 135, 115, 0.5)" },
  { name: "Onyx Dark", bg: "#121212", dot: "rgba(255, 255, 255, 0.25)" },
];

export const IMAGE_PRESETS = [
  {
    name: "Architectural Curve",
    url: "https://images.unsplash.com/photo-1714123708982-fba3f96cd515?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Serene Waves",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1470&auto=format&fit=crop",
  },
  {
    name: "Vibrant Gradient",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1470&auto=format&fit=crop",
  },
  {
    name: "Desert Dunes",
    url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1470&auto=format&fit=crop",
  },
];

interface ControlPanelProps {
  controls: ControlState;
  onChange: (updated: Partial<ControlState>) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  controls,
  onChange,
  onReset,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-2xl w-[92vw] sm:w-full">
      {/* Floating Action Pill Bar */}
      <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200/80 dark:border-stone-800 shadow-xl rounded-full px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-4 transition-all">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggle}
            id="control-panel-toggle"
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white px-3 py-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            <Sliders className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{isOpen ? "Hide Controls" : "Customize Reveal"}</span>
          </button>
        </div>

        {/* Quick Background Presets in Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onChange({ bgColor: preset.bg, dotColor: preset.dot })}
              title={preset.name}
              style={{ backgroundColor: preset.bg }}
              className={`w-6 h-6 rounded-full border border-stone-300 dark:border-stone-700 transition transform hover:scale-110 flex items-center justify-center ${
                controls.bgColor === preset.bg ? "ring-2 ring-amber-500 ring-offset-2" : ""
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 opacity-60" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 border-l border-stone-200 dark:border-stone-800 pl-2">
          <button
            onClick={() => onChange({ autoAnimate: !controls.autoAnimate })}
            id="toggle-ambient-motion"
            className={`p-2 rounded-full transition ${
              controls.autoAnimate
                ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            }`}
            title="Toggle Ambient Demo Motion"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={onReset}
            id="reset-controls"
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition"
            title="Reset to default image & background"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Control Options Drawer */}
      {isOpen && (
        <div className="mt-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/80 dark:border-stone-800 shadow-2xl rounded-2xl p-5 sm:p-6 text-stone-800 dark:text-stone-200 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Grid & Reveal Settings
            </h3>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              Hover over image to reveal
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Dots Density */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <label htmlFor="dots-slider">Grid Density (Dots)</label>
                <span className="text-stone-500">{controls.dots} cols</span>
              </div>
              <input
                id="dots-slider"
                type="range"
                min="10"
                max="50"
                step="2"
                value={controls.dots}
                onChange={(e) => onChange({ dots: Number(e.target.value) })}
                className="w-full accent-amber-600 dark:accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Radius */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <label htmlFor="radius-slider">Hover Radius</label>
                <span className="text-stone-500">{controls.radius}px</span>
              </div>
              <input
                id="radius-slider"
                type="range"
                min="60"
                max="300"
                step="10"
                value={controls.radius}
                onChange={(e) => onChange({ radius: Number(e.target.value) })}
                className="w-full accent-amber-600 dark:accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Gap */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <label htmlFor="gap-slider">Dot Gap</label>
                <span className="text-stone-500">{controls.gap}px</span>
              </div>
              <input
                id="gap-slider"
                type="range"
                min="2"
                max="20"
                step="1"
                value={controls.gap}
                onChange={(e) => onChange({ gap: Number(e.target.value) })}
                className="w-full accent-amber-600 dark:accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Intensity */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <label htmlFor="intensity-slider">Reveal Intensity</label>
                <span className="text-stone-500">{controls.intensity} / 10</span>
              </div>
              <input
                id="intensity-slider"
                type="range"
                min="1"
                max="10"
                step="1"
                value={controls.intensity}
                onChange={(e) => onChange({ intensity: Number(e.target.value) })}
                className="w-full accent-amber-600 dark:accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Sample Images Preset Selector */}
          <div className="space-y-2 border-t border-stone-100 dark:border-stone-800 pt-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Preset Images</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {IMAGE_PRESETS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onChange({ imageUrl: item.url })}
                  className={`group relative h-14 rounded-lg overflow-hidden border text-left transition ${
                    controls.imageUrl === item.url
                      ? "ring-2 ring-amber-500 border-transparent"
                      : "border-stone-200 dark:border-stone-700 hover:border-stone-400"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                    <span className="text-[10px] font-medium text-white truncate">
                      {item.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
