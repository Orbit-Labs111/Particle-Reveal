import { useState } from "react";
import MagneticGrid, { DEFAULT_IMAGE } from "./components/MagneticGrid";
import { ControlPanel, ControlState, COLOR_PRESETS } from "./components/ControlPanel";

export default function App() {
  const [controls, setControls] = useState<ControlState>({
    dots: 28,
    gap: 8,
    intensity: 6,
    radius: 160,
    bgColor: COLOR_PRESETS[0].bg, // Default soft cream #FDFBF7
    dotColor: COLOR_PRESETS[0].dot,
    imageUrl: DEFAULT_IMAGE,
    autoAnimate: true,
  });

  const [isControlsOpen, setIsControlsOpen] = useState(false);

  const handleUpdateControls = (updated: Partial<ControlState>) => {
    setControls((prev) => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setControls({
      dots: 28,
      gap: 8,
      intensity: 6,
      radius: 160,
      bgColor: COLOR_PRESETS[0].bg,
      dotColor: COLOR_PRESETS[0].dot,
      imageUrl: DEFAULT_IMAGE,
      autoAnimate: true,
    });
  };

  return (
    <div
      style={{ backgroundColor: controls.bgColor }}
      className="min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 font-sans selection:bg-amber-100 selection:text-amber-900 relative overflow-hidden p-4 sm:p-8"
    >
      {/* Main Centered Canvas Container */}
      <main className="w-full max-w-4xl my-auto py-6 sm:py-8 flex flex-col items-center justify-center z-10">
        <div className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[70vh] rounded-2xl sm:rounded-3xl border border-stone-300/40 dark:border-stone-800/80 shadow-2xl shadow-stone-900/5 overflow-hidden relative group transition-all duration-300">
          <MagneticGrid
            background={controls.bgColor}
            image={{ src: controls.imageUrl }}
            dots={controls.dots}
            gap={controls.gap}
            intensity={controls.intensity}
            radius={controls.radius}
            dotColor={controls.dotColor}
            autoAnimate={controls.autoAnimate}
          />
        </div>
      </main>

      {/* Control Panel for customization */}
      <ControlPanel
        controls={controls}
        onChange={handleUpdateControls}
        onReset={handleReset}
        isOpen={isControlsOpen}
        onToggle={() => setIsControlsOpen((prev) => !prev)}
      />
    </div>
  );
}
