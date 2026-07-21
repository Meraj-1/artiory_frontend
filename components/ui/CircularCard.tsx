"use client";
import React from "react";
import Image from "next/image";

type CircularCardProps = {
  id: string; // unique id for SVG defs
  topLabel: string;
  bottomLabel?: string;
  imageSrc: string;
  outerColor?: string; // tailwind color or any css color
  size?: number; // px width/height of outer circle (default 192)
  onClick?: () => void;
  className?: string;
};

/**
 * Reusable circular card with curved top and bottom labels using SVG <textPath>.
 * - id: unique id used for SVG path defs (important when rendering multiple on same page)
 * - size controls overall visual size (outer circle). The SVG uses a 200x200 viewBox so scaling is automatic.
 */
export const CircularCard: React.FC<CircularCardProps> = ({
  id,
  topLabel,
  bottomLabel,
  imageSrc,
  outerColor = "#f59e0b", // amber-500 as default
  size = 192,
  onClick,
  className = "",
}) => {
  // SVG arc coordinates are tuned for a 200x200 viewBox. We use two paths: one for top (smaller radius)
  // and one for bottom (larger radius) so the bottom text sits upright.
  const topPathId = `topCurve-${id}`;
  const bottomPathId = `bottomCurve-${id}`;

  return (
    <button
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`relative rounded-full flex items-center justify-center cursor-pointer z-20 ${className}`}
      aria-label={`${topLabel} ${bottomLabel ?? ""}`}
    >
      {/* Outer colored ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "9999px",
          background: outerColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      {/* SVG for curved labels (fills entire outer circle) */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          {/* Top arc: starts left (x~35) and goes to right (x~165) in an arc above center */}
          <path id={topPathId} d="M 30 85 A 65 65 0 0 1 170 85" fill="transparent" className="transform translate-y-2"/>
          {/* Bottom arc: larger radius, text read upright using textPath direction */}
          <path id={bottomPathId} d="M 35 150 A 85 85 0 0 0 170 150" fill="transparent" className="transform translate-y-1"/>
        </defs>

        {/* Top label */}
        <text fill="white" fontWeight={800} fontSize={12} letterSpacing={1}>
          <textPath className="text-lg font-extrabold" href={`#${topPathId}`} startOffset="50%" textAnchor="middle">
            {topLabel.toUpperCase()}
          </textPath>
        </text>

        {/* Bottom label (upright) */}
        {bottomLabel && (
          <text fill="white" fontWeight={800} fontSize={12} letterSpacing={1}>
            <textPath className="text-lg font-extrabold" href={`#${bottomPathId}`} startOffset="50%" textAnchor="middle">
              {bottomLabel.toUpperCase()}
            </textPath>
          </text>
        )}
      </svg>

      {/* Inner white circle with image - size is ~65% of outer circle */}
      <div
        style={{
          width: Math.round(size * 0.66),
          height: Math.round(size * 0.66),
          borderRadius: "9999px",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
        }}
        className="relative"
      >
        <Image
          src={imageSrc}
          alt={topLabel}
          width={200}
          height={200}
          className="z-10 object-cover object-center w-50 h-50 md:w-60 md:h-60 lg:w-80 lg:h-80"
        />
      </div>
    </button>
  );
};

//Discord pr aao