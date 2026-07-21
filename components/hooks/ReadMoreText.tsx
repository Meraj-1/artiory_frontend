import React, { useState } from "react";

interface ReadMoreTextProps {
  text: string;
  limit?: number;
}

const ReadMoreText: React.FC<ReadMoreTextProps> = ({ text, limit = 80 }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (!text) return null;

  const shortText = text.slice(0, limit);
  const longText = text.slice(limit);

  return (
    <div className="relative z-[50]">
      {/* When expanded — dim background */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 z-[0]"
          onClick={() => setExpanded(false)} // click outside to close
        />
      )}

      {/* Text container */}
      <div
        className={`relative z-[50] text-white text-sm transition-all duration-500 
          ${expanded ? "max-h-[80vh] overflow-y-auto" : "max-h-[4.5rem] overflow-hidden"}`}
      >
        <p className="relative">
          {shortText}
          {!expanded && longText && <span className="opacity-70">...</span>}
          {expanded && <span>{longText}</span>}
        </p>

        {text.length > limit && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="block mt-2 text-xs underline text-white/70 hover:text-white transition cursor-pointer"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReadMoreText;
