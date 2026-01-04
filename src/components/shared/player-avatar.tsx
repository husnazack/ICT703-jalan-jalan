"use client";

import { useState, useEffect } from "react";

type EyeDirection = "center" | "up" | "down" | "left" | "right";

interface PlayerAvatarProps {
  direction?: EyeDirection;
  autoAnimate?: boolean;
  size?: number;
}

export function PlayerAvatar({
  direction = "center",
  autoAnimate = false,
  size = 104,
}: PlayerAvatarProps) {
  const [currentDir, setCurrentDir] = useState<EyeDirection>(direction);

  // Offsets for each direction (in % of container)
  const offsets: Record<EyeDirection, { x: number; y: number }> = {
    center: { x: 0, y: 0 },
    up: { x: 0, y: -2 },
    down: { x: 0, y: 2 },
    left: { x: -2, y: 0 },
    right: { x: 2, y: 0 },
  };

  useEffect(() => {
    if (!autoAnimate) {
      setCurrentDir(direction);
      return;
    }
    const dirs: EyeDirection[] = ["center", "left", "up", "right", "down"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % dirs.length;
      setCurrentDir(dirs[i]);
    }, 800);
    return () => clearInterval(interval);
  }, [autoAnimate, direction]);

  const { x, y } = offsets[currentDir];
  const height = (size / 104) * 125;

  // Eye positions (% from top-left) - adjust these to match your image
  const leftEye = { x: 35, y: 42 };
  const rightEye = { x: 55, y: 42 };
  const pupilSize = size * 0.05;

  return (
    <div className="relative" style={{ width: size, height }}>
      {/* Base player image */}
      <img
        src="/player.svg"
        alt="Player"
        className="absolute inset-0 w-full h-full"
      />

      {/* Left pupil */}
      <div
        className="absolute rounded-full bg-[#1a1a1a] transition-all duration-200 ease-out"
        style={{
          width: pupilSize,
          height: pupilSize,
          left: `${leftEye.x + x}%`,
          top: `${leftEye.y + y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Right pupil */}
      <div
        className="absolute rounded-full bg-[#1a1a1a] transition-all duration-200 ease-out"
        style={{
          width: pupilSize,
          height: pupilSize,
          left: `${rightEye.x + x}%`,
          top: `${rightEye.y + y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
