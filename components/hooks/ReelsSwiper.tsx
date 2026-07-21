import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Reel {
  id: number;
  video: string;
  title: string;
}

interface ReelsSwiperProps {
  reels: Reel[];
}

const ReelsSwiper: React.FC<ReelsSwiperProps> = ({ reels }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && activeIndex < reels.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (direction === "right" && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-[80vh] flex overflow-hidden justify-center items-center bg-black">
      <AnimatePresence initial={false}>
        {reels.map((reel, index) => {
          const isActive = index === activeIndex;
          const offset = index - activeIndex;

          return (
            <motion.div
              key={reel.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) handleSwipe("left");
                else if (info.offset.x > 100) handleSwipe("right");
              }}
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{
                scale: isActive ? 1 : 0.8,
                opacity: isActive ? 1 : 0.5,
                x: offset * 300, // distance between cards
                filter: isActive ? "blur(0px)" : "blur(4px)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute w-[250px] h-[450px] rounded-2xl overflow-hidden shadow-lg"
            >
              <video
                src={reel.video}
                className="w-full h-full object-cover"
                autoPlay={isActive}
                muted
                loop
              />
              <div className="absolute bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white">
                <p className="text-sm font-semibold">{reel.title}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ReelsSwiper;
